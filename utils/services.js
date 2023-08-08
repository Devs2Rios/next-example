import { DUMMY_MEETUPS } from "./data";

export async function getMeetups() {
    return DUMMY_MEETUPS;
}

export async function getMeetup(id) {
    return DUMMY_MEETUPS.find(meetup => meetup.id === id) || null;
}