db = connect("localhost:27017/restaurant");

// create food_supplies collection
db.createCollection("food_supplies", {
    validator: {
       $jsonSchema: {
            bsonType: "object",
            required: [ "name", "price", "inventory", "supplier" ],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                price: {
                    bsonType: "number",
                    minimum: 0,
                    description: "must be a neutral or positive value and is required"
                },
                inventory: {
                    bsonType: "number",
                    minimum: 0,
                    description: "must be a neutral or positive value and is required"
                },
                supplier: {
                    enum: [ "FoodStuffs", "PetsRUs", "FeedUs", "F.O.O.D" ],
                    description: "must be a registered supplier and is required"
                }
            }
       }
    }
 })


// create suppliers collection
 db.createCollection("suppliers", {
    validator: {
       $jsonSchema: {
            bsonType: "object",
            required: [ "name", "address" ],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                address: {
                    bsonType: "object",
                    required: [ "telephone", "city" ],
                    properties: {
                        telephone: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        street: {
                            bsonType: "string",
                            description: "must be a string if the field exists"
                        },
                        city: {
                            bsonType: "string",
                            "description": "must be a string and is required"
                        }
                    }
                }
            }
       }
    }
 })