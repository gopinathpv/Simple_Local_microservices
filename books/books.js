const express = require('express')
const app = express();
const mongooose = require('mongoose')
const bodyparser = require('body-parser')
require("./Models/BookModel")

app.use(bodyparser.json())

mongooose.connect("mongodb+srv://admin:Gopinath28@rest-shop-lij7y.mongodb.net/bookservice?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log("Database is up and Running")
})

const Book = mongooose.model("Book")

app.get('/',(req,res)=>{
    res.send('Get working in book server')
})

app.post('/book',(req,res)=>{
 let newBook ={
     title: req.body.title,
     author: req.body.author,
     Language: req.body.Language
 }
 let book = new Book(newBook)
 book.save().then(()=>{
     console.log("Book Added")
 }).catch((err)=>{
    if(err){
        throw(err);
    }
 })
 res.send("New book Added to store")
})

app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        res.json(books)
    }).catch((err)=>{
        if(err){
            throw(err);
        }
     })
})

app.get("/books/:id",(req,res)=>{
    Book.findById(req.params.id).then((books)=>{
        console.log(res.statusCode)
        if(books){
            res.json(books)
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

app.delete("/books/:id",(req,res)=>{
    Book.findOneAndDelete(req.params.id).then((book)=>{
        res.send("Book deleted successfully");
    }).catch((err)=>{
        if(err){
            throw(err)
        }
    })
})

app.listen(3010, ()=>{
    console.log("Books Serve is Running")
})
