#!/usr/bin/env node

import * as config from './config';
import Api from './api';
import Yargs from 'yargs';
import Export, { ExportArgs } from './commands/export';
import Import, { ImportArgs } from './commands/import';

const VERSION = '0.0.2';

const api = new Api(config.grafana);

void Yargs(process.argv.slice(2))
    .command<ExportArgs>(
        'export [env]',
        'Export resources from provided .env connection',
        yargs => {
            yargs
                .positional('env', {
                    describe: 'env folder to export to',
                    default: 'default',
                })
                .option('exportedDir', {
                    describe: 'directory where to export resources, runtime path will also append env',
                    default: 'exported',
                });
        },
        argv => {
            void new Export(api, argv).run();
        },
    )
    .command<ImportArgs>(
        'import [fromEnv]',
        'Import resources to current grafana connection from given env',
        yargs => {
            yargs
                .positional('fromEnv', {
                    describe: 'env folder to export to',
                })
                .demandOption('fromEnv')
                .option('importedDir', {
                    describe:
                        'directory where to look for the resources which to import, by default exported/[fromEnv]',
                    default: 'exported',
                });
        },
        argv => {
            void new Import(api, argv).run();
        },
    )
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging',
    })
    .demandCommand(1)
    .epilog('@Kristi Jorgji - 2021')
    .version(VERSION).argv;
