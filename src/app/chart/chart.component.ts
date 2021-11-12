import { Component, Input, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
    @Input() entityId?: number | undefined;
    @Input() statisticsType?: string | undefined;
    @Input() data!: Observable<any> | undefined;
    statistics$: Observable<any> | undefined;

    constructor(private statisticsService: MockDataService) {}

    ngOnInit(): void {
        // @ts-ignore
        this.statistics$ = this.data.pipe(
            switchMap(data => this.statisticsService.getStatistics(data.entityId, data.additionalParam)),
        );
    }
}
