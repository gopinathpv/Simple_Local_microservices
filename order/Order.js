const express = require('express')
const app = express();
const mongooose = require('mongoose')
const axios = require('axios')
const bodyparser = require('body-parser')
require("./Models/OrderModel")

app.use(bodyparser.json())

mongooose.connect("mongodb+srv://admin:Gopinath28@rest-shop-lij7y.mongodb.net/orderservice?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Database is up and Running")
})

const Order = mongooose.model("Order")

app.get('/',(req,res)=>{
    res.send('Get working in Customer server')
})

app.post('/orders',(req,res)=>{
 let newOrder ={
     customerId: mongoose.Types.ObjectId(req.body.customerId),
     orderdate: req.body.orderdate,
     expecteddate: req.body.expecteddate,
     findBook: mongoose.Types.ObjectId(req.body.findBook),

 }
 let order = new Order(newOrder)
 order.save().then(()=>{
     console.log("order Added")
 }).catch((err)=>{
    if(err){
        throw(err);
    }
 })
 res.send("New order Added to store")
})

app.get("/order",(req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        if(err){
            throw(err);
        }
     })
})

app.get("/orders/:id",(req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:3510/customers/"+order.customerId).then((response)=>{
                let orderval = {customerName: response.data.name, bookTitle: ''}
                                    axios.get("http://localhost:3010/books/"+order.findBook).then((response)=>{
                                        orderval.bookTitle = response.data.title;
                                        res.json(orderval)

        })

            })
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


app.listen(3600, ()=>{
    console.log("customer Server is Running")
})
