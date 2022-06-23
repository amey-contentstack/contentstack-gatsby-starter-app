import {
  MongoClient,
  ServerApiVersion,
} from 'mongodb';

export default async function handler(request, response) {
  const uri = process.env.MONGODB_URI
  let collection

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })

  const dbName = "demo-contentfly-functions"

  try {
    await client.connect()

    const db = client.db(dbName)
    collection = db.collection("documents")
  } catch (err) {
    console.log("Error connecting to db")
    response.status(500).json({
      body: "Error connecting to db",
      query: request.query,
      cookies: request.cookies,
    })
  }

  try {
    const result = await collection.insertOne(request.body)
    if (result) {
      response.status(200).json({
        body: result,
        query: request.query,
        cookies: request.cookies,
      })
    }
  } catch (err) {
    response.status(400).json({
      body: "BAD REQUEST",
    })
  } finally {
    await client.close()
  }
}
