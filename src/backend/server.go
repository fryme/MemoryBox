package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"./database"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/mitchellh/mapstructure"
)

var DBConn database.DbConnection

func HandleUsers(res http.ResponseWriter, req *http.Request) {
	println("HandleUsers")

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

var boards []database.Board

// HandleBoards ...
func HandleBoards(w http.ResponseWriter, req *http.Request) {
	println("HandleBoards")
	/*
		res.Header().Set(
			"Content-Type",
			"text/json",
		)
	*/
	json.NewEncoder(w).Encode(boards)
	log.Println(boards)
	/*
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
	*/
}

// Auth
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

func CreateTokenEndpoint(w http.ResponseWriter, req *http.Request) {
	var user User
	_ = json.NewDecoder(req.Body).Decode(&user)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"password": user.Password,
	})
	tokenString, error := token.SignedString([]byte("secret"))
	if error != nil {
		fmt.Println(error)
	}
	json.NewEncoder(w).Encode(JwtToken{Token: tokenString})
}

func ProtectedEndpoint(w http.ResponseWriter, req *http.Request) {
	params := req.URL.Query()
	token, _ := jwt.Parse(params["token"][0], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("There was an error")
		}
		return []byte("secret"), nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		var user User
		mapstructure.Decode(claims, &user)
		json.NewEncoder(w).Encode(user)
	} else {
		json.NewEncoder(w).Encode(Exception{Message: "Invalid authorization token"})
	}
}

func main() {
	log.Print("Initializing db connection")

	DBConn.Connect(getDbPath())
	defer DBConn.Close()

	serverPath := getPath()
	var b database.Board
	b.Title = "hello, title"
	b.Boxes = "hello, boxes"
	boards = append(boards, b)

	router := mux.NewRouter()
	router.HandleFunc(pathAppend(serverPath, "authenticate"), CreateTokenEndpoint).Methods("POST")
	router.HandleFunc(pathAppend(serverPath, "protected"), ProtectedEndpoint).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "users"), HandleUsers).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "boards"), HandleBoards).Methods("GET")

	serverHost := getHost()
	println("Server will started at: " + serverHost)
	//println("Server installed paths: " + pathAppend(serverPath, "users") + ", " + pathAppend(serverPath, "boards"))

	http.ListenAndServe(getHost(), router)
}
