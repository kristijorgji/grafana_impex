import {escape} from 'querystring'
import HttpClient from "./httpClient.mjs";
import HttpClientError from "./httpClientError.js";

export default class Api {
    constructor(config) {
        this.baseUrl = `http://${config.host}:${config.port}`
        this.baseUrlWithAuth = `http://${config.username}:${escape(config.password)}@${config.host}:${config.port}`
        this.c = new HttpClient({
            baseUrl: this.baseUrl,
            baseUrlWithAuth: this.baseUrlWithAuth,
            apiToken: config.apiToken,
        });
    }

    async getFolders() {
        return this.c.getJson('api/folders?limit=1000');
    }

    async getFolder(uid) {
        return this.c.getJson(`api/folders/${uid}`);
    }

    async createFolder(data) {
        return this.c.postJson('api/folders', data).then(async r => {
            if (r.status === 200) {
                return r.json();
            } else {
                throw await HttpClientError.new(r);
            }
        });
    }

    async getDatasources() {
        return this.c.getJson('api/datasources');
    }

    async getDatasource(id) {
        return this.c.getJson(`api/datasources/${id}`);
    }

    async createDatasource(data) {
        return this.c.postJson(`api/datasources`, data).then(async r => {
            if (r.status === 200) {
                return r.json();
            } else {
                throw await HttpClientError.new(r);
            }
        });
    }

    async updateDatasource(id, data) {
        return this.c.putJson(`api/datasources/${id}`, data).then(async r => {
            if (r.status === 200) {
                return r.json();
            } else {
                throw await HttpClientError.new(r);
            }
        });
    }

    async getDashboards() {
        return this.c.getJson('api/search?query=%');
    }

    async getDashboard(uid) {
        return this.c.getJson(`api/dashboards/uid/${uid}`);
    }

    async createOrUpdateDashboard(data) {
        return this.c.postJson(`api/dashboards/db`, data).then(async r => {
            if (r.status === 200) {
                return r.json();
            } else {
                throw await HttpClientError.new(r);
            }
        });
    }
}
