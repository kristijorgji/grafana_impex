// @ts-nocheck
import fs from 'fs';
import { walkDirFilesSyncRecursive } from './utils';
import logger from './logger';

export default class Importer {
    constructor(api, compiler, config) {
        this.api = api;
        this.compiler = compiler;
        this.importedDir = config.importedDir;
        this.importedFoldersDir = `${config.importedDir}/folders`;
        this.importedDatasourcesDir = `${config.importedDir}/datasources`;
        this.importedDashboardDir = `${config.importedDir}/dashboards`;
    }

    async importAll() {
        await this.importDatasources();
        await this.importFolders();
        await this.importDashboards();
    }

    async importDatasources() {
        logger.info(`Importing datasources from ${this.importedDatasourcesDir}`);

        const creds = await this._getDatasourceCredentials();

        const files = walkDirFilesSyncRecursive(this.importedDatasourcesDir, [], 'json');
        for (const f of files) {
            let payload = JSON.parse(fs.readFileSync(f.fullPath, 'utf-8'));
            payload = {
                ...payload,
                ...(creds[payload.name] || {}),
            };

            try {
                logger.debug(`Creating datasource [${payload.name}]`);
                await this.api.createDatasource(payload);
                logger.debug(`Created datasource [${payload.name}]`);
            } catch (e) {
                if (e.response && e.response.status === 409) {
                    logger.warn(e.response.body);
                } else {
                    throw e;
                }
            }
        }
    }

    async _getDatasourceCredentials() {
        const templatesDir = `templates/datasources-credentials`;
        logger.info(`Reading datasource credentials after compiling templates at ${templatesDir}`);
        return await walkDirFilesSyncRecursive(templatesDir, [], 'jsonnet').reduce((m, f) => {
            logger.debug(`Compiling ${f.fullPath}`);
            const t = this.compiler.toObj(f.fullPath);
            m[t.name] = t;
            return m;
        }, {});
    }

    async importFolders() {
        logger.info(`Importing folders from ${this.importedFoldersDir}`);
        const files = walkDirFilesSyncRecursive(this.importedFoldersDir, [], 'json');
        for (const f of files) {
            const payload = JSON.parse(fs.readFileSync(f.fullPath, 'utf-8'));
            try {
                logger.debug(`Creating folder [${payload.title}]`);
                await this.api.createFolder(payload);
                logger.debug(`Created folder [${payload.title}]`);
            } catch (e) {
                if (e.response && e.response.status === 412) {
                    logger.warn(e.response.body);
                } else {
                    throw e;
                }
            }
        }
    }

    async importDashboards() {
        logger.info(`Importing dashboards from ${this.importedDashboardDir}`);

        const folders = await this.api.getFolders();

        const files = walkDirFilesSyncRecursive(this.importedDashboardDir, [], 'json');
        for (const f of files) {
            let payload = JSON.parse(fs.readFileSync(f.fullPath, 'utf-8'));
            logger.debug(`Creating dashboard [${payload.dashboard.title}]`);
            if (payload.meta.isFolder) {
                logger.debug(`Skipping because it is type folder`);
                continue;
            }

            delete payload.dashboard.id;
            payload = {
                overwrite: true,
                folderId: folders.find(el => el.title === payload.meta.folderTitle).id,
                dashboard: payload.dashboard,
            };

            await this.api.createOrUpdateDashboard(payload);
            logger.debug(`Created dashboard [${payload.dashboard.title}]`);
        }
    }
}
