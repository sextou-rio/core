import { faker } from '@faker-js/faker';

const generateEvent = () => {
    return {
        title: faker.lorem.words({ min: 3, max: 6 }),
        slug: faker.lorem.slug({ min: 3, max: 6 }),
        description: faker.lorem.text(),
        date: faker.date.soon().toISOString()
    }
}

const generateUser = () => {
    return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
    }
}

export const batchEvents = (size: number = 10) => {
    const events = [];

    for (let index = 0; index < size; index++) {
        events.push(generateEvent())
    }

    return events;
}

export const batchUsers = (size: number = 10) => {
    const users = [];

    for (let index = 0; index < size; index++) {
        users.push(generateUser())
    }

    return users;
}