const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const ejs=require('ejs');
var compiler = require('compilex');
const dir=__dirname;
var options = {stats : true}; 
compiler.init(options);
var ans="";
var code=""
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render("index",{ans:ans,code:code});
});
app.post('/output',function(req,res){
    console.log(req.body);  
    var code=req.body.code;
    var envData = { OS : "windows"}; 
    var envData = { OS : "linux" }; 
    if (req.body.language==1)
    {
        compiler.compileJava( envData , code , function(data){
            ans=data.output;
            console.log(data);
            res.render("index",{ans:ans,code:code}); 
        });

    }
    else if (req.body.language==2)
    {
        compiler.compilePython( envData , code ,function(data){
            ans=data.output;
            console.log(data);
            res.render("index",{ans:ans,code:code});        
        });
    }
    else if(req.body.language==3)
    {
        compiler.compileCPP(envData , code , function (data) {
            ans=data.output;
            console.log(data);
            res.render("index",{ans:ans,code:code});
        });
    }

});
app.listen(3000,function(req,res){
    console.log("App is running");
})