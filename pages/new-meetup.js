import { useRouter } from 'next/router';
import Metadata from '../components/meta/Metadata';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

export default function NewMeetup() {
    const router = useRouter(),
        addMeetupHandler = async (meetupData) => {
            console.log(meetupData);
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            router.replace('/');
        };

    return (
        <>
            <Metadata title="New Meetup" description="Create a new meetup" />
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}