package database

import (
	"fmt"
	"log"
	"math/rand"
	"strings"
	"time"
	"unicode"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Id       string `bson:"id" json:"id"`
	Username string `bson:"username" json:"username"`
	Email    string `bson:"email" json:"email"`
}

type Board struct {
	Id    string `bson:"id" json:"id"`
	Title string `bson:"title" json:"title"`
	Boxes []Box  `bson:"boxes" json:"boxes"`
}

type Box struct {
	Id    string `bson:"id" json:"id"`
	Title string `bson:"title" json:"title"`
	Cards []Card `bson:"cards" json:"cards"`
}

type Card struct {
	Id    string `bson:"id" json:"id"`
	Title string `bson:"title" json:"title"`
}

type CardData struct {
	Id      string `bson:"id" json:"id"`
	Title   string `bson:"title" json:"title"`
	Content string `bson:"content" json:"content"`
}

type DbConnection struct {
	dbPath string
}

var (
	Session *mgo.Session
)

func (db DbConnection) Connect(dbPath string) bool {
	log.Println("DbConnection.Connect")
	db.dbPath = dbPath
	return true
}

func (db DbConnection) GetSession() *mgo.Session {
	session, err := mgo.Dial(db.dbPath)
	if err != nil {
		println("mgo.Dial fail")
		return nil
	}
	return session
}

func (db DbConnection) Close() {
	log.Println("DbConnection.Close")
	Session.Close()
}

func (db DbConnection) GetUser(userName string) []User {
	log.Println("DbConnection.GetUser")
	var result []User
	c := db.GetSession().DB("memory_boxes").C("users")
	var err = c.Find(bson.M{"username": userName}).All(&result)

	if err != nil {
		log.Print(err)
	} else {
		fmt.Println("Email:", result[0].Email)
	}

	return result
}

func (db DbConnection) GetBoards() []Board {
	log.Println("DbConnection.GetBoards")
	var result []Board

	boards := db.GetSession().DB("memory_boxes").C("boards")
	var err = boards.Find(nil).All(&result)

	// Fill card titles
	cards_data := db.GetSession().DB("memory_boxes").C("cards_data")
	for i := 0; i < len(result); i++ {
		for j := 0; j < len(result[i].Boxes); j++ {
			for k := 0; k < len(result[i].Boxes[j].Cards); k++ {
				var foundCard CardData
				cards_data.Find(bson.M{"id": result[i].Boxes[j].Cards[k].Id}).One(&foundCard)
				result[i].Boxes[j].Cards[k].Title = foundCard.Title
			}
		}
	}

	if err != nil {
		log.Print(err)
	}

	return result
}

func (db DbConnection) GetCardData(id string) CardData {
	log.Println("DbConnection.GetCardData, id:" + id)

	var result []CardData
	c := db.GetSession().DB("memory_boxes").C("cards_data")
	var err = c.Find(bson.M{"id": id}).All(&result)

	if err != nil {
		log.Print(err)
	}

	if len(result) > 1 {
		log.Println("More than one card data found!")
	}

	if len(result) > 0 {
		return result[0]
	} else {
		return CardData{}
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

	result += "-"
	result += string(b)
	return result
}

func (db DbConnection) AddBoard(name string) bool {
	log.Println("DbConnection.AddBoard, name: " + name)

	c := db.GetSession().DB("memory_boxes").C("boards")
	var err = c.Insert(&Board{GenerateRandIdFromName(name), name, nil})

	if err != nil {
		log.Print(err)
		return false
	}
	return true
}

func (db DbConnection) AddBox(boardId string, boxName string) bool {
	log.Println("DbConnection.AddBox, boardId: " + boardId + ", boxName: " + boxName)

	change := mgo.Change{
		Update: bson.M{"$push": bson.M{"boxes": Box{GenerateRandIdFromName(boxName), boxName, nil}}},
	}

	var _, err = db.GetSession().DB("memory_boxes").C("boards").Find(bson.M{"id": boardId}).Apply(change, nil)

	if err != nil {
		log.Print(err)
		return false
	}

	return true
}

func (db DbConnection) AddCard(boardId string, boxId string, cardName string) bool {
	log.Println("DbConnection.AddCard, boardId: " + boardId + ", boxId: " + boxId + ", cardName: " + cardName)

	/*
		db.boards.update(
			{ 'id':'vfvfv-oXEdEnVsQa',
			  'boxes.id': 'dsasv-XcPMDPcNFM'
			},
			{ $push:
			   {
				 'boxes.$.cards': {'id':'rain gear2222'}
			   }
			}
		)
	*/

	cardId := GenerateRandIdFromName(cardName)

	var toInsert string
	toInsert += "{ 'id': '"
	toInsert += cardId
	toInsert += "'}"
	change := mgo.Change{
		Update: bson.M{"$push": bson.M{"boxes.$.cards": bson.M{"id": cardId}}},
	}

	var _, err = db.GetSession().DB("memory_boxes").C("boards").Find(bson.M{"id": boardId, "boxes.id": boxId}).Apply(change, nil)

	if err != nil {
		log.Print(err)
		return false
	}

	err = db.GetSession().DB("memory_boxes").C("cards_data").Insert(&CardData{cardId, cardName, ""})

	if err != nil {
		log.Print(err)
		return false
	}

	return true
}

func (db DbConnection) UpdateCardData(cardId string, cardTitle string, cardData string) bool {
	log.Println("DbConnection.UpdateCardData, cardId: " + cardId + " cardData:" + cardData + " cardTitle:" + cardTitle)

	/*
		db.cards_data.update(
			{
				'id':'vfvfv-oXEdEnVsQa'
			},
			{ $set:
			   {
				 'id':'vfvfv-oXEdEnVsQaaa',
				 'title': 'rain gear2222',
				 'content': 'qqqq',
			   }
			}
		)
	*/

	cardsChange := mgo.Change{
		Update: bson.M{"$set": bson.M{"title": cardTitle, "content": cardData}},
	}

	var _, err = db.GetSession().DB("memory_boxes").C("cards_data").Find(bson.M{"id": cardId}).Apply(cardsChange, nil)

	if err != nil {
		log.Print(err)
		return false
	}

	return true
}

func (db DbConnection) InsertUser(userName string) bool {

	/*
		var err = c.Insert(&User{Username: "dog", Email: "blah@m.ru"})
		if err != nil {
			log.Print(err)
		}
	*/
	return true
}
