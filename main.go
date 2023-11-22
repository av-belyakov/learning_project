package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"time"

	"learning_project/confighandler"
	"learning_project/routes"
)

var (
	err            error
	appName        string
	confApp        confighandler.ConfigApp
	etagHeaders    []string
	noCacheHeaders map[string]string
	routers        map[string]func(http.ResponseWriter, *http.Request)
)

func getAppName(pf string, nl int) (string, error) {
	var line string

	f, err := os.OpenFile(pf, os.O_RDONLY, os.ModePerm)
	if err != nil {
		return line, err
	}
	defer f.Close()

	num := 1
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		if num == nl {
			return sc.Text(), nil
		}

		num++
	}

	return line, nil
}

func getAppVersion(str string) string {
	version := "версия не определена"
	patter := regexp.MustCompile(`v(\d)+\.(\d)+.(\d)+`)
	ls := patter.FindStringSubmatch(str)

	if len(ls) > 0 {
		version = ls[0]
	}

	return version
}

type neuteredFileSystem struct {
	fs http.FileSystem
}

func (nfs neuteredFileSystem) Open(path string) (http.File, error) {
	f, err := nfs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, err := f.Stat()
	if err != nil {
		return nil, err
	}

	if s.IsDir() {
		index := filepath.Join(path, "index.html")
		if _, err := nfs.fs.Open(index); err != nil {
			closeErr := f.Close()
			if closeErr != nil {
				return nil, closeErr
			}

			return nil, err
		}
	}

	return f, nil
}

func NoCache(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// Удаляем любой ETag в заголовке который может быть установлен
		for _, v := range etagHeaders {
			if r.Header.Get(v) != "" {
				r.Header.Del(v)
			}
		}

		// Устанавливаем наш NoCache заголовок
		for k, v := range noCacheHeaders {
			w.Header().Set(k, v)
		}

		h.ServeHTTP(w, r)
	}

	return http.HandlerFunc(fn)
}

func init() {
	appName = "Learning application version not defined"
	if an, err := getAppName("README.md", 1); err == nil {
		appName = an
	}

	noCacheHeaders = map[string]string{
		"Expires":         time.Unix(0, 0).Format(time.RFC1123),
		"Cache-Control":   "no-cache, private, max-age=0",
		"Pragma":          "no-cache",
		"X-Accel-Expires": "0",
	}
	etagHeaders = []string{
		"ETag",
		"If-Modified-Since",
		"If-Match",
		"If-None-Match",
		"If-Range",
		"If-Unmodified-Since",
	}

	rtd := routes.TemplateData{Version: getAppVersion(appName)}
	routers = map[string]func(http.ResponseWriter, *http.Request){
		"/":                         rtd.RouteIndex,
		"/news":                     rtd.RouteNews,
		"/music":                    rtd.RouteMusic,
		"/photo":                    rtd.RoutePhoto,
		"/useful_notes":             rtd.RouteUsefulNotes,
		"/examples_react":           rtd.RouteExamplesReact,
		"/examples_react/api":       rtd.RouteExamplesReactApi,
		"/examples_neat_javascript": rtd.RouteExamplesNeatJavaScript,
	}

	//инициализируем модуль чтения конфигурационного файла
	confApp, err = confighandler.NewConfig()
	if err != nil {
		log.Fatalf("error module 'confighandler': %v", err)
	}
}

func main() {
	appVersion := getAppVersion(appName)
	log.Printf("Learning application version %s is running host: %s, port: %d", appVersion, confApp.Host, confApp.Port)

	mux := http.NewServeMux()
	for k, v := range routers {
		mux.HandleFunc(k, v)
	}

	//для обработки статических файлов таких как css, js, images
	fileServer := http.FileServer(neuteredFileSystem{http.Dir("./ui/dist")})

	//mux.Handle("/static", http.NotFoundHandler())
	mux.Handle("/dist", http.NotFoundHandler())

	//для запрета кеширования загружаемых файлов
	//mux.Handle("/static/", NoCache(http.StripPrefix("/static", fileServer)))
	mux.Handle("/dist/", NoCache(http.StripPrefix("/dist", fileServer)))

	//без запрета браузеру кешировать загружаемые файлы
	//mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	http.ListenAndServe(fmt.Sprintf("%s:%d", confApp.Host, confApp.Port), mux)
}
