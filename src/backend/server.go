package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"

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

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(DBConn.GetCardData(req.URL.Query().Get("cardId")))
}

type AddBoardData struct {
	BoardName string `json:"boardName"`
}

func HandleAddBoard(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleAddBoard")
	log.Println(req.Body)
	body, err := ioutil.ReadAll(req.Body)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	log.Println(string(body))
	var data AddBoardData
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	if !DBConn.AddBoard(data.BoardName) {
		http.Error(w, err.Error(), 500)
	}
}

type AddBoxData struct {
	BoardId string `json:"boardId"`
	BoxName string `json:"boxName"`
}

func HandleAddBox(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleAddBox")
	log.Println(req.Body)
	body, err := ioutil.ReadAll(req.Body)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	log.Println(string(body))
	var data AddBoxData
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	if !DBConn.AddBox(data.BoardId, data.BoxName) {
		http.Error(w, err.Error(), 500)
	}
}

type AddCardData struct {
	BoardId  string `json:"boardId"`
	BoxId    string `json:"boxId"`
	CardName string `json:"cardName"`
}

func HandleAddCard(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleAddCard")
	log.Println(req.Body)
	body, err := ioutil.ReadAll(req.Body)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	log.Println(string(body))
	var data AddCardData
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	if !DBConn.AddCard(data.BoardId, data.BoxId, data.CardName) {
		http.Error(w, err.Error(), 500)
	}
}

type UpdateCardData struct {
	CardId    string `json:"cardId"`
	CardTitle string `json:"cardTitle"`
	CardData  string `json:"cardData"`
}

func HandleUpdateCard(w http.ResponseWriter, req *http.Request) {
	log.Println("HandleUpdateCard")

	body, err := ioutil.ReadAll(req.Body)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	log.Println(string(body))
	var data UpdateCardData
	err = json.Unmarshal(body, &data)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Add("Content-Type", "text/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	if !DBConn.UpdateCardData(data.CardId, data.CardTitle, data.CardData) {
		http.Error(w, err.Error(), 500)
	}

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

func main() {
	log.Print("Initializing db connection")
	DBConn.Connect(getDbPath())
	defer DBConn.Close()

	serverPath := getPath()
	router := mux.NewRouter()
	router.HandleFunc(pathAppend(serverPath, "authenticate"), CreateTokenEndpoint).Methods("POST")
	router.HandleFunc(pathAppend(serverPath, "protected"), ProtectedEndpoint).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "users"), HandleUsers).Methods("GET")

	router.HandleFunc(pathAppend(serverPath, "boards"), HandleBoards).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "boards/add"), HandleAddBoard).Methods("POST")

	router.HandleFunc(pathAppend(serverPath, "boxes/add"), HandleAddBox).Methods("POST")

	router.HandleFunc(pathAppend(serverPath, "cards"), HandleCards).Methods("GET")
	router.HandleFunc(pathAppend(serverPath, "cards"), HandleAddCard).Methods("POST")
	router.HandleFunc(pathAppend(serverPath, "cards/update"), HandleUpdateCard).Methods("POST")

	serverHost := getHost()
	log.Println("Server will started at: " + serverHost)
	//log.Println("Server installed paths: " + pathAppend(serverPath, "users") + ", " + pathAppend(serverPath, "boards"))

	//go log.Fatal(http.ListenAndServe(":8080", http.FileServer(http.Dir("/usr/share/doc"))))
	http.ListenAndServe(getHost(), router)
}
