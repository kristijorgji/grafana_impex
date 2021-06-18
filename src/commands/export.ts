import Exporter from '../exporter';
import logger from '../logger';
import Api from '../api';

export type ExportArgs = { exportedDir: string; env: string };

export default class Export {
    private readonly api: Api;
    private readonly exportedDir: string;
    private readonly exporter: Exporter;

    constructor(api: Api, argv: ExportArgs) {
        this.api = api;
        this.exportedDir = `${argv.exportedDir}/${process.env.ENV || argv.env}`;
        this.exporter = new Exporter(api, {
            exportedDir: this.exportedDir,
        });
    }

    async run() {
        logger.info(`Started exporting to ${this.exportedDir}`);
        await this.exporter.exportAll();
    }
}
