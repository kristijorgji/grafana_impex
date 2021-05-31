// @ts-nocheck

type CleanupSchema = Record<string, SchemaRecordEntry> | string[] | string;
type SchemaRecordEntry = Record<string, string[] | string | SchemaRecordEntry>;

function _deleteObjKey(obj: Record<string, unknown>, schema: CleanupSchema) {
    if (typeof schema === 'string') {
        delete obj[schema];
        return;
    }

    if (Array.isArray(schema)) {
        for (const el: string | string[] | SchemaRecordEntry of schema) {
            if (typeof el === 'string') {
                delete obj[el];
            } else if (Array.isArray(el) || typeof el === 'object') {
                _deleteObjKey(obj, el);
            } else {
                throw new Error(`Unknown key ${el} with value of type ${typeof el}`);
            }
        }
    } else if (typeof schema === 'object') {
        for (const key in schema) {
            const kv: SchemaRecordEntry = schema[key];
            if (typeof kv === 'string') {
                delete obj[key];
            } else if (Array.isArray(kv) || typeof kv === 'object') {
                _deleteObjKey(key === '__root__' ? obj : obj[key], kv);
            } else {
                throw new Error(`Unknown key ${key} with value of type ${typeof kv}`);
            }
        }
    } else {
        throw new Error(`Unknown schema ${JSON.stringify(schema)} of type ${typeof schema}`);
    }
}

function _cleanObj<T>(obj: T, schema: CleanupSchema): T {
    const t: T = JSON.parse(JSON.stringify(obj)) as T;
    _deleteObjKey(t, schema);
    return t;
}

const DASHBOARD_CLEANUP_SCHEMA = {
    meta: ['expires', 'created', 'updated', 'version', 'folderId'],
    dashboard: ['id', 'version'],
};
export function cleanupDashboardBeforeSave<T>(dashboard: T): T {
    return _cleanObj(dashboard, DASHBOARD_CLEANUP_SCHEMA);
}

const DATASOURCE_CLEANUP_SCHEMA = {
    __root__: ['id', 'version', 'url', 'password', 'user', 'database'],
};
export function cleanupDatasourceBeforeSave<T>(datasource: T): T {
    return _cleanObj(datasource, DATASOURCE_CLEANUP_SCHEMA);
}

const FOLDER_CLEANUP_SCHEMA = {
    __root__: ['id', 'created', 'updated', 'version'],
};
export function cleanupFolderBeforeSave<T>(folder: T): T {
    return _cleanObj(folder, FOLDER_CLEANUP_SCHEMA);
}
