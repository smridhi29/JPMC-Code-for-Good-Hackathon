const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const ejs = require("ejs");
const mongoose=require('mongoose');
const path = require('path');
const Mentor = require('./server/models/mentor')
const Student = require('./server/models/student')
const Manager = require('./server/models/manager')
// const Test = require('./server')


const app = express();

require('dotenv').config()


const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors()); 
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.join(__dirname,"views", "components"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,'views/public')));

const CONNECTION_URL = process.env.MONGO_URI;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log(`Mongoose connected successfully!`))
    .catch((error) => console.log(error.message));






app.get('/', (req, res)=> {
    
    // var newMentee = new Student({
    //     username: "mentee",
    //     password: "mentee",
    //     mentor: ""
    //   })
    //   newMentee.save();
      
      res.render('index');
})

app.post('/',(req,res)=> {
    var username = req.body.username;
    var password = req.body.password;
    var input= req.body.input;

    switch (input) {
        case "mentor":
            Mentor.findOne({username,password}, (err, user)=>{
                if(err){
                    console.log(err);
                }
                if(!user){
                    console.log("user not found");
                }
                else{
                    console.log(user);
                    res.render("mentor");
                }
            })
        break;

        case "mentee":
            Student.findOne({username,password}, (err, user)=>{
                if(err){
                    console.log(err);
                    
                }
                if(!user){
                    console.log("user not found");
                }
                else{
                    console.log(user);
                    res.render("mentee", {mentor: user.mentor});
                }
            })
            break;

            case "manager":
                Manager.findOne({username,password}, (err, user)=>{
                    if(err){
                        console.log(err);
                    }
                    if(!user){
                        console.log("user not found");
                    }
                    else{
                        console.log(user);
                        res.render("manager");
                    }
                })
            break;
    }
})
var MentorRoute = require('./server/routes/mentor_route');
app.use('/mentor',MentorRoute);

var MenteeRoute = require('./server/routes/mentee_route');
app.use('/mentee',MenteeRoute);

var ManagerRoute = require('./server/routes/manager_route');
app.use('/manager',ManagerRoute);


app.get('/mentee', (req,res)=> {
    res.send('/mentee');
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
