const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


const app = express();


const dbUri = "mongodb+srv://deepak:deepak@interview-exp.3z1qswm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
  
  // routes
  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  // blog routes
  app.use('/blogs', blogRoutes);
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });