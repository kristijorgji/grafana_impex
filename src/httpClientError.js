export default class HttpClientError extends Error {
    constructor(r) {
        super(`${r.status}: ${r.body}`);
        this.response = r;
    }

    static async new(r) {
        return new HttpClientError(
            {
                status: r.status,
                body: await r.text(),
            }
        )
    }
}
