import fs from "fs";

function normalizeDirName(dir) {
    const lastChar = dir.substr(-1);
    if (lastChar !== '/') {
        dir = dir + '/';
    }

    return dir;
}

export function walkDirFilesSyncRecursive(dir, fileList = [], extension = null) {
    dir = normalizeDirName(dir);
    const files = fs.readdirSync(dir);
    const extPattern = new RegExp('.*.' + extension + '$', 'i');

    files.forEach(function(file) {
        if (fs.statSync(dir + file).isDirectory()) {
            fileList.concat(walkDirFilesSyncRecursive(dir + file + '/', fileList, extension));
        } else {
            if (extension === null || extPattern.test(file)) {
                fileList.push({
                    name: file,
                    fullPath: dir + file,
                });
            }
        }
    });

    return fileList;
}
