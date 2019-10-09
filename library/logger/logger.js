// Import
import fs from 'fs';
import dateformat from 'dateformat';
import path from 'path';
/**
 * Logger
 */
class Logger {
    /**
     * constructor
     * @param {string} folder
     * @param {file} file
     */
    constructor(folder, file) {
        this.logPath = path.join(folder || __dirname, file || 'default.log');
    }

    log(result) {

        return new Promise((resolve, reject) => {
            //log successful request only
            if (result.status_code != 200) {
                resolve(false);
                return;
            }

            const now = new Date();
            const datetime = dateformat(now, 'dd-mmm-yyyy HH:MM:ss');

            //log request
            const logText = `${datetime} - ${result.data.long_url} ${result.data.url}\r\n`;

            // Save log to file.
            fs.appendFile(this.logPath, logText, 'utf8', function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve(logText);
                }
            });
        });

    }
}

// Export.
export default Logger;
