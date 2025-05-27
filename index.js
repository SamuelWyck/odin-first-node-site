import url from "url";
import http from "http";
import fs from "fs";


function requestHandler(req, res) {
    const urlObject = url.parse(req.url, true);
    let fileName = `./templates/${urlObject.pathname}`;
    fileName = (urlObject.pathname === "/") ? "./templates/index.html" : fileName;
   
    fs.readFile(fileName, function(error, data) {
        if (error) {
            return fs.readFile("./templates/404.html", function(err, data) {
                res.writeHeader(404, {"content-type": "text/html"});
                res.write(data);
                return res.end();
            })
        }

        res.writeHeader(200, {"content-type": "text/html"});
        res.write(data);
        return res.end();
    });
};


http.createServer(requestHandler).listen(8080);