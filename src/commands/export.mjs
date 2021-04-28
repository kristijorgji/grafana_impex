import Exporter from "../exporter.mjs";
import logger from "../logger.mjs";

export default class Export {
    constructor(api, argv) {
        this.api = api;
        this.argv = argv;
        this.exportedDir = `${this.argv.exportedDir}/${process.env.ENV || this.argv.env}`
        this.exporter = new Exporter(api, {
            exportedDir: this.exportedDir,
        })
    }

    async run() {
        logger.info(`Started exporting to ${this.exportedDir}`)
        await this.exporter.exportAll();
    }
}
