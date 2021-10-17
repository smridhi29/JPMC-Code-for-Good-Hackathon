const express = require("express");
const Tests = require('../models/test');
const route = express.Router()
var Webinar = require('../models/webinar');


route.get('/', (req, res)=> {
  res.render('mentee');
})

// route.get('/dashboard', (req, res)=> {
//     res.render('mentee_dashboard')
// })

route.get('/schedule', (req, res)=> {
    Tests.find({},function(err, test){
        if(err){
          console.log(err);
        }
        else{
          res.render('mentee_schedule',{
            testname: test
          });
        }
      })

})

route.get('/webinars', (req, res)=> {
  Webinar.find({},(err,webinar)=>{
    if(err){
      console.log(err)
    }
    else{
      res.render('mentee_webinars',{
        web: webinar
      });
    }
  })
    
})

Feedback=[]
route.get('/feedback',(req,res)=>{
    res.render("feedback");
});
route.post('/feedback',(req,res)=>{
    var mentee = req.body.mentee;
    var mentor = req.body.mentor;
    var rating = req.body.rating;
    var suggestion = req.body.suggestions;
    Feedback.push({
        mentee:mentee,
        mentor:mentor,
        rating:rating,
        suggestion:suggestion
    });
    console.log(Feedback);
    res.render("feedback");
});
var Grades=[{
  mentee:'Mentee-1',
  test:'Test-1',
  grade:78
},
{
  mentee:'Mentee-2',
  test:'Test-1',
  grade:80
},
{
  mentee:'Mentee-3',
  test:'Test-1',
  grade:87
},
{
  mentee:'Mentee-1',
  test:'Test-2',
  grade:75
},
{
  mentee:'Mentee-2',
  test:'Test-2',
  grade:65
},
{
  mentee:'Mentee-3',
  test:'Test-2',
  grade:90
},
]


route.get('/visualization',(req,res)=>{
  var labels=[];
  var data=[]
  var mentee_name = 'Mentee-1'
  Grades.forEach((grades)=>{
      if(grades.mentee == mentee_name){
          labels.push(grades.test);
          data.push(grades.grade);
      }
  });
res.render('visualization_mentee',{
labels:JSON.stringify(labels),
data:JSON.stringify(data)
});
})
route.get('/logout', (req,res)=>{
  res.redirect('/');
})


module.exports = route;