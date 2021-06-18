import Importer from '../importer';
import logger from '../logger';
import JsonnetCompiler from '../jsonnetCompiler';
import Api from '../api';

export type ImportArgs = { importedDir: string; fromEnv: string };

export default class Import {
    private readonly api: Api;
    private readonly argv: ImportArgs;
    private readonly importedDir: string;
    private readonly importer: Importer;

    constructor(api: Api, argv: ImportArgs) {
        this.api = api;
        this.argv = argv;
        this.importedDir = `${argv.importedDir}/${argv.fromEnv}`;
        this.importer = new Importer(api, new JsonnetCompiler(), {
            importedDir: this.importedDir,
        });
    }

    async run() {
        logger.info(`Started importing from env ${this.argv.fromEnv}, directory ${this.importedDir}`);
        await this.importer.importAll();
    }
}
