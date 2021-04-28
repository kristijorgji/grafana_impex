import fs from "fs";
import logger from "./logger.mjs";

export default class Exporter {
    constructor(api, config) {
        this.api = api
        this.exportedFoldersDir = `${config.exportedDir}/folders`
        this.exportedDatasourcesDir = `${config.exportedDir}/datasources`
        this.exportedDashboardDir = `${config.exportedDir}/dashboards`
    }

    async exportAll() {
        await this.exportDatasources()
        await this.exportFolders()
        await this.exportDashboards()
    }

    async exportFolders() {
        fs.mkdirSync(this.exportedFoldersDir, { recursive: true });
        const items = await this.api.getFolders();
        for (const el of items) {
            const exportPath = `${this.exportedFoldersDir}/${el.uid}.json`;
            logger.debug(`Exporting folder ${el.uid} to ${exportPath}`)
            const obj = await this.api.getFolder(el.uid);
            fs.writeFileSync(exportPath, JSON.stringify(obj, null, 2));
        }
    }

    async exportDatasources() {
        fs.mkdirSync(this.exportedDatasourcesDir, { recursive: true });
        const items = await this.api.getDatasources();
        for (const el of items) {
            const exportPath = `${this.exportedDatasourcesDir}/${el.id}.json`;
            logger.debug(`Exporting datasource ${el.id} to ${exportPath}`)
            const obj = await this.api.getDatasource(el.id);
            fs.writeFileSync(exportPath, JSON.stringify(obj, null, 2));
        }
    }

    async exportDashboards() {
        fs.mkdirSync(this.exportedDashboardDir, { recursive: true });
        const items = await this.api.getDashboards();
        for (const el of items) {
            const exportPath = `${this.exportedDashboardDir}/${el.uid}.json`;
            logger.debug(`Exporting dashboard ${el.uid} to ${exportPath}`)
            const obj = await this.api.getDashboard(el.uid);
            fs.writeFileSync(exportPath, JSON.stringify(obj, null, 2));
        }
    }
}
