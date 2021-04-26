# grafana_impex

This is a grafana import/export tool that supports currently `grafana v7.1.4 (82a235b54c)`
And the following resources:
* Folders
* Datasources
* Dashboards

Can be used also with `grafonnet` to first compile json resources, then proceed and import them to grafana.

## 1. Requirements

#### 1. Bash shell
#### 2. Only If you want to use `grafonnet` 
If you want to use grafonnet for generating grafana json based on templates, then have to do the following steps
1. Clone in this dir the library grafonnet-lib, `git clone https://github.com/grafana/grafonnet-lib.git --depth=1` 
  
2. install [jsonnet](https://github.com/google/jsonnet#packages)


## 2. How To Use

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

## 3. Playground

If you want to have a grafana instance to play with, just to import/export against create docker throwaway container:
```shell
docker run --rm -d -p 3000:3000 grafana/grafana:7.1.4
```

## 4. License

Released under the MIT Licence. See the bundled LICENSE file for details.

