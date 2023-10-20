package confighandler

import (
	"fmt"
	"io/fs"
	"os"
	"path"

	"github.com/spf13/viper"

	"learning_project/supportingfunctions"
)

func NewConfig() (ConfigApp, error) {
	conf := ConfigApp{}

	getFileName := func(sf, confPath string, lfs []fs.DirEntry) (string, error) {
		for _, v := range lfs {
			if v.Name() == sf && !v.IsDir() {
				return path.Join(confPath, v.Name()), nil
			}
		}

		return "", fmt.Errorf("file '%s' is not found", sf)
	}

	setSettings := func(fn string) error {
		viper.SetConfigFile(fn)
		viper.SetConfigType("yaml")
		if err := viper.ReadInConfig(); err != nil {
			return err
		}

		// Настройки для модуля подключения к NATS
		if viper.IsSet("ServerHTTP.host") {
			conf.ServerHTTPConfig.Host = viper.GetString("ServerHTTP.host")
		}
		if viper.IsSet("ServerHTTP.port") {
			conf.ServerHTTPConfig.Port = viper.GetInt("ServerHTTP.port")
		}

		return nil
	}

	rootPath, err := supportingfunctions.GetRootPath("learning_project")
	if err != nil {
		return conf, err
	}

	confPath := path.Join(rootPath, "configs")

	list, err := os.ReadDir(confPath)
	if err != nil {
		return conf, err
	}

	confFileName, err := getFileName("config.yaml", confPath, list)
	if err != nil {
		return conf, err
	}

	//читаем конфигурационный файл
	if err := setSettings(confFileName); err != nil {
		return conf, err
	}

	return conf, nil
}
