import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MockDataService {
    constructor() {}

    getById(id: number) {
        return of({
            id,
            payload: 'some data info',
        });
    }

    getStatistics(entityId: number | undefined, statisticsType: string | undefined) {
        return of({
            id: entityId,
            payload: `here is your  ${statisticsType} statistics`,
        });
    }
}
