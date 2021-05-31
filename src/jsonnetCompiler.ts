// @ts-nocheck
import { execSync } from 'child_process';

export default class JsonnetCompiler {
    constructor(config = {}) {
        this.grafonnetPath = config.grafonnetPath || 'grafonnet-lib';
    }

    toObj(filePath) {
        const r = execSync(`JSONNET_PATH=${this.grafonnetPath} jsonnet ${filePath}`).toString();
        return JSON.parse(r);
    }
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
