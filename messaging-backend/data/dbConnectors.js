import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/network", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addressSchema = new mongoose.Schema({
  num: Number,
  street: String,
  city: String,
  state: String,
  country: String,
  postCode: String,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  address: addressSchema,
  rooms: [mongoose.Schema.Types.ObjectId],
});

const nicknameSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  nickname: String,
});
const reactionSchema = new mongoose.Schema({
  reaction: String,
  author: mongoose.Schema.Types.ObjectId,
});
const messageSchema = new mongoose.Schema({
  author: mongoose.Schema.Types.ObjectId,
  timestamp: Date,
  body: String,
  reactions: [reactionSchema],
});

const roomSchema = new mongoose.Schema({
  nicknames: [nicknameSchema],
  messages: [messageSchema],
});

const Users = mongoose.model("users", userSchema);
const Rooms = mongoose.model("rooms", roomSchema);

export { Users, Rooms };
