const fs = require("fs");

exports.find = function(callback){
    fs.readFile("./db.json","utf-8", (err,data) => {
        if(err){callback(err)};
        callback(null,data);
    })
}

exports.add = function(worker, callback){
    
    fs.readFile("./db.json","utf-8", (err, data) => {
        if(err){callback(err)};
        var workers = JSON.parse(data).workers;

        worker.id = workers[workers.length - 1].id + 1;
        workers.push(worker);
        var workersStr = JSON.stringify({workers:workers});
        fs.writeFile("./db.json", workersStr, (err) => {
            if(err){
                callback(err);
            }
            callback(null);
        })
    })
}

exports.getReadyEditInfo = function(id, callback){
    fs.readFile("./db.json","utf-8", (err,data) => {
        if(err){
            callback(err);
        }
        var workers = JSON.parse(data).workers;
        var employee = workers.find( function(item) {
            return item.id === id;
        })
        callback(null, employee);
    })
    
}

exports.editEmployeeById = function(employee, callback){
    fs.readFile("./db.json","utf-8", (err,data) => {
        if(err){
            callback(err);
        }
        var workers = JSON.parse(data).workers;
        var worker = workers.find((item) => {
            return item.id === parseInt(employee.id);
        })
        for(var key in employee){
            worker[key] = employee[key];
        }
        fs.writeFile("./db.json", JSON.stringify({workers:workers}), function(err){
            if(err){callback(err)};
            callback(null);
        })  
    })
}

exports.deleteById = function(id, callback){
    fs.readFile("./db.json", "utf-8", (err,data) => {
        if(err){callback(err)}
        var workers =JSON.parse(data).workers;
        var result = workers.filter((item) => {
            return parseInt(item.id) !== id;
        });
        console.log(result);
        fs.writeFile("./db.json", JSON.stringify({workers: result}), (err) => {
            if(err)callback(err);
            callback(null);
        });
    })
}
