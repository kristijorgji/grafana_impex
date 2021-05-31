#!/usr/bin/env node

// @ts-nocheck

import * as config from './config';
import Api from './api';
import Yargs from 'yargs';
import Export from './commands/export';
import Import from './commands/import';

const VERSION = '0.0.2';

const api = new Api(config.grafana);

Yargs(process.argv.slice(2))
    .command(
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
            new Export(api, argv).run();
        },
    )
    .command(
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
            new Import(api, argv).run();
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
