# How To Use Only With Bash

Copy `.env.dist` to `.env` and adjust the credentials for connection.

1. To export `datasources, folders, dashboards` from grafana instance:
```shell
./bin/export.sh
```

2. To import `datasources, folders, dashboards` to the instance specified in `.env`

```shell
./bin/import.sh default
```

Instead of `default` you can specify the environent which you used to export.

For example `ENV=prod ./bin/export.sh` will use env fil `.env.prod` and export at `exported/.prod`

Then you can import like
```shell
./bin/import.sh prod
```
