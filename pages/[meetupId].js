import { MongoClient, ObjectId } from 'mongodb';
import { dbUri } from '../config';
import MeetupDetail from '../components/meetups/MeetupDetail';

export default function Meetup({ meetup, error }) {
    if (error) return <p style={{ textAlign: 'center' }}>Error: {error} </p>; {/* Appears if fallback is true */ }
    if (!meetup && !error) return <p style={{ textAlign: 'center' }}>Could not find meetup</p>;
    return <MeetupDetail meetup={meetup} />;
}

export async function getStaticPaths(context) {
    // You can get the params of the URL by using context.params 
    const client = await MongoClient.connect(dbUri),
        db = client.db(),
        meetupsCollection = db.collection('meetups'),
        meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // filtered 
    client.close();
    const meetupsIds = meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }));
    return {
        paths: meetupsIds,
        fallback: true // It controls the page to render in case the path is not found
    };
}

export async function getStaticProps(context) {
    // You can get the params of the URL by using context.params 
    const id = context.params.meetupId;
    let meetup = null, error = null;
    const client = await MongoClient.connect(dbUri),
        db = client.db(),
        meetupsCollection = db.collection('meetups');
    // When finding an object by its id you need to convert it into an ObjectId
    meetup = await meetupsCollection.findOne({ _id: new ObjectId(id) });
    // .findOne() is the method to find an object and we pass the element achieve the search
    if (!meetup) error = 'Could not find the meetup';
    else meetup = {
        id: meetup._id.toString(), // Always convert the ObjectId to a string
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description
    };
    client.close();
    return { props: { meetup, error } };
}