// @ts-nocheck
import dotenv from 'dotenv';

dotenv.config({ path: `.env${process.env.ENV ? `.${process.env.ENV}` : ''}` });

function requireEnv(key, defaultValue) {
    if (key in process.env) {
        return process.env[key];
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error(`Environment variable ${key} is required`);
}

export const grafana = {
    host: requireEnv('GRAFANA_HOST'),
    port: requireEnv('GRAFANA_PORT'),
    username: requireEnv('GRAFANA_USERNAME'),
    password: requireEnv('GRAFANA_PASSWORD'),
    apiToken: requireEnv('GRAFANA_API_TOKEN', null),
};
