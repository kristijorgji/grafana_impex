// @ts-nocheck
import Importer from '../importer';
import logger from '../logger';
import JsonnetCompiler from '../jsonnetCompiler';

export default class Import {
    constructor(api, argv) {
        this.api = api;
        this.argv = argv;
        this.importedDir = `${this.argv.importedDir}/${this.argv.fromEnv}`;
        this.importer = new Importer(api, new JsonnetCompiler(), {
            importedDir: this.importedDir,
        });
    }

    async run() {
        logger.info(`Started importing from env ${this.argv.fromEnv}, directory ${this.importedDir}`);
        await this.importer.importAll();
    }
}
