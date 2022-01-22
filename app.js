const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Register = require('./src/models/registers');
require('./src/db/conn');
const port = process.env.port || 3000;

const static_path = path.join(__dirname,"./public");
// const template_path = path.join(__dirname,"../templates/views");
// const partials_path = path.join(__dirname,"../templates/partials");
app.use(express.json())
app.use(bodyParser.json());
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.set("view engine" ,"hbs");
// app.set("views",template_path);
// hbs.registerPartials(partials_path);

// app.get("../registration",(req,res)=>{
//     res.render("registration");
// })

app.post("/sign_up", async(req,res,next)=>{
    try{
        
        let user = await Register.findOne({
            email : req.body.email
        });

        if(user){
            res.redirect("registered.html");
            // var err = new Error('A user with that email has already registered. Please use a different email..')
            // err.status = 400;
            // return next(err);
    
        }
        else {
            user = new Register({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email
            }) 

            // const registered = await newStudent.save();
            await user.save()
            res.status(201).redirect("index.html");
            // next();
        }    
        
    }
    catch(error){
        res.status(404).send(error);
    }
})

// app.post('/sign_up', function(req,res){
// 	var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
// 	var email =req.body.email;

// 	var data = {
// 		"firstname": firstname,
//         "lastname" : lastname,
// 		"email":email
// 	}
//     Register.insertOne(data,function(err, collection){
// 		if (err) throw err;
// 		console.log("Record inserted Successfully");
			
// 	});
		
// 	return res.redirect('index.html');
// })

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('index.html');
})




app.listen(port,()=>{
    console.log("server is running at port no "+port);
})