import {fileURLToPath} from "url";
import express from "express";
import path from "path";
import fs from "fs";
import { get } from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();


app.get("/", function(req, res) {
    fs.readFile("./templates/index.html", function(error, data) {
        if (error) {
            return getErrorPage(res);
        }
        return res.end(data);
    });
});

app.get("/:name", function(req, res) {
    const options = {
        root: path.join(__dirname, "templates")
    };

    const fileName = req.params.name;

    return res.sendFile(fileName, options, function(err) {
        if (err) {
            return getErrorPage(res);
        }
    });
});


function getErrorPage(res) {
    fs.readFile("./templates/404.html", function(error, data) {
        if (error) {
            return res.send("error 404");
        }
        return res.end(data);
    });
};


const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {console.log("Server running!")});

// function requestHandler(req, res) {
//     const urlObject = url.parse(req.url, true);
//     let fileName = `./templates/${urlObject.pathname}`;
//     fileName = (urlObject.pathname === "/") ? "./templates/index.html" : fileName;
   
//     fs.readFile(fileName, function(error, data) {
//         if (error) {
//             return fs.readFile("./templates/404.html", function(err, data) {
//                 res.writeHeader(404, {"content-type": "text/html"});
//                 res.write(data);
//                 return res.end();
//             })
//         }

//         res.writeHeader(200, {"content-type": "text/html"});
//         res.write(data);
//         return res.end();
//     });
// };


// http.createServer(requestHandler).listen(8080);