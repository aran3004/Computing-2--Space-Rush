const express = require("express");
const Datastore = require("nedb");

const app = express();
const port = 1000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
app.use(express.static("./public"));
app.use(express.json());


const database = new Datastore("scores.db");
database.loadDatabase();


app.get("/leaderboard", function(request,response){
    database.find({}, function (err, data){
        if(err){
            console.log(err.message);
        }
        response.json(data);
    });
});



app.post("/api", function(request,response){
    console.log("i got a request!!!");
    console.log(request.body);
    database.insert(request.body);
    response.json({
        status: "success"
    });
});