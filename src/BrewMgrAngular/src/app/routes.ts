import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './errors/404.component';

import {
    HopsListComponent,
    HopsItemComponent,
    IngredientService,
    HopResolver,
    HopsSearchComponent,
    HopsSearchContainer,
    HopDetailComponent
} from './ingredients/index'


export const ROUTES: Routes = [
    { path: '404', component: Error404Component },
    { path: 'home', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'hops', component: HopsListComponent },
    { path: 'searchhops', component: HopsSearchContainer },
    { path: 'hop/:id', component: HopDetailComponent, resolve: {hop: HopResolver} },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
