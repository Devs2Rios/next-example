import { getMeetups } from "../utils/services";
import MeetupList from "../components/meetups/MeetupList";

export default function Home({ meetups }) {
    return <MeetupList meetups={meetups} />;
}

// Next looks for this function to get static props and pre-render the data
export async function getStaticProps() {
    // This code is never executed on the client side
    const meetups = await getMeetups();
    return {
        // This is the data that will be passed to the page component
        props: { meetups },
        revalidate: 10 // Seconds needed to update the static props
    };
}