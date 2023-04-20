const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://ragulpretish:Ragul2002@cluster0.ciiiuso.mongodb.net/test", {
  useNewUrlParser: true
});

const commentSchema=new mongoose.Schema({
    postid:{
        type : String,
        required : true
    },
    username:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    upvotes : {
        type : Number,
        default : 0,
    }, 
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports=Comment