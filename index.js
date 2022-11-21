// npm install pusher
// npm install express
// npm install cors

const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "REPLACEME",
  key: "REPLACEME",
  secret: "REPLACEME",
  cluster: "ap2",
  useTLS: true,
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/pusher/auth", function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: { name: "Mr Channels", twitter_id: "@pusher" },
  };
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
});

app.post('/chat', function(req, res) {
  const msg = req.body.msg;
  const user = req.body.user;
  const txt = `${user}: ${msg}`;
  pusher.trigger('presence-channel', 'chat', txt);
  res.send({
    'ok': 'ok'
  });
});
const port = process.env.PORT || 5000;
app.listen(port);
