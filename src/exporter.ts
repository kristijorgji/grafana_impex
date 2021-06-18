// @ts-nocheck
import fs from 'fs';
import logger from './logger';
import { cleanupFolderBeforeSave, cleanupDatasourceBeforeSave, cleanupDashboardBeforeSave } from './exporterTools';
import Api from './api';

type Config = {
    exportedDir: string;
};

export default class Exporter {
    private readonly api: Api;
    private readonly exportedFoldersDir: string;
    private readonly exportedDatasourcesDir: string;
    private readonly exportedDashboardDir: string;

    constructor(api: Api, config: Config) {
        this.api = api;
        this.exportedFoldersDir = `${config.exportedDir}/folders`;
        this.exportedDatasourcesDir = `${config.exportedDir}/datasources`;
        this.exportedDashboardDir = `${config.exportedDir}/dashboards`;
    }

    async exportAll() {
        await this.exportDatasources();
        await this.exportFolders();
        await this.exportDashboards();
    }

    async exportFolders() {
        fs.mkdirSync(this.exportedFoldersDir, { recursive: true });
        const items = await this.api.getFolders();
        for (const el of items) {
            const exportPath = `${this.exportedFoldersDir}/${el.uid}.json`;
            logger.debug(`Exporting folder ${el.uid} to ${exportPath}`);
            const obj = await this.api.getFolder(el.uid);
            fs.writeFileSync(exportPath, JSON.stringify(cleanupFolderBeforeSave(obj), null, 2));
        }
    }

    async exportDatasources() {
        fs.mkdirSync(this.exportedDatasourcesDir, { recursive: true });
        const items = await this.api.getDatasources();
        for (const el of items) {
            const exportPath = `${this.exportedDatasourcesDir}/${el.name}.json`;
            logger.debug(`Exporting datasource ${el.name} to ${exportPath}`);
            const obj = await this.api.getDatasource(el.id);
            fs.writeFileSync(exportPath, JSON.stringify(cleanupDatasourceBeforeSave(obj), null, 2));
        }
    }

    async exportDashboards() {
        fs.mkdirSync(this.exportedDashboardDir, { recursive: true });
        const items = await this.api.getDashboards();
        for (const el of items) {
            const exportPath = `${this.exportedDashboardDir}/${el.uid}.json`;
            logger.debug(`Exporting dashboard ${el.uid} to ${exportPath}`);
            const obj = await this.api.getDashboard(el.uid);
            if (obj.meta.isFolder) {
                logger.debug(`Skipping because it is type folder`);
                continue;
            }
            fs.writeFileSync(exportPath, JSON.stringify(cleanupDashboardBeforeSave(obj), null, 2));
        }
    }
}
