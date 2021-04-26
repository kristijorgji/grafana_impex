#!/usr/bin/env bash

echo -e "Importing exported dashboards\n"

find "${EXPORTED_DIR}/dashboards" -type f | while read relpath; do
  echo -e "Importing ${relpath}\n"
  payload="{\"dashboard\": $(jq '.dashboard | .id = null' "$relpath"), \"overwrite\": true}"
  curl -s -X POST \
  -H 'Content-Type: application/json' \
  -d "${payload}" \
  "http://${username}:${password}@${hostAndPort}/api/dashboards/db" | jq
done

echo -e "Building jsonnet templates and then importing\n"

removeString="templates/"
find templates/dashboards -type f | while read relpath; do
  dirname=$(dirname $relpath);
  subdir="${dirname/$removeString/}"
  filename=$(basename $relpath .jsonnet)

  buildPath="${buildBasePath}/$subdir"
  if [ ! -d "${buildPath}" ]
  then
      mkdir -p "${buildPath}"
  fi

  fullBuildPath="${buildPath}/${filename}.json"

  JSONNET_PATH=grafonnet-lib \
  jsonnet "${relpath}" > "${fullBuildPath}"

  echo -e "Compiled ${relpath} into ${fullBuildPath} and now will import \n"

  payload="{\"dashboard\": $(jq . "$fullBuildPath"), \"overwrite\": true}"
  curl -s -X POST \
  -H 'Content-Type: application/json' \
  -d "${payload}" \
  "http://${username}:${password}@${hostAndPort}/api/dashboards/db" | jq
done
