import { Users, Rooms, Messages } from './dbConnectors.js';

export const resolvers = {
  Query: {
    user: (root, options) => {
      return new Promise((resolve, reject) => {
        Users.find(flattenObj(options), (err, user) => {
          if (err) reject(err);
          else resolve(user);
        });
      });
    },
    room: (root, options) => {
      return new Promise((resolve, reject) => {
        Rooms.find(flattenObj(options), (err, user) => {
          if (err) reject(err);
          else resolve(user);
        });
      });
    },
  },
  Mutation: {
    createUser: (root, { input }) => {
      const newUser = new Users({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        username: input.username,
        password: input.password,
        address: input.address,
      });

      newUser.id = newUser._id;

      return new Promise((resolve, reject) => {
        newUser.save((err) => {
          if (err) reject(err);
          else resolve(newUser);
        });
      });
    },
    createRoom: (root, { input }) => {
      const newRoom = new Rooms({
        title: input.title,
        nicknames: [],
        messages: [],
      });

      newRoom.id = newRoom._id;

      return new Promise((resolve, reject) => {
        newRoom.save((err) => {
          if (err) reject(err);
          else resolve(newRoom);
        });
      });
    },
    addMessage: (root, { room, input }) => {
      const newMessage = new Messages({
        author: input.author,
        timestamp: new Date().toISOString(),
        body: input.body,
        reactions: [],
      });
      return new Promise((resolve, reject) => {
        Rooms.findOneAndUpdate(
          { _id: room },
          {
            $push: {
              messages: newMessage,
            },
          },
          (err) => {
            if (err) reject(err);
            else resolve(newMessage);
          }
        );
      });
    },
  },
};

const flattenObj = (ob) => {
  let result = {};

  for (const i in ob) {
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};
