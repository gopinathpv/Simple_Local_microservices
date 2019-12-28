const mongoose = require('mongoose')
mongoose.model("Customer",{
    name:{type:String, require:true},
    age:{type:Number, require:true},
    gender:{type:String, require:true}
})
