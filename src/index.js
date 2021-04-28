import * as config from './config.mjs'
import Api from "./api.mjs";
import Yargs from "yargs"
import Export from "./commands/export.mjs";
import Import from "./commands/import.mjs";

const api = new Api(config.grafana);

const argv = Yargs(process.argv.slice(2))
    .command('export [env]', 'start the server', (yargs) => {
        yargs
            .positional('env', {
                describe: 'env folder to export to',
                default: 'default'
            })
            .option('exportedDir', {
                describe: 'directory where to export resources, runtime path will also append env',
                default: 'exported'
            })
    }, (argv) => {
        new Export(api, argv).run()
    })
    .command('import [fromEnv]', 'Import resources to current grafana connection from given env', (yargs) => {
        yargs
            .positional('fromEnv', {
                describe: 'env folder to export to',
            })
            .demandOption('fromEnv')
            .option('importedDir', {
                describe: 'directory where to look for the resources which to import, by default exported/[fromEnv]',
                default: 'exported'
            })
    }, (argv) => {
        new Import(api, argv).run();
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .demandCommand(1)
    .epilog('@Kristi Jorgji - 2021')
    .version('0.0.1')
    .argv
