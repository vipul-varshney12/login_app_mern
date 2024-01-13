const  mongoose=require("mongoose");

 const  userDetailsSchema=new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:{type:String,unique:true},
        password:String,

       
    },
    {
        collection:"userInformation"
    }
 );
 mongoose.model("userInformation",userDetailsSchema);