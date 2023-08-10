import { MongoClient } from "mongodb";
import { dbUri } from "../../config";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        // Connect to the database
        const client = await MongoClient.connect(dbUri),
            db = client.db(),
            meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close(); // Close the connection to the database
        // Send a response to the client
        res.status(201).json({ message: 'Meetup created!' });
    }
}