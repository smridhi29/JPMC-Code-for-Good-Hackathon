const express = require('express')
const router = express.Router();

Mentors = [{
    Name:'Mentor-1',
    Attendance:98,
    NumOfMentees:3
},{
    Name:'Mentor-2',
    Attendance:94,
    NumOfMentees:5
},
{
    Name:'Mentor-3',
    Attendance:45,
    NumOfMentees:2
},
{
    Name:'Mentor-4',
    Attendance:78,
    NumOfMentees:0
}]

Mentees = [{
    Name:'Mentee-1',
    Attendance:98,
    ntor:'Mentor-1'
},{
    Name:'Mentee-2',
    Attendance:56,
      Mentor:'Mentor-2'
},
{
    Name:'Mentee-3',
    Attendance:56,
    Mentor:'',
},
{
    Name:'Mentee-4',
    Attendance:56,
    Mentor:''
}]

router.get('/',(req,res)=>{
res.render("manager");
});

Feedback =[{
    mentor:"Mentor-1",
    session: "Session-1",
    rating: 3,
    suggestion: "Could Have Been Better"
},
{
    mentor:"Mentor-2",
    session: "Session-1",
    rating: 4,
    suggestion: "Was good and clean"
},
{
    mentor:"Mentor-1",
    session: "Session-1",
    rating: 2.5,
    suggestion: "Not Upto the Mark"
},
{
    mentor:"Mentor-2",
    session: "Session-2",
    rating: 3,
    suggestion: "Was boring"
},
]
router.get("/view-mentors",(req,res)=>{

    res.render("viewMentors",{
        Mentors:Mentors
    });
});

router.get("/add-organisation",(req,res)=>{
    res.render("addOrg",{
        mentors: Mentors
    })
});

router.get("/assign-mentors",(req,res)=>{
    res.render("assignMentors",{
        Mentees:Mentees
    });
});

router.get("/view-feedback",(req,res)=>{
    res.render("viewFeedback",{
        feedback:Feedback
    });
});

router.get("/addMentor/:name",(req,res)=>{
    var menteeName = req.params.name;
    var i,j;
    for (i=0;i<Mentors.length;i++){
        if(Mentors[i].NumOfMentees<5){
            Mentors[i].NumOfMentees++;
            for(j=0;j<Mentees.length;j++){
                if(Mentees[j].Name == menteeName){
                    Mentees[j].Mentor = Mentors[i].Name;
                    break;
                }
            }
            break;
        }
    }/*
    Mentors.forEach((mentor)=>{
        if(mentor.NumOfMentees<5){
            mentor.NumofMentees+=1;
            Mentees.forEach((mentee)=>{
                if(mentee.Name == menteeName){
                    mentee.Mentor = mentor.Name;
                }
            })
            break;
        }
    });*/
    console.log(Mentors);
    console.log(Mentees);
    res.render("assignMentors",{
        Mentees:Mentees
    });

})

router.get("/visualization",(req,res)=>{
    var labels1=[];
    var data1=[]
    var labels2=[];
    var data2=[]
    Mentees.forEach((mentee)=>{
        if(mentee.Mentor!=''){
            labels1.push(mentee.Name);
            data1.push(mentee.Attendance);
        }
    });
    Mentors.forEach((mentor)=>{
            labels2.push(mentor.Name);
            data2.push(mentor.Attendance);
    });
    res.render('visualization_manager',{
        labels1:JSON.stringify(labels1),
        data1:JSON.stringify(data1),
        labels2:JSON.stringify(labels2),
        data2:JSON.stringify(data2)
    });
    })
module.exports = router