import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

//import '../styles/styles.css';
import { AppComponent } from './app/app.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './errors/404.component';
import { ROUTES } from './routes'
import { ToastrService } from './common/toastr.service';
import { AppConfiguration } from './common/appConfiguration';

import {
    HopsListComponent,
    HopsItemComponent,
    IngredientService,
    HopResolver,
    HopsSearchComponent,
    HopsSearchContainer,
    HopDetailComponent
} from './ingredients/index'

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavBarComponent,
        CounterComponent,
        FetchDataComponent,
        HopsListComponent,
        HopsItemComponent,
        HopDetailComponent,
        HopsSearchComponent,
        HopsSearchContainer,
        HomeComponent,
        Error404Component
        ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES, { enableTracing: true,useHash: true, preloadingStrategy: PreloadAllModules })
    ],
    providers: [ 
        HopResolver,        
        IngredientService, 
        ToastrService, 
        AppConfiguration 
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

