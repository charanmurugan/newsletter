const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const { static } = require('express');
const https=require('https');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT||8080,function(){
  console.log("server started");    
})
app.get("/",function(req,res){
    res.sendFile(`${__dirname}/index.html`);
})
app.post("/",function(req,res){
    const firstName=req.body.FirstName;
    const secondName=req.body.SecondName;
    const email=req.body.Email;
    const message=req.body.message;
    var data={
        members:[
            {
                email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME: secondName,
                MESSAGE:message
            }
            }  
        ]
    };
    var jsonData=JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/db9c574c34";
    const options={
        method:"POST",
        auth:"charan245:48f6b98d5b97476bf05cf48fdaaaf404-us7"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(`${__dirname}/sucess.html`);
        }
        else{
            res.sendFile(`${__dirname}/failure.html`);
        }
        response.on("data",function(data){ 
            // console.log(data);         
        })
        
    })
 request.write(jsonData)
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})




// app key
// 48f6b98d5b97476bf05cf48fdaaaf404-us7
// list id
// db9c574c34