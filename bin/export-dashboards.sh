#!/usr/bin/env bash

exportedDashboardsDir="${EXPORTED_DIR}/dashboards"
if [ ! -d "${exportedDashboardsDir}" ]
then
    mkdir -p "${exportedDashboardsDir}"
fi

dashboardsList="${EXPORTED_DIR}/dashboards.json"
curl "http://${username}:${password}@${hostAndPort}/api/search?query=%" | jq > "${dashboardsList}"

jq -c '.[]' "${dashboardsList}" | while read i; do
    uid=$(echo $i | jq -r '.uid')
    #title=$(echo $i | jq -r '.title')
    curl "http://${username}:${password}@${hostAndPort}/api/dashboards/uid/${uid}" | jq > "${exportedDashboardsDir}/${uid}.json"
done
