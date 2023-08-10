import { MongoClient } from 'mongodb';
import { dbUri } from '../config';
import Metadata from '../components/meta/Metadata';
import MeetupList from "../components/meetups/MeetupList";

export default function Home({ meetups }) {
    return (
        <>
            <Metadata
                title='Meetups'
                description='The best meetups around the world'
            />
            <MeetupList meetups={meetups} />
        </>
    );
}

// Next looks for this function to get static props and pre-render the data
export async function getStaticProps() {
    // This code is never executed on the client side
    const client = await MongoClient.connect(dbUri),
        db = client.db(),
        meetupsCollection = db.collection('meetups'),
        meetups = await meetupsCollection.find().toArray();
    // .find() without arguments returns all the elements in the collection
    // .toArray() parses the JSON
    client.close();
    return {
        // This is the data that will be passed to the page component
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(), // Always convert the ObjectId to a string
                image: meetup.image,
                title: meetup.title,
                address: meetup.address,
            }))
        },
        revalidate: 10 // Seconds needed to update the static props
    };
}