import fetch, { HeadersInit, Response } from 'node-fetch';
import HttpClientError from './httpClientError';

type Config = {
    baseUrl: string;
    apiToken?: string;
    baseUrlWithAuth?: string;
};

export default class HttpClient {
    private readonly urlAuth: boolean;
    private readonly baseUrl: string;
    private readonly baseUrlWithAuth?: string;
    private readonly apiToken?: string;

    constructor(config: Config) {
        this.urlAuth = !config.apiToken;
        this.baseUrl = config.baseUrl;
        this.baseUrlWithAuth = config.baseUrlWithAuth;
        this.apiToken = config.apiToken;
    }

    getJson<T>(url: string): Promise<T> {
        return fetch(this._url(url), { headers: this._headers() }).then(async r => {
            if (r.status === 200) {
                return r.json() as unknown as T;
            }
            throw await HttpClientError.new(r);
        });
    }

    postJson(url: string, data: Record<string, unknown>): Promise<Response> {
        return fetch(this._url(url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers(),
            },
            body: JSON.stringify(data),
        });
    }

    putJson(url: string, data: Record<string, unknown>): Promise<Response> {
        return fetch(this._url(url), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers(),
            },
            body: JSON.stringify(data),
        });
    }

    _url(path: string): string {
        return `${this.urlAuth ? (this.baseUrlWithAuth as string) : this.baseUrl}/${path}`;
    }

    _headers(): HeadersInit {
        return this.apiToken
            ? {
                  Authorization: `Bearer ${this.apiToken}`,
              }
            : {};
    }
}
