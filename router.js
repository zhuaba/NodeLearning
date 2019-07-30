const express = require("express");
const fs = require("fs");
const Workers = require("./workers");

var router = express.Router();


router.get("/", (req, res)=>{
    Workers.find((err,data) => {
        if(err){
            return res.status(500).send('Server error');
        }
        res.render("index.html",  {
            fruits: [
                'Frank',
                'Karen',
                'Patric'
              ],
            workers: JSON.parse(data).workers
        });
    })
    
});

// router.get("/", (req, res)=>{
//     fs.readFile("./db.json","utf-8", (err, data) => {
//         if(err){
//             return res.status(500).send('Server error');
//         }
//         res.render("index.html",  {
//             fruits: JSON.parse(data).fruits,
//             workers: JSON.parse(data).workers
//         });
//     })
    
// });

router.get('/workers/new', function (req, res) {
    res.render("new.html")
})

router.post('/workers/new', function (req, res) {
    // 1. get the query body
    // 2. add new employee into the workers
    // 3. update the db.json file
    // 4. get the data and render into the page
    Workers.add(req.body, (err) => {
        console.log(req.body)
        if (err) {
            return res.status(500).send('Server error.')
          }
        res.redirect('/');
    })
})
/**
 * render the editing page
 */
router.get('/workers/edit', function (req, res) {
    // 1.get the student id
    // 2. show the student information in the newedit page
    Workers.getReadyEditInfo(parseInt(req.query.id), (err, data) => {
        if(err){
            console.log("Access to the edit page failed...");
        }
        res.render("newedit.html", {
            workers: data
        });
    })
})

/**
 * edit the selected employee's info
 */
router.post('/workers/edit', function (req, res) {
    // 1. get the info from the page
    // 2. readFile and change the selected one's info
    // 3. add a userID
    // 4. saving the changed info into the db
    Workers.editEmployeeById(req.body, (err) => {
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect("/");
    })
})

router.get('/workers/delete', function (req, res) {
    Workers.deleteById(parseInt(req.query.id), (err) => {
        if(err)res.status(500).send("loding failed...");
        res.redirect("/");
    })
})
module.exports = router;