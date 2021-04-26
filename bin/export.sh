#!/usr/bin/env bash

#Import env variables
envFile=".env${ENV:-}";
set -o allexport; source ${envFile}; set +o allexport

export EXPORTED_DIR="./exported/${ENV:-.default}"

if [ ! -d "${EXPORTED_DIR}" ]
then
    mkdir -p "${EXPORTED_DIR}"
fi

scriptsPath="bin"

. "./${scriptsPath}/export-folders.sh"
. "./${scriptsPath}/export-dashboards.sh"
. "./${scriptsPath}/export-datasources.sh"
