package database

import (
	"fmt"
	"log"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Username string `bson:"username" json:"username"`
	Email    string `bson:"email" json:"email"`
}

type Board struct {
	Title string `bson:"title" json:"title"`
	Boxes string `bson:"boxes" json:"boxes"`
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
	log.Println(c)
	var err = c.Find(bson.M{"username": userName}).All(&result)

	if err != nil {
		log.Print(err)
	} else {
		fmt.Println("Email:", result[0].Email)
	}

	return result
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
