const mongoose = require('mongoose')
mongoose.model("Order",{
    customerId:{type:mongoose.SchemaTypes.ObjectId,required:true},
    orderdate:{type:Date, required:true},
    expectdate:{type:Date,required:true},
    findBook: {type:mongoose.SchemaTypes.ObjectId,required:true}
})
