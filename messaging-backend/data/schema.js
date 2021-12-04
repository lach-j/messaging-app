import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";

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

    type Query {
        user(_id: ID,
            firstName: String,
            lastName: String,
            email: String,
            username: String,
            password: String,
            address: AddressInput): [User]
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

    type Mutation {
        createUser(input: UserInput): User
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
