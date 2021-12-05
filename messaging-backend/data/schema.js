import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';

const typeDefs = `
    type User {
        id: ID,
        firstName: String
        lastName: String
        email: String
        username: String
        password: String
        address: Address
    }

    type Address {
        num: Int
        street: String
        city: String
        state: String
        country: String
        postCode: String
    }

    type Nickname {
        user_id: ID
        nickname: String
    }

    type Reaction {
        reaction: String
        author: ID
    }

    type Message {
        _id: ID
        author: ID
        timestamp: String
        body: String
        reactions: [Reaction]
    }

    type Room {
        id: ID
        nicknames: [Nickname]
        messages: [Message]
        title: String
    }

    type Query {
        user(_id: ID,
            firstName: String,
            lastName: String,
            email: String,
            username: String,
            password: String,
            address: AddressInput): [User]
        room(_id: ID,
            title: String): [Room]
    }

    input UserInput {
        firstName: String
        lastName: String
        email: String
        username: String
        password: String
        address: AddressInput
    }

    input AddressInput {
        num: Int
        street: String
        city: String
        state: String
        country: String
        postCode: String
    }

    input RoomInput {
        title: String
    }

    input MessageInput {
        author: ID
        body: String
    }

    type Mutation {
        createUser(input: UserInput): User
        createRoom(input: RoomInput): Room
        addMessage(room: ID, input: MessageInput): Message
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
