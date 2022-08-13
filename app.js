const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Todotask = require('./models/todos_model');

//connection database

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("MongoDB Database connection successful");
}).catch(() => {
  console.log("connection failed");
})




app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static("public"));
app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static('views'));
app.get('/', async(req, res) => {
  try {
    const tasks = await Todotask.find();
    console.log(tasks);
    res.render('todos.ejs', { todoTasks: tasks });
  } catch (err) {
    console.log(err);
  }

})

app.post('/', async(req, res) => {
  const todotask = new Todotask({
    content: req.body.content
  });

  todotask.save().then(() => {
      console.log(todotask);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    })
})

app.get("/edit/:id", async(req, res) => {
  const id = req.params.id;
  try {
    const tasks = await Todotask.find();
    res.render('todoedit', { todoTasks: tasks, idTask: id })
  } catch (err) {
    console.log(err);
  }
})

app.post("/edit/:id", (req, res) => {
  const id = req.params.id

  Todotask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err)
      return res.send(500, err);
    res.redirect("/");

  })
})

app.get('/remove/:id', (req, res) => {
  const id = req.params.id;
  Todotask.findByIdAndDelete(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  })
})


app.listen(port, () => {
  console.log(`Running on ${port}`);
});