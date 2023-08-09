import { getMeetup, getMeetups } from "../utils/services";
import MeetupDetail from '../components/meetups/MeetupDetail';

export default function Meetup({ meetup, error }) {
    if (error) return <p>Error: {error} </p>; {/* Appears if fallback is true */ }
    if (!meetup && !error) return <p style={{ textAlign: 'center' }}>Could not find meetup</p>;
    return <MeetupDetail meetup={meetup} />;
}

export async function getStaticPaths(context) {
    // You can get the params of the URL by using context.params 
    const meetups = await getMeetups(),
        meetupsIds = meetups.map(meetup => ({ params: { meetupId: meetup.id } }));
    return {
        paths: meetupsIds,
        fallback: true // It controls the page to render in case the path is not found
    };
}

export async function getStaticProps(context) {
    // You can get the params of the URL by using context.params 
    const id = context.params.meetupId;
    let meetup = null, error = null;
    await getMeetup(id)
        .then(data => meetup = data)
        .catch(err => error = err);
    return {
        props: { meetup, error }
    };
}