/* function one(name){
    function two(){
        console.log(name);
    }
    return two;
}

one("working");
two();
 */

/*  var obj={
     name:"vicks",
     age:20
 }
 console.log(obj);
 console.log(typeof obj);

 var str=JSON.stringify(obj);
 console.log(str);
 console.log(typeof str);

 var back=JSON.parse(str);
 console.log(back);
 console.log(typeof back); */

 var express=require('express');
 var bodyParser=require('body-parser');
 var app=express();
 var todos=[];
 var addid=1;
 
 var todo=[
     {
         id:1,
         name:"vic",
         age:20
     },{
         id:2,
         name:"mec",
         age:22
     }
 ]; 
app.use(bodyParser.json());

app.get('/view',function(req,res){
    res.json(todo); 

});

app.get('/todos',function(req,res){
   
    res.json(todos);

});

 app.get('/view/:id',function(req,res){
    var reqid=parseInt(req.params.id,10);
    var matchedid;
    todos.forEach(function(data){
        if(reqid===data.id){
            matchedid=data;
        }
    })
    if(matchedid){
        res.json(matchedid);
    }else{
        res.status(404).send();
    }

 });

 app.post('/todos',function(req,res){
     var body=req.body;
     
     body.id=addid++;
     todos.push(body);
     res.json(body);
 });
 
 app.listen(3000,function(){
     console.log('server started in 3000..');
 });
