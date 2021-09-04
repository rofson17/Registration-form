const express = require('express');
const path = require('path');
const hbs = require('hbs');

require('./db/conn');
const Registar = require('./models/registar');

const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Registration Form -home",
    home: "active",
    registar: "",
    login: "",
    user: "Sing up to get more imformation"
  });
});

app.get("/registar", (req, res) => {
  res.render("registar", {
    title: "Registration Form -sing up",
    home: "",
    registar: "active",
    login: ""
  })
});

//insert new users in our database
app.post("/registar", async (req, res) => {
  try {
    const password = req.body.newPassward;
    const conformPassword = req.body.conformPassword;
    if (password === conformPassword) {
      const newUser = new Registar({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: password,
        conformPassword: conformPassword
      });
      const registared = await newUser.save();
      res.status(201).render("index", {
        title: "Registration Form -sing up",
        home: "",
        registar: "active",
        login: "",
        user: "You are sing up, now log in"
      });

    } else res.send("password are not matching");

  } catch (err) {
    res.status(404).send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Registration Form -log in",
    home: "",
    registar: "",
    login: "active"
  })
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await Registar.findOne({ email: email });
    if (userEmail.password == password) {
      res.status(201).render("index", {
        title: `Registration Form -home`,
        home: "",
        registar: "active",
        login: "",
        user: `log in  as ${userEmail.name}`
      });
    } else {
      res.status(201).render("login", {
        title: `Registration Form -log in`,
        home: "",
        registar: "active",
        login: "",
        valid: `Invalid login impormation`
      });
    }
  } catch (err) {
    res.status(201).render("login", {
      title: `Registration Form -log in`,
      home: "",
      registar: "active",
      login: "",
      valid: `Invalid login impormation`
    });
  }
});

//404 error page
app.get("*", (req, res) => {
  res.render("404error", {
    title: "Page not found",
    home: "",
    registar: "",
    login: ""
  });
})

app.listen(port, () => {
  console.log(`listening to the port ${port}`)
});
