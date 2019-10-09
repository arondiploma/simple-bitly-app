import validUrl from 'valid-url';
import bitlyAPI from '../__data__/bitlyAPI';

/**
 * For testing
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
    return new Promise((resolve, reject) => {
      if (!validUrl.isUri(longUrl)) {
        resolve(JSON.parse(bitlyAPI.withInvalidURL()));
      } else {
        resolve(JSON.parse(bitlyAPI.withNewURL(longUrl)));
      }
    });
  }
}

export default BitlyClient;