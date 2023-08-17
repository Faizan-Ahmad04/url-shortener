const express = require("express");
const URL = require("./models/url");
const path = require('path');

const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 80;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //For seving static file

// SET VIEW ENGINE 
app.set('view engine', 'pug');
app.set('views',path.resolve('views'));

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/url", urlRoute);
app.use('/user', userRoute);
app.use('/',staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistroy: {
            timestamp: Date.now(),
        }
      },
    }
  );
  console.log(shortId);
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Start at PORT: ${PORT}`));
