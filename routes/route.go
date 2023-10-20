package routes

import (
	"html/template"
	"log"
	"net/http"
)

type TemplateData struct {
	Version string
}

func (td *TemplateData) RouteIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)

		return
	}

	listFilesPatterns := []string{
		"./ui/views/index.html",
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	parseTemplate(w, listFilesPatterns, td)
}

func (td *TemplateData) RouteNews(w http.ResponseWriter, r *http.Request) {
	listFilesPatterns := []string{
		"./ui/views/news.html",
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	parseTemplate(w, listFilesPatterns, td)
}

func (td *TemplateData) RouteMusic(w http.ResponseWriter, r *http.Request) {
	listFilesPatterns := []string{
		"./ui/views/music.html",
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	parseTemplate(w, listFilesPatterns, td)
}

func (td *TemplateData) RouteUsefulNotes(w http.ResponseWriter, r *http.Request) {
	listFilesPatterns := []string{
		"./ui/views/useful_notes.html",
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	parseTemplate(w, listFilesPatterns, td)
}

func (td *TemplateData) RoutePhoto(w http.ResponseWriter, r *http.Request) {
	listFilesPatterns := []string{
		"./ui/views/photo.html",
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	parseTemplate(w, listFilesPatterns, td)
}

func parseTemplate(w http.ResponseWriter, lfp []string, td *TemplateData) {
	//w.Header().Set("Cache-Control", "max-age=3600")
	//w.Header().Set("Etag", time.Now().String())

	ts, err := template.ParseFiles(lfp...)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", 500)

		return
	}

	err = ts.Execute(w, td)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", 500)

		return
	}
}
