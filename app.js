const multer = require('multer');
const express = require('express');
const csvtojson = require('csvtojson');
const { json } = require('express');
const bodyParser = require('body-parser');
const app = express();
const csvFilePath = "people.csv";


const upload = multer({ dest: 'tmp/csv/' });


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false}));


// Task A
app.post('/insertDoctor', (req, res) => {
    const doctor = req.body;
    if (!doctor.active) {
        console.log("not found");
    } else if (!doctor.id || doctor.resourceType != "Practitioner") {
        throw 'Invalid request!';
    } else {
        console.log("Doctor's name is: " + doctor.name[0].text);
        console.log("Facilities: ")
        doctor.facility.map((fac) => {
            console.log(fac.name);
        })
    }
})

// Task B
app.post('/insertCsv', upload.single('file'), (req, res) => {
    const csvFilePath = req.file.path;
    csvtojson()
        .fromFile(csvFilePath)
        .then((jsonObj) => {

            let id = '';
            let name = '';

            jsonObj.map((practitioner, index) => {
                if (id !== practitioner.ID) {
                    id = practitioner.ID;
                    name = practitioner.FamilyName;
                } else if (name !== practitioner.FamilyName) {
                    return res.status(404).send({ message: "Name is not corresponding with the given ID" });
                } 
                console.log(practitioner.FamilyName + ": " + practitioner.NameId);
            })
            
        })
});

// Task C



app.listen(9999);