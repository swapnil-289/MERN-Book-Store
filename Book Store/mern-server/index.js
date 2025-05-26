const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) =>{
    res.send('Hello World!')
})


//mongodb

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Book_Store:wnfwqkuTNIzPxVTI@bookstore.rxwmbol.mongodb.net/?retryWrites=true&w=majority&appName=BookStore";

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
    // Send a ping to confirm a successful connection

    //creating collection of document
    const booksCollection = client.db("BookInventory").collection("books");
    //insert a book to the database using POST method
    app.post("/upload-book", async(req, res) => {
        const data = req.body;
        const result = await booksCollection.insertOne(data);
        res.send(result);
    })

    //get all books from database
    app.get("/all-books", async(req, res) => {
        const books = await booksCollection.find();
        const result  = await books.toArray();
        res.send(result);   
    })

    //update the book data using patch or update method
    app.patch("/book/:id", async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const updateBookData = req.body;
        const filter = {_id: new ObjectId(id)};
        const option = { upsert: true };

        const updateDoc = {
            $set: {
                ...updateBookData
            }
        }
        const result = await booksCollection.updateOne(filter, updateDoc, option);
        res.send(result);
    })

    app.delete("/book/:id", async(req, res) =>{
      const id = req.params.id;
      const filter ={_id: new ObjectId(id)};
      const result = await booksCollection.deleteOne(filter);
      res.send(result);
    })

    app.get("/all-books", async(req, res) =>{
      let query ={};
      if(req.query?.category){
        query = {category: req.query.category}
      }
      const result = await booksCollection.find(query).toArray();
      res.send(result);
    })

    //to get single book data 
    app.get("/book/:id", async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await booksCollection.findOne(filter);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})