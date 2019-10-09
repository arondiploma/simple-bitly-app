process.env.NODE_ENV = 'test';

import mockRequest from 'request';
import bitlyAPI from '../../__data__/bitlyAPI';
import BitlyClient from "./bitlyClient";
import { bitlyToken as token, APIOptions as OPTIONS } from "../../config";
import querystring from 'querystring';

const invalid_token = "ajksdhask2i";
const bitlyClientAPI = new BitlyClient(token);
const bitlyClientAPI2 = new BitlyClient(invalid_token);

const buildQuery = (long_url, token) => {
    return querystring.stringify({
        access_token: token,
        domain: OPTIONS.domain,
        format: OPTIONS.format,
        longUrl: long_url
    });
};

const buildURL = (query) => {
    return `https://${OPTIONS.apiUrl}/${OPTIONS.apiVersion}/shorten?${query}`;
};

describe('Bitly Client', () => {

    test("Perform shorten with new url", async () => {
        var mockRequestCb;
        const long_url = "https://reactjs.org/docs/getting-started.html";

        //build query
        const query = buildQuery(long_url, token);
        const bitlyAPIUrl = buildURL(query);

        mockRequest.post.mockImplementationOnce((url, cb) => {
            mockRequestCb = cb;
            cb(null, null, bitlyAPI.withNewURL(url));
        })

        const result = await bitlyClientAPI.shorten(long_url);
        expect(result.status_code).toEqual(200);
        expect(result.data.new_hash).toEqual(1);
        expect(result.data.url).toEqual(expect.anything());
        expect(mockRequest.post).toHaveBeenCalledTimes(1);
        expect(mockRequest.post).toHaveBeenCalledWith(bitlyAPIUrl, mockRequestCb);
    });

    test("Perform shorten with old url(already in bitly)", async () => {
        var mockRequestCb;
        const long_url = "https://reactjs.org/docs/getting-started.html";

        //build query
        const query = buildQuery(long_url, token);
        const bitlyAPIUrl = buildURL(query);

        mockRequest.post.mockImplementationOnce((url, cb) => {
            mockRequestCb = cb;
            cb(null, null, bitlyAPI.withOldURL(url));
        })

        const result = await bitlyClientAPI.shorten(long_url);
        expect(result.status_code).toEqual(200);
        expect(result.data.new_hash).toEqual(0);
        expect(result.data.url).toEqual(expect.anything());
        expect(mockRequest.post).toHaveBeenCalledTimes(2);
        expect(mockRequest.post).toHaveBeenCalledWith(bitlyAPIUrl, mockRequestCb);
    });

    test("Perform shorten with invalid url", async () => {
        var mockRequestCb;
        const long_url = "invalid/long/url";

        //build query
        const query = buildQuery(long_url, token);
        const bitlyAPIUrl = buildURL(query);

        mockRequest.post.mockImplementationOnce((url, cb) => {
            mockRequestCb = cb;
            cb(null, null, bitlyAPI.withInvalidURL());
        })

        const result = await bitlyClientAPI.shorten(long_url);
        expect(result.status_code).toEqual(500);
        expect(result.status_txt).toEqual("INVALID_URI");
        expect(mockRequest.post).toHaveBeenCalledTimes(3);
        expect(mockRequest.post).toHaveBeenCalledWith(bitlyAPIUrl, mockRequestCb);
    });


    test("Perform shorten with already a bitlink", async () => {
        var mockRequestCb;
        const long_url = "http://bit.ly/30atsq6";

        //build query
        const query = buildQuery(long_url, token);
        const bitlyAPIUrl = buildURL(query);

        mockRequest.post.mockImplementationOnce((url, cb) => {
            mockRequestCb = cb;
            cb(null, null, bitlyAPI.alreadyBitlink());
        });

        const result = await bitlyClientAPI.shorten(long_url);
        expect(result.status_code).toEqual(500);
        expect(result.status_txt).toEqual("ALREADY_A_BITLY_LINK");
        expect(mockRequest.post).toHaveBeenCalledTimes(4);
        expect(mockRequest.post).toHaveBeenCalledWith(bitlyAPIUrl, mockRequestCb);
    });

    test("Perform shorten with invalid token", async () => {
        var mockRequestCb;
        const long_url = "https://reactjs.org/docs/getting-started.html";

        //build query
        const query = buildQuery(long_url, invalid_token);
        const bitlyAPIUrl = buildURL(query);

        mockRequest.post.mockImplementationOnce((url, cb) => {
            mockRequestCb = cb;
            cb(null, null, bitlyAPI.withInvalidToken());
        });

        const result = await bitlyClientAPI2.shorten(long_url);
        expect(result.status_code).toEqual(500);
        expect(result.status_txt).toEqual("INVALID_ARG_ACCESS_TOKEN");
        expect(mockRequest.post).toHaveBeenCalledTimes(5);
        expect(mockRequest.post).toHaveBeenCalledWith(bitlyAPIUrl, mockRequestCb);
    });
});