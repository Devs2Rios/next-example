import { useState, useEffect } from "react";
import { getMeetups } from "../utils/services";
import MeetupList from "../components/meetups/MeetupList";

export default function Home() {
    const [meetups, setMeetups] = useState([]),
        [isLoading, setIsLoading] = useState(true),
        [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        getMeetups()
            .then(data => {
                setMeetups(data);
                setIsLoading(false);
            }
            ).catch(
                err => {
                    setError('We couldn\'t get your meetups. Please try again later. :(');
                    setIsLoading(false);
                }
            );
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <MeetupList meetups={meetups} />
    );
}