
db_host = "localhost"
db_port = "27017"
db_name = "memory_boxes"

db = connect(db_host + ":" + db_port + "/" + db_name)

// cleanup
db.boards.drop()
db.users.drop()
db.cards_data.drop()

// create collections

/*
users
boards -> boxes -> cards
*/
db.createCollection( "boards", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "title", "id"/*, "owner_id" */],
        properties: {
            id: { bsonType: "string" },
            title: { bsonType: "string" },
            boxes: {
                bsonType: "array",
                required: [ "title" ],
                properties: {
                    title: { bsonType: "string" },
                    cards: {
                        bsonType: "array",
                        required: [ "id" ],
                        properties: {
                            id: { bsonType: "string" },
                        }
                    }
                },
                description: "represents a box of cards"
            },
            owner_id: {
                bsonType: "objectId",
                description: "object id of user owned this board"
            }
        },
    } } 
})

// cards_data
db.createCollection( "cards_data", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "id", "title" ],
        properties: {
            id: { bsonType: "string" },
            title: { bsonType: "string" },
            content: { bsonType: "string" },
        },
    } } 
})

// users
db.createCollection( "users", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "username" ],
        properties: {
            username: { bsonType: "string" },
            email: {
                bsonType : "string",
                description: "must be a string and match the regular expression pattern"
            }
        }
    } }
 })

// insert default/test data
db.users.insert({'username':'Oleg', 'email':'ollo@ollog.ru'})
db.boards.insert({'title':'What a title!', "id": "What-a-titleDAjZJRgVQx", 'boxes' : [
    {
        "id": "tudJsPwfbP",
        'title':'inner box if first title', 
        'cards': [
            { "id": "YOgYKWwxRZ" },
            { "id": "viuvyUQXur" }
        ]
    }]
})

db.cards_data.insert({'id': 'viuvyUQXur', 'content': "Inner data, wow!", 'title': 'first card in first box in first board'})
db.cards_data.insert({'id': 'YOgYKWwxRZ', 'content': "Other inner data, wow!", 'title': 'Another card in first box in first board'})

//db.getCollectionNames()
//var collection = db.collection('test')
//var doc1 = {'hello':'doc1'}
//var doc2 = {'hello':'doc2'}
//var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}]
//collection.insert(doc1)
//collection.insert(doc2, {w:1}, function(err, result) {})
//collection.insert(lotsOfDocs, {w:1}, function(err, result) {})