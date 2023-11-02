package routes

import (
	"html/template"
	"log"
	"net/http"
)

type TemplateData struct {
	Version string
}

func addCommonFilePatterns(fp []string) []string {
	nfp := []string{
		"./ui/views/base.html",
		"./ui/views/footer.html",
	}

	tmp := make([]string, 0, len(nfp)+len(fp))

	tmp = append(tmp, fp...)
	tmp = append(tmp, nfp...)

	return tmp
}

func (td *TemplateData) RouteIndex(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)

		return
	}

	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/index.html"}), td)
}

func (td *TemplateData) RouteNews(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/news.html"}), td)
}

func (td *TemplateData) RouteMusic(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/music.html"}), td)
}

func (td *TemplateData) RouteUsefulNotes(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/useful_notes.html"}), td)
}

func (td *TemplateData) RoutePhoto(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/photo.html"}), td)
}

func (td *TemplateData) RouteExamplesReact(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/examples_react.html"}), td)
}

func (td *TemplateData) RouteExamplesNeatJavaScript(w http.ResponseWriter, r *http.Request) {
	parseTemplate(w, addCommonFilePatterns([]string{"./ui/views/examples_near_javascript.html"}), td)
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
