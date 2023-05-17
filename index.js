const express = require('express');
const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")

app.use(cors())

app.use(express.json())

require("dotenv").config()



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // here is databases

        const DB1 = client.db("usersMagedi").collection("infotg")



        app.get("/users", async (req, res) => {

            const cursor = DB1.find()
            const result = await cursor.toArray()

            res.send(result)


        })

        // ends of cursor


        // here is the post 

        app.post("/users", async (req, res) => {

            const user = req.body

            const result = await DB1.insertOne(user)

            res.send(result)


        })



        // delete

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id

            const filter = { _id: new ObjectId(id) }

            const result = await DB1.deleteOne(filter)
            res.send(result)
        })


        // find by id



        app.get("/users/:id", async (req, res) => {

            const id = req.params.id

            const finterOneObject = { _id: new ObjectId(id) }

            const result = await DB1.findOne(finterOneObject)

            res.send(result)

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);








app.get("/", (req, res) => {
    res.send("server is running ")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})