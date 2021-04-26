#!/usr/bin/env bash

exportedFoldersDir="${EXPORTED_DIR}/folders"
if [ ! -d "${exportedFoldersDir}" ]
then
    mkdir -p "${exportedFoldersDir}"
fi

foldersList="${EXPORTED_DIR}/folders.json"
curl "http://${username}:${password}@${hostAndPort}/api/folders?limit=1000" | jq > "${foldersList}"

jq -c '.[]' "${foldersList}" | while read i; do
    uid=$(echo $i | jq -r '.uid')
    curl "http://${username}:${password}@${hostAndPort}/api/folders/${uid}" | jq > "${exportedFoldersDir}/${uid}.json"
done
