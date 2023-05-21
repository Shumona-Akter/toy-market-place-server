const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.PORT || 3000
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())


// IQZasghmsl0avcH7
// kids-dreams


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjvax7z.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();
  // gallaery db
    const galleryCollection = client.db("kids-dreams").collection("gallery")
    // catagory db
    const catagoryCollection = client.db("kids-dreams").collection("catagory")
    // love products db
    const loveProductCollection = client.db("kids-dreams").collection("love_product")
    //  cars db
    const carsCollection = client.db("kids-dreams").collection("Cars")
    //  track db
    const trackCollection = client.db("kids-dreams").collection("track")
    //  cars db
    const policeCarsCollection = client.db("kids-dreams").collection("police")
    //  add toys db
    const addToysCollection = client.db("kids-dreams").collection("addToys")

    

    // galary
    app.get("/gallery",async (req, res)=>{
      const cursor = galleryCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // catagory
    app.get("/catagory",async (req, res)=>{
      const cursor = catagoryCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // love 
    app.get("/love",async (req, res)=>{
      const cursor = loveProductCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // cars 
    app.get("/car",async (req, res)=>{
      const cursor = carsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // cars 
    app.get("/track",async (req, res)=>{
      const cursor = trackCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    // cars 
    app.get("/police",async (req, res)=>{
      const cursor = policeCarsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
 
       // get my toys
       app.get("/addToys",async (req, res)=>{
         if(req.query?.email){
          let query = {}
          query ={email: req.query.email }
          const result =await addToysCollection.find(query).sort({price : -1}).toArray()
          return res.send(result)
        }
        const cursor = addToysCollection.find()
        const result = await cursor.limit(20).toArray()
        res.send(result)
      })

    //    get all toys
    // app.get("/addToys",async (req, res)=>{
    //   const cursor = addToysCollection.find()
    //   const result = await cursor.toArray()
    //   res.send(result)
    // })
    

    app.get("/addToys/:id",async (req, res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await addToysCollection.findOne(query)
      console.log(result)
      res.send(result)
    })


    app.post('/addToys', async(req, res)=>{
      const addToys = req.body;
      const result = await addToysCollection.insertOne(addToys)
      res.send(result)
    })

    app.delete('/addToys/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await addToysCollection.deleteOne(query)
      res.send(result)
    })
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 
})