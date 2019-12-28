const mongoose = require('mongoose')
mongoose.model("Book",{
    title:{type:String, require:true},
    author:{type:String, require:true},
    Language:{type:String, require:true}
})
