package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"

	"learning_project/confighandler"
	"learning_project/routes"
)

var (
	err     error
	appName string
	confApp confighandler.ConfigApp
	routers map[string]func(http.ResponseWriter, *http.Request)
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

func init() {
	appName = "Learning application version not defined"

	if an, err := getAppName("README.md", 1); err == nil {
		appName = an
	}

	rtd := routes.TemplateData{Version: getAppVersion(appName)}

	routers = map[string]func(http.ResponseWriter, *http.Request){
		"/":            rtd.RouteIndex,
		"/news":        rtd.RouteNews,
		"/music":       rtd.RouteMusic,
		"/photo":       rtd.RoutePhoto,
		"/usefulnotes": rtd.RouteUsefulNotes,
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
	fileServer := http.FileServer(neuteredFileSystem{http.Dir("./ui/static")})
	mux.Handle("/static", http.NotFoundHandler())
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	http.ListenAndServe(fmt.Sprintf("%s:%d", confApp.Host, confApp.Port), mux)
}
