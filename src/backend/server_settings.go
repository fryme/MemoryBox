package main

import "strconv"

type ServerSettings struct {
	host, path, version string
	port                int
	db_host             string
	db_name             string
}

func getSettings() *ServerSettings {
	settings := new(ServerSettings)
	settings.host = "localhost"
	settings.path = "api"
	settings.version = "v1"
	settings.port = 9090
	settings.db_host = "localhost:27017"
	settings.db_name = "memory_boxes"
	return settings
}

func getPath() string {
	settings := getSettings()
	return "/" + pathAppend(settings.path, settings.version)
}

func getHost() string {
	settings := getSettings()
	return ":" + strconv.Itoa(settings.port)
}

func getDbPath() string {
	settings := getSettings()
	return settings.db_host
}

func getDbName() string {
	settings := getSettings()
	return settings.db_name
}

// DB
var UsersCollection = "users"
