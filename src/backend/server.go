package main

import (
	"io"
	"log"
	"net/http"

	"./database"
)

var DBConn database.DbConnection

func handle_users(res http.ResponseWriter, req *http.Request) {
	println("handle_users")

	res.Header().Set(
		"Content-Type",
		"text/json",
	)

	log.Println(req.Header)
	log.Println(req.Body)

	//log.Println(req.Header["Access-Control-Request-Headers"]["x-custom-header"])

	user := DBConn.GetUser("Oleg")
	if len(user) == 0 {
		log.Println("Failed to get user")
	}

	User := map[string]string{}
	User["1"] = "1"

	io.WriteString(
		res,
		`<DOCTYPE html>
			<html>
			<head>
				<title>Hello World</title>
			</head>
			<body>
				Hello World!
			</body>
			</html>`,
	)
}

func handle_boards(res http.ResponseWriter, req *http.Request) {
	println("handle_boards")

	res.Header().Set(
		"Content-Type",
		"text/json",
	)

	User := map[string]string{}
	User["1"] = "1"

	io.WriteString(
		res,
		`<DOCTYPE html>
			<html>
			<head>
				<title>Hello World</title>
			</head>
			<body>
				Hello World!
			</body>
			</html>`,
	)
}

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type JwtToken struct {
	Token string `json:"token"`
}

type Exception struct {
	Message string `json:"message"`
}

func CreateTokenEndpoint(w http.ResponseWriter, req *http.Request) {}

func ProtectedEndpoint(w http.ResponseWriter, req *http.Request) {}

func main() {

	log.Print("Initializing db connection")

	DBConn.Connect(getDbPath())
	defer DBConn.Close()

	serverPath := getPath()
	type HandleFunction func(res http.ResponseWriter, req *http.Request) //(n int, err error)
	type Pair struct {
		path   string
		handle HandleFunction
	}
	//listeners := map[string]*HandleFunction{}
	//listeners["User"] := handle_users

	http.HandleFunc(pathAppend(serverPath, "users"), handle_users)
	http.HandleFunc(pathAppend(serverPath, "boards"), handle_boards)

	serverHost := getHost()
	println("Server will started at: " + serverHost)
	println("Server installed paths: " + pathAppend(serverPath, "users") + ", " + pathAppend(serverPath, "boards"))

	http.ListenAndServe(getHost(), nil)
}
