import classes from './MeetupDetail.module.css';

export default function MeetupDetail({ meetup }) {
    return (
        <section className={classes.detail}>
            <h1 className={classes.title}>{meetup.title}</h1>
            <img width='100%' height='auto' src={meetup.image} alt={meetup.title} />
            <h3>{meetup.address}</h3>
            <p>{meetup.description}</p>
        </section>
    );
}