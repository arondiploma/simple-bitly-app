process.env.NODE_ENV = 'test';

import app from './app';
import path from "path";
import request from 'supertest';
import BitlyClient from "./__mocks__/bitlyClient";
import Logger from "./__mocks__/logger";
import { bitlyToken as token } from "./config";

//Bitly General Token for API v3
const bitlyClientAPI = new BitlyClient(token);

//Request Logger
const requestLogger = new Logger(path.join(__dirname, "/tmp/"), "request.log");

const http = app({ bitlyClientAPI, requestLogger });

const long_url = "https://reactjs.org/docs/getting-started.html";

describe('Local REST API Testing', () => {
    test("Perform request /api/shorten", async () => {
        const response = await request(http)
            .post("/api/shorten")
            .send(`url=${long_url}`)
            .set('Accept', 'application/json');
        expect(response.type).toBe('application/json');
        expect(response.statusCode).toBe(200);
    });

    test("Perform request /api/shorten with invalid url(parameter) value", async () => {
        const response = await request(http)
            .post("/api/shorten")
            .send(`url=invalid/long/url`)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(500);
        expect(response.body.status_txt).toBe("INVALID_URI");
    });
});