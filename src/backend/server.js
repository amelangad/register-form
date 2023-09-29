import express from 'express';
import users from '../controllers/usersController.js'
//import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: false}));
app.use(express.json());

//app.use(cors);

//routes
app.use('/register', users);


//app.post('/register', function (req, res) {
//res.send('hello');
// console.log(req.body)
//});

app.listen(PORT)