const express = require('./node_modules/express')
const app = express();
const mongooose = require('mongoose')
const bodyparser = require('./node_modules/body-parser')
require("./Models/CustomerModel")

app.use(bodyparser.json())

mongooose.connect("mongodb+srv://admin:Gopinath28@rest-shop-lij7y.mongodb.net/customerservice?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Database is up and Running")
})

const Customer = mongooose.model("Customer")

app.get('/',(req,res)=>{
    res.send('Get working in Customer server')
})

app.post('/customers',(req,res)=>{
 let newCustomer ={
     name: req.body.name,
     age: req.body.age,
     gender: req.body.gender
 }
 let customer = new Customer(newCustomer)
 customer.save().then(()=>{
     console.log("Customer Added")
 }).catch((err)=>{
    if(err){
        throw(err);
    }
 })
 res.send("New Customer Added to store")
})

app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        if(err){
            throw(err);
        }
     })
})

app.get("/customers/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customers)=>{
        console.log(res.statusCode)
        if(customers){
            res.json(customers)
        }
        else{
            res.status(404).json("invalid response") 
        }
    }).catch((err)=>{
        if(err){
            throw(err);
        }
     })
})

app.delete("/customers/:id",(req,res)=>{
    Customer.findOneAndDelete(req.params.id).then((customer)=>{
        res.send("customer deleted successfully");
    }).catch((err)=>{
        if(err){
            throw(err)
        }
    })
})

app.listen(3510, ()=>{
    console.log("customer Server is Running")
})
