#!/usr/bin/env bash

echo -e "Importing exported datasources\n"

find "${EXPORTED_DIR}/datasources" -type f | while read relpath; do
  echo -e "Importing ${relpath}\n"
  payload="$(jq '.' "$relpath")"
  curl -s -X POST \
  -H 'Content-Type: application/json' \
  -d "${payload}" \
  "http://${username}:${password}@${hostAndPort}/api/datasources" | jq
done
