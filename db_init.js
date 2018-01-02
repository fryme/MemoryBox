
db_host = "localhost"
db_port = "27017"
db_name = "memory_boxes"

db = connect(db_host + ":" + db_port + "/" + db_name)

// cleanup
db.boards.drop()
db.users.drop()

// create collections

/*
users
boards -> boxes -> cards
*/
db.createCollection( "boards", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "title" ],
        properties: {
            title: { bsonType: "string" },
            boxes: [{
                bsonType: "object",
                required: [ "title" ],
                properties: {
                    title: { bsonType: "string" },
                    cards: [{
                        bsonType: "object",
                        required: [ "title" ],
                        properties: {
                            title: { bsonType: "string" },
                            data: { bsonType: "string" }
                        }
                    }]
                },
                description: "represents a box of cards"
            }],
            owner_id: {
                bsonType: "objectId",
                description: "object id of user owned this board"
            }
        },
    } } 
})

db.createCollection( "users", {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "user_name" ],
        properties: {
            user_name: { bsonType: "string" },
            email: {
                bsonType : "string",
                description: "must be a string and match the regular expression pattern"
            }
        }
    } }
 })

// insert default data

db.users.insert({'user_name':'oleg'})

//db.getCollectionNames()
//var collection = db.collection('test')
//var doc1 = {'hello':'doc1'}
//var doc2 = {'hello':'doc2'}
//var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}]
//collection.insert(doc1)
//collection.insert(doc2, {w:1}, function(err, result) {})
//collection.insert(lotsOfDocs, {w:1}, function(err, result) {})