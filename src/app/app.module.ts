import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, ContainerComponent, ChartComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
