import {
  MongoClient,
  ServerApiVersion,
} from "mongodb"

export default async function handler(req, res) {
  const MONGO_URI = process.env.MONGODB_URI
  console.log({ req })

  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })

  const dbName = "demo-contentfly-functions"

  try {
    await client.connect()

    const db = client.db(dbName)
    const collection = db.collection("documents")

    const { name, email, message } = req.body

    const result = await collection.insertOne({
      name,
      email,
      message,
    })

    console.log({ result })

    res.status(201)

    // Perform CRUD operation ...
    // Mongodb Client API docs https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
  } catch (err) {
    res.status(500)
  } finally {
    await client.close()
    res.send()
  }
}
