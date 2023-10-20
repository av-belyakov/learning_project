package confighandler

type ConfigApp struct {
	ServerHTTPConfig
}

type ServerHTTPConfig struct {
	Host string
	Port int
}
