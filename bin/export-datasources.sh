#!/usr/bin/env bash

exportedDataSourcesDir="${EXPORTED_DIR}/datasources"
if [ ! -d "${exportedDataSourcesDir}" ]
then
    mkdir -p "${exportedDataSourcesDir}"
fi

datasourcesList="${EXPORTED_DIR}/datasources.json"
curl "http://${username}:${password}@${hostAndPort}/api/datasources" | jq > "${datasourcesList}"


jq -c '.[]' "${datasourcesList}" | while read i; do
    id=$(echo $i | jq -r '.id')
    curl "http://${username}:${password}@${hostAndPort}/api/datasources/${id}" | jq > "${exportedDataSourcesDir}/${id}.json"
done
