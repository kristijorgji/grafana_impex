import {cleanupDashboardBeforeSave, cleanupDatasourceBeforeSave} from '../src/exorterTools';
import { readFixture } from './utils';

describe('exporterTools', () => {
    it('should cleanupDashboardBeforeSave', function () {
        expect(cleanupDashboardBeforeSave(readFixture('api/dashboards/Mx2zJ_pZk'))).toEqual(
            readFixture('exported/dashboards/Mx2zJ_pZk'),
        );
    });

    it('should cleanupDatasourceBeforeSave', function () {
        expect(cleanupDatasourceBeforeSave(readFixture('api/datasources/1'))).toEqual(
            readFixture('exported/datasources/1'),
        );
    });
});
