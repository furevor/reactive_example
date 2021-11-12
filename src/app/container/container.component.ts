import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';
import { combineLatest, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, share, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
    resultData$: Observable<any> | undefined;
    // tslint:disable-next-line:no-any
    formData$: Observable<any> | undefined;
    loading = false;

    entityForm: FormGroup;
    constructor(
        private dataService: MockDataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.entityForm = fb.group({
            entityId: [],
            additionalParam: [],
        });
    }

    ngOnInit(): void {
        this.formData$ = this.entityForm.valueChanges.pipe(share());

        const entity$ = this.activatedRoute.queryParamMap.pipe(
            map(params => params.get('id')),
            filter(id => !!id),
            // @ts-ignore
            switchMap(id => {
                this.loading = true;
                // @ts-ignore
                return this.dataService.getById(+id);
            }),
            tap(entity => {
                this.loading = false;
                this.entityForm.patchValue({
                    entityId: entity.id,
                });
            }),
        );

        const additional$ = this.formData$.pipe(
            map(form => form.additionalParam),
            startWith(''),
        );

        this.resultData$ = combineLatest([entity$, additional$]).pipe(
            map(([entity, additional]) => {
                return {
                    entityId: entity.id,
                    additionalParam: additional,
                };
            }),
        );
    }
}
