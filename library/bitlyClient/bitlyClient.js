import request from 'request';
import querystring from 'querystring';
import { APIOptions as OPTIONS } from '../../config';

/**
 * Local module that handle shorten of URL using bitly API
 */
class BitlyClient {
    /**
     * constructor
     * @param {string} token bitly general api token
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * convert long url to short using bitly API
     * @param {string} longUrl valid http url
     */
    shorten(longUrl) {

        //build query
        const query = querystring.stringify({
            access_token: this.token,
            domain: OPTIONS.domain,
            format: OPTIONS.format,
            longUrl: longUrl
        });

        const bitlyAPIUrl = `https://${OPTIONS.apiUrl}/${OPTIONS.apiVersion}/shorten?${query}`;

        return new Promise((resolve, reject) => {
            request.post(bitlyAPIUrl, (err, httpResponse, body) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        var data = JSON.parse(body);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    }
}

export default BitlyClient;