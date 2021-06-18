import { execSync } from 'child_process';

export default class JsonnetCompiler {
    private readonly grafonnetPath: string;

    constructor(config: { grafonnetPath?: string } = {}) {
        this.grafonnetPath = config.grafonnetPath || 'grafonnet-lib';
    }

    toObj<T>(filePath: string): T {
        const r = execSync(`JSONNET_PATH=${this.grafonnetPath} jsonnet ${filePath}`).toString();
        return JSON.parse(r) as T;
    }
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
