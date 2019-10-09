process.env.NODE_ENV = "test";

import fs from "fs";
import path from "path";
import Logger from "./logger";

const logPath = path.join(__dirname);
const defFile = "/default.log";
const logFile = "/request.test.log";
const requestLogger = new Logger(logPath, logFile);
const requestLoggerDefaultLog = new Logger(logPath);
const long_url = "http:/localhost:3000/test";
const short_url = "http://bit.ly/2ZXizvE";

const getLogData = (logPath, logFile, cb) => {
    fs.readFile(path.join(logPath, logFile), "utf8", (err, data) => {
        if (err) {
            cb(err.toString());
            return;
        }
        cb(data);
    });
}

const removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) throw err;
    });
}

afterAll(() => {
    removeFile(path.join(logPath, logFile));
    removeFile(path.join(logPath, defFile));
});

describe("Logger", () => {

    test("Check instance of object", () => {
        expect(requestLogger).toBeInstanceOf(Logger);
    });

    test("Don't perform log if request is not successful", async (done) => {
        const logData = await requestLogger.log({
            status_code: 400,
            data: {}
        });
        expect(logData).toEqual(false);
        done();
    });

    test("Perform log request", async (done) => {
        const text = await requestLogger.log({
            status_code: 200,
            data: {
                long_url: long_url,
                url: short_url
            }
        });
        getLogData(logPath, logFile, (logData) => {
            expect(logData).toEqual(text);
            done();
        });
    });

    test("Perform log request in 'default.log' if parameter 'file' is not specified", async (done) => {
        const text = await requestLoggerDefaultLog.log({
            status_code: 200,
            data: {
                long_url: long_url,
                url: short_url
            }
        });
        getLogData(logPath, defFile, (logData) => {
            expect(logData).toEqual(text);
            done();
        });
    });

});
