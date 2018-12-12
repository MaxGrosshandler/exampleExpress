var express = require("express"),
mongoose = require("mongoose"),
bodyParser = require('body-parser')
var app = express();

var db;
if(process.env.ENV == 'Test')
    db = mongoose.connect("mongodb://localhost/bookAPI_test", {
        useNewUrlParser: true
    })
else {
db = mongoose.connect("mongodb://localhost/restFolder", {
    useNewUrlParser: true
})
}

var Book = require("./models/bookModel")

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

bookRouter = require('./Routes/bookRoutes')(Book)


app.use("/api/books", bookRouter)

app.get('/', function(req, res){
    res.send("Welcome to my API!")
})

app.listen(port, function(){
    console.log("Running on PORT: "+port)
})
module.exports = app;