
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());


const port = process.env.port || 5000;



//brandShop
//hGclkNi4YM87YtrJ




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://brandShop:hGclkNi4YM87YtrJ@cluster0.cujftkr.mongodb.net/?retryWrites=true&w=majority";

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

        const productCollection = client.db("ProductDB").collection("Products");


        //single data post
        app.post("/products", async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            console.log(result);

            res.send(result);
        });

        //multiple data get
        app.get("/products", async (req, res) => {
            const result = await productCollection.find().toArray();
            console.log(result);
            res.send(result);
        });






        // update product
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            console.log("id", id);
            const query = {
                _id: new ObjectId(id),
            };

            const result = await productCollection.findOne(query);
            res.send(result)
        });

        // update product
        app.put("/products/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            console.log("id", id, data);
            const filter = {
                _id: new ObjectId(id),
            };
            const options = { upsert: true };
            const update = {
                $set: {
                    title: data.title,
                    price: data.price,
                    rating: data.rating,
                    imgURL: data.imgURL,
                    description: data.description,
                    brand: data.brand,
                    category: data.category,
                    // userEmail: data.userEmail,
                },
            };
            const result = await productCollection.updateOne(filter, update, options);
            res.send(result);
            console.log(result);
        });





        // advertisement slider data get 
        const advertisementCollection = client.db("ProductDB").collection("Advertisement");
        app.get("/advertisements", async (req, res) => {
            const result = await advertisementCollection.find().toArray();
            console.log(result);
            res.send(result);
        });



        // add to cart

        const addToCartCollection = client.db("ProductDB").collection("AddToCart");

        //single data post
        app.post("/addToCart", async (req, res) => {
            const cart = req.body;
            const result = await addToCartCollection.insertOne(cart);
            console.log(result);

            res.send(result);
        });

        //multiple data get
        app.get("/addToCart", async (req, res) => {
            const result = await addToCartCollection.find().toArray();
            console.log(result);
            res.send(result);
        });



        //delete product from cart
        app.delete("/addToCart/:id", async (req, res) => {
            const id = req.params.id;
            console.log("id", id);
            const query = {
                _id: id,
            };
            const result = await addToCartCollection.deleteOne(query);

            res.send(result);
            console.log(result);
        });









        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});