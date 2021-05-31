import * as fs from 'fs';
import * as path from 'path';

const readFixture = <T>(name: string): T => {
    return JSON.parse(rawFixture(name)) as unknown as T;
};

const rawFixture = (name: string): string => {
    return fs.readFileSync(path.resolve(__dirname, `data/fixtures/${name}.json`)).toString();
};

export { readFixture, rawFixture };
