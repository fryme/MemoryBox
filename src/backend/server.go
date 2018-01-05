package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"
	"unicode"

	"./database"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/mitchellh/mapstructure"
)

var DBConn database.DbConnection

func HandleUsers(res http.ResponseWriter, req *http.Request) {
	log.Println("HandleUsers")

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

// HandleBoards ...
func HandleBoards(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleBoards")
	/*
		res.Header().Set(
			"Content-Type",
			"text/json",
		)
	*/

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(DBConn.GetBoards())
}

// HandleCards ...
func HandleCards(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleCards")

	//params := mux.Vars(req)
	//var person Person
	//_ = json.NewDecoder(req.Body).Decode(&person)
	//person.ID = params["id"]

	log.Println(req.URL.Query().Get("cardId"))

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(DBConn.GetCardData(req.URL.Query().Get("cardId")))
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
		log.Println(error)
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

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
var idSize = 10

func GenerateRandIdFromName(name string) string {
	var result string
	result = strings.Map(func(r rune) rune {
		if unicode.IsSpace(r) {
			return '-'
		}
		return r
	}, name)

	rand.Seed(time.Now().UTC().UnixNano())
	b := make([]rune, idSize)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}

	result += string(b)
	return result
}

func main() {
	log.Print("Initializing db connection")
	DBConn.Connect(getDbPath())
	defer DBConn.Close()

	log.Println(DBConn.GetBoards())

	serverPath := getPath()
	router := mux.NewRouter()
	router.HandleFunc(pathAppend(serverPath, "authenticate"), CreateTokenEndpoint).Methods("POST")
	router.HandleFunc(pathAppend(serverPath, "protected"), ProtectedEndpoint).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "users"), HandleUsers).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "boards"), HandleBoards).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "cards"), HandleCards).Methods("GET")

	serverHost := getHost()
	log.Println("Server will started at: " + serverHost)
	//log.Println("Server installed paths: " + pathAppend(serverPath, "users") + ", " + pathAppend(serverPath, "boards"))

	http.ListenAndServe(getHost(), router)
}
