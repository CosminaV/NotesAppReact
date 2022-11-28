let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const router = require("./routes/notes");

require("dotenv").config();

const sequelize = require("sequelize");
require("./models/note");

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.use((err, req, res, next) => {
    res.status(500).json({"ERROR":"General error"})
})


app.set("port", process.env.PORT || 8080) 

app.listen(app.get("port"), async () => {
    console.log(`Server is running on http://localhost:${app.get("port")}`);
    try{
        await Sequelize.authenticate();
        console.log("Connected");
    }
    catch (error){
        console.log("Unable to connect to the database: ", error);
    }
});