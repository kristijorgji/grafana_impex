import dotenv from 'dotenv';

dotenv.config({ path: `.env${process.env.ENV ? `.${process.env.ENV}` : ''}` });

function requireEnv<T>(key: string, defaultValue?: T): T {
    if (key in process.env) {
        return process.env[key] as unknown as T;
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error(`Environment variable ${key} is required`);
}

export type GrafanaConfig = { host: string; port: number; username?: string; password?: string; apiToken?: string };

export const grafana: GrafanaConfig = {
    host: requireEnv<string>('GRAFANA_HOST'),
    port: requireEnv<number>('GRAFANA_PORT'),
    username: requireEnv<string | undefined>('GRAFANA_USERNAME'),
    password: requireEnv<string | undefined>('GRAFANA_PASSWORD'),
    apiToken: requireEnv<string | undefined>('GRAFANA_API_TOKEN'),
};
