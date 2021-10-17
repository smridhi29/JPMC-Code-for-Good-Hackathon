const express = require('express')
const router = express.Router()
const Test = require('../models/test');
const Webinar = require('../models/webinar');
const Mentee = require('../models/student');
var Mentor_name ='';
const Mentees=[{
    username:"Mentee-1",password:"Mentee-1",mentor:'Mentor-1',attendance:94
},{
    username:"Mentee-2",password:"Mentee-2",mentor:'Mentor-1',attendance:85
},{
    username:"Mentee-3",password:"Mentee-3",mentor:'Mentor-2',attendance:91
}]

var corres_mentees=[]

const Grades=[{
    mentee:'Mentee-1',
    test:'Test-1',
    grade:'A'
},
{
    mentee:'Mentee-2',
    test:'Test-1',
    grade:'B'
},
{
    mentee:'Mentee-3',
    test:'Test-1',
    grade:'A'
},
{
    mentee:'Mentee-1',
    test:'Test-2',
    grade:'B++'
},
{
    mentee:'Mentee-2',
    test:'Test-2',
    grade:'C++'
},
{
    mentee:'Mentee-3',
    test:'Test-2',
    grade:'A'
},
]

var MenteeGrades =[]
Mentor_name="Mentor-1";
    Mentees.forEach((mentee)=>{
        if(mentee.mentor == Mentor_name){
            corres_mentees.push(mentee.username);
        }
    });
router.get('/',(req,res)=>{
  res.render("mentor");  
})

router.get('/add-test',(req,res)=>{
    res.render("addTest");
})
router.post('/add-test',(req,res)=>{
    const testname = req.body.testName;
    const date = req.body.date;
    const testlink = req.body.testLink;
    const mentorName = req.body.mentorName;
    test = new Test({
        testname:testname,
        date:date,
        testlink:testlink,
        mentorName:mentorName
    });
    test.save((err)=>{
        if(err){
            console.log(err);
        }
    });

    const accountSid = 'ACb16f0344f899fbcd9b317a7ba7975e17'
    const authToken = 'f6ee54612f0ed5644cca613c46bd6d40'
    
    const client = require('twilio')(accountSid,authToken);
    client.messages.create({
        body:`Test is Schdeduled by ${mentorName} ${testname} on  ${date}` ,
        from:'(608) 234-5097',
        to:'+919655353980'
    }).then(message => console.log(message.sid))
    .catch(err =>console.log(err));

    res.redirect('/mentor');


});

router.get("/add-webinar",(req,res)=>{
    res.render("addWebinar");
});
router.post('/add-webinar',(req,res)=>{
    const webinarname = req.body.webinarname;
    const date = req.body.date;
    const webinarlink = req.body.webinarLink;
    webinar = new Webinar({
        webinarname:webinarname,
        date:date,
        webinarlink:webinarlink
    });
    webinar.save((err)=>{
        if(err){
            console.log(err);
        }
    });
});

router.get("/view-mentee",(req,res)=>{
    res.render("viewMentee",{Mentor_name:Mentor_name,Mentees:Mentees});
})

router.get("/attendance",(req,res)=>{
    res.render("attendance",{Mentor_name:Mentor_name,Mentees:Mentees});
});

router.get("/submissions",(req,res)=>{
    res.render("submissions");
})

router.get("/grades",(req,res)=>{
    Grades.forEach((grades)=>{
        if(corres_mentees.includes(grades.mentee)){
            MenteeGrades.push({
                Name:grades.mentee,
                testName:grades.test,
                grade:grades.grade
            });
        }
    })
    res.render("grades",{
        MenteeGrades:MenteeGrades
    });
    MenteeGrades=[];
});
router.get('/grade-student',(req,res)=>{
    res.render("gradeStudent");
});

router.post('/grade-student',(req,res)=>{
    var mentee = req.body.mentee;
    var test = req.body.test;
    var grade =  req.body.grade;
    Grades.push({
        mentee:mentee,
        test:test,
        grade:grade  
    });
    res.redirect('/mentor/grade-student')
})
router.get("/logout", (req, res)=>{
    res.redirect("/");
})
router.get('/visualization',(req,res)=>{
    var labels=[];
    var data=[]
    Mentees.forEach((mentee)=>{
        labels.push(mentee.username);
        data.push(mentee.attendance);
    });
res.render('visualization_mentor',{
labels:JSON.stringify(labels),
data:JSON.stringify(data)
});
})

module.exports = router