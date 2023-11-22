package routes

import (
	"encoding/json"
	"fmt"
	"html/template" //простой шаблонизатор для Go
	"log"
	"net/http"
	"net/url"
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

func (td *TemplateData) RouteExamplesReactApi(w http.ResponseWriter, r *http.Request) {
	/*resBodyByte, err := io.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		fmt.Println("Error: ", err)

		return
	}
	fmt.Println(resBodyByte)*/

	var (
		err      error
		response []byte
	)

	fmt.Println(r.URL.RawQuery)
	u, err := url.Parse(r.URL.String())
	if err != nil {
		fmt.Println(err)

		return
	}

	q := u.Query()
	qp := q.Get("page")

	fmt.Println("page:", qp)
	fmt.Println("command:", q.Get("command"))
	fmt.Println("name:", q.Get("name"))

	switch qp {
	case "root_page":
		if response, err = examplesReactApiPageRoot(); err != nil {
			fmt.Println("Error:", err)

			return
		}
	case "home_page":
		if response, err = examplesReactApiPageHome(); err != nil {
			fmt.Println("Error:", err)

			return
		}
	case "alert_page":
		if response, err = examplesReactApiPageAlert(); err != nil {
			fmt.Println("Error:", err)

			return
		}
	default:
		response, err = json.Marshal(struct {
			Error string `json:"error"`
		}{
			Error: fmt.Sprintf("handler for page %s not found", qp),
		})
		if err != nil {
			fmt.Println("Error:", err)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)

	fmt.Println("--------------------")
}

func examplesReactApiPageRoot() ([]byte, error) {
	b, err := json.Marshal(struct {
		MajorData string `json:"major_data"`
	}{
		MajorData: "Какие то данные которые должны быть видны на каждой странице",
	})
	if err != nil {
		return nil, err
	}

	return b, nil
}

func examplesReactApiPageHome() ([]byte, error) {
	b, err := json.Marshal(struct {
		PageName  string `json:"page_name"`
		Message   string `json:"message"`
		AnyNumber int    `json:"any_number"`
	}{
		PageName:  "My Home Page",
		Message:   "it's just a 'home page' type of page",
		AnyNumber: 783,
	})
	if err != nil {
		return nil, err
	}

	return b, nil
}

func examplesReactApiPageAlert() ([]byte, error) {
	b, err := json.Marshal(struct {
		PageName  string `json:"page_name"`
		Message   string `json:"message"`
		AnyNumber int    `json:"any_number"`
	}{
		PageName:  "My Alert Page",
		Message:   "it's just a 'alert page' type of page",
		AnyNumber: 43895,
	})
	if err != nil {
		return nil, err
	}

	return b, nil
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
