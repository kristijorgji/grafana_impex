import fs from 'fs';

function normalizeDirName(dir: string): string {
    const lastChar = dir.substr(-1);
    if (lastChar !== '/') {
        dir += '/';
    }

    return dir;
}

type FileInfo = { name: string; fullPath: string };
export function walkDirFilesSyncRecursive(dir: string, fileList: FileInfo[] = [], extension?: string): FileInfo[] {
    dir = normalizeDirName(dir);
    const files = fs.readdirSync(dir);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const extPattern = new RegExp(`.*.${extension}$`, 'i');

    files.forEach(file => {
        if (fs.statSync(dir + file).isDirectory()) {
            fileList.concat(walkDirFilesSyncRecursive(`${dir + file}/`, fileList, extension));
        } else if (extension === undefined || extPattern.test(file)) {
            fileList.push({
                name: file,
                fullPath: dir + file,
            });
        }
    });

    return fileList;
}

export function parseFile<T>(path: string): T {
    return JSON.parse(fs.readFileSync(path, 'utf-8')) as T;
}
