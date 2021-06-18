import { Response } from 'node-fetch';

type _R = { status: number; body: string };

export default class HttpClientError extends Error {
    private response: _R;

    constructor(r: _R) {
        super(`${r.status}: ${r.body}`);
        this.response = r;
    }

    static async new(r: Response): Promise<HttpClientError> {
        return new HttpClientError({
            status: r.status,
            body: await r.text(),
        });
    }
}
