// @ts-nocheck
import fetch from 'node-fetch';
import HttpClientError from './httpClientError';

export default class HttpClient {
    constructor(config) {
        this.urlAuth = !config.apiToken;
        this.baseUrl = config.baseUrl;
        this.baseUrlWithAuth = config.baseUrlWithAuth;
        this.apiToken = config.apiToken;
    }

    getJson(url) {
        return fetch(this._url(url), { headers: this._headers() }).then(async r => {
            if (r.status === 200) {
                return r.json();
            }
            throw await HttpClientError.new(r);
        });
    }

    postJson(url, data) {
        return fetch(this._url(url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers(),
            },
            body: JSON.stringify(data),
        });
    }

    putJson(url, data) {
        return fetch(this._url(url), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers(),
            },
            body: JSON.stringify(data),
        });
    }

    _url(path) {
        return `${this.urlAuth ? this.baseUrlWithAuth : this.baseUrl}/${path}`;
    }

    _headers() {
        return this.apiToken
            ? {
                  Authorization: `Bearer ${this.apiToken}`,
              }
            : {};
    }
}
