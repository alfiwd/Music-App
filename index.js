const http = require("http");
const express = require("express");
const hbs = require("hbs");
const app = express();
const routes = require("./routes/route");
const path = require("path");
const session = require("express-session");
const fileUpload = require("express-fileupload");

hbs.registerHelper("dateFormat", require("handlebars-dateformat"));

app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 1,
    },
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: true,
    secret: "SangatRahasia",
  })
);

app.use(function (request, response, next) {
  response.locals.message = request.session.message;
  delete request.session.message;
  next();
});

app.use(routes);

const port = 1000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server listening on port ${port}`);
