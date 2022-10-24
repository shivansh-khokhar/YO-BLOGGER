const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Hey! This is Shivansh. This project is a Dynamic Website, which is a daily journal with which you can make your own posts by clicking on to the Compose button in the the navbar above. Your posts will be shown on the home page after getting published from the compose page. The website is a client side website and therefore loses the data after getting refreshed.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let postTitle = "";
let postBody = "";

const posts = [];

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: posts
  });
});
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get('/posts/:postName', (req, res) => {

  const requestedName = lodash.lowerCase(req.params.postName);

  posts.forEach(function (posts) {
    let currName = lodash.lowerCase(posts.postTitle)
    if (currName == requestedName) {
      res.render("post", {
        postTitle: requestedName,
        postContent: posts.postBody
      });
    }

  });
});


app.post("/compose", function (req, res) {
  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  }
  posts.push(post);

  res.redirect("/");
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
