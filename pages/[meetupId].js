import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMeetup } from "../utils/services";
import MeetupDetail from '../components/meetups/MeetupDetail';


export default function Meetup() {
    const id = usePathname(),
        [meetup, setMeetup] = useState(null),
        [isLoading, setIsLoading] = useState(true),
        [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        getMeetup(id.replace('/', ''))
            .then(data => {
                setIsLoading(false);
                setMeetup(data);
            }
            ).catch(
                err => {
                    setMeetup(null);
                    setIsLoading(false);
                    setError('We couldn\'t get your meetup. Please try again later. :(');
                }
            );
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return <MeetupDetail meetup={meetup} />;
}