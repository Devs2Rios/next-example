import NewMeetupForm from '../components/meetups/NewMeetupForm';

export default function NewMeetup() {
    const addMeetupHAndler = (meetupData) => {
        console.log(meetupData);
    };

    return (
        <NewMeetupForm onAddMeetup={addMeetupHAndler} />
    );
}