#!/usr/bin/env bash

#Import env variables
envFile=".env${ENV:-}";
set -o allexport; source ${envFile}; set +o allexport

function print_usage() {
	echo 'Usage: import.sh <FROM_ENV>'
	echo
	echo '  <FROM_ENV>     The env for source exported to be imported'
}

if [ "${#}" -lt 1 ]; then
	echo 'Wrong number of arguments'
	print_usage
	exit 1
fi

fromEnv=$1
export EXPORTED_DIR="./exported/.${fromEnv}"

buildBasePath=${BUILD_DIR:-"build"}

scriptsPath="bin"

. "./${scriptsPath}/import-folders.sh"
. "./${scriptsPath}/import-datasources.sh"
. "./${scriptsPath}/import-dashboards.sh"
