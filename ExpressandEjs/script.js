const express=require('express');
const ejs=require('ejs');
const app=express();
const fs=require('fs');
const users=require('./users.json');

app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{name:'John Doe',age:30});
})
app.get('/about',(req,res)=>{
    const name = req.query.name;
    const age = req.query.age;


    if (name && age) {
       // users=fs.readFileSync('./users.json');
        //users=JSON.parse(users);
        users.push({ name: name, age: age });
        fs.writeFileSync('./users.json', JSON.stringify(users));
    }
    

    res.render('about', {
       
        users: users
    });
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});