import express from "express";
import path from "path";
import bodyParser from "body-parser";

export default function (props) {

    const { bitlyClientAPI, requestLogger } = props;

    //http Server Instance
    const app = express();

    //static files from node_modules
    const staticFiles = ["bootstrap", "jquery", "clipboard"];

    // create application/x-www-form-urlencoded parser
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    //serve local static files
    app.use("/public", express.static(path.join(__dirname, "public")));

    //serve static files from node_modules
    staticFiles.forEach(key => {
        app.use(`/public/${key}`, express.static(path.join(__dirname, `node_modules/${key}/dist/`)));
    });

    //main html
    app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")));

    //api endpoint
    //receive a long URL and utilize the bitly API to return a short URL
    app.post("/api/shorten", urlencodedParser, (req, res) => {

        //retrieve url from post data
        var url = req.body.url;

        bitlyClientAPI
            .shorten(url)
            .then(result => {
                requestLogger.log(result);
                res.status(result.status_code).send(result);
            }).catch(err => {
                if (err.status_code) {
                    //error from Bitly API
                    res.status(err.statusCode).send(err);
                } else {
                    //local error
                    res.status(500).send({ "statusText": "Server Error!" });
                    throw err;
                }
            });
    });

    return app;
}