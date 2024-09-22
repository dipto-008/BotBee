const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const threadSchema = new Schema({
  threadId: { type: String, required: true, unique: true },
  title: { type: String, default: "" },
  prefix: { type: String, default: "" },
  threadImage: { type: String, default: "" },
threadAdmins: { type: [Object], default: [] },
 members:{ type: [Object], default: [] },
  count: { type: [Object], default: [] },
  settings: { type: Object, default: {} },
  games: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now() }
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;