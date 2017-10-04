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
import { HopsListComponent } from './ingredients/hops-list.component';
import { HopsItemComponent } from './ingredients/hops-item.component';
import { HomeComponent } from './home/home.component';
import { IngredientService } from './ingredients/service/ingredient.service';
import { Error404Component } from './errors/404.component';
import { HopDetailComponent } from './ingredients/hops-detail/hop-detail.component';
import { ROUTES } from './routes'
import { ToastrService } from './common/toastr.service';
import { AppConfiguration } from './common/appConfiguration';
import { HopResolver } from './ingredients/hops-detail/hop-detail.resolver';
import { HopsSearchComponent } from './ingredients/hop-search/hops-search.component';
import { HopsSearchContainer } from './ingredients/hop-search/hops-search.container';

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

