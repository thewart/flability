const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser")
// const request = require("request")

const app = express();
const dataDir = __dirname + '/data'

app.use(express.static("public"))

app.get("/", function(req, res) {
    
    res.sendFile(__dirname + "/menu.html")
})

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

// app.use(bodyParser.json({limit: '200mb'}));

app.post('/submit', function(req, resp) {
    
    // Generate Data
    var data = req.body;
    var filePath = dataDir + '/' + data.sessionID + '_' + data.workerID;
    var demoData = [data.studyID, data.workerID, data.sessionID, data.demographics].join(',');
    
    // Name  for data file
    fs.writeFileSync(filePath + '.txt', demoData);
    fs.writeFileSync(filePath + '.log', data.RTs);    
})


app.listen(3000, function() {
    console.log("Server Running")
});
