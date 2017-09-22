import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Hop } from '../model/hop.model';

import 'rxjs/add/operator/toPromise';
import { AppConfiguration } from '../../common/appConfiguration';

const API_LOCATION: string = '';



@Injectable()
export class IngredientService {

    private _hopslist: Observable<Hop[]> = null;

    constructor(private http: Http, private config: AppConfiguration) { }

    public getHops(): Observable<Hop[]> {

        if (!this._hopslist) {
            this._hopslist = this.http.get(this.config.urls.url("hops"))
                //.do( (list) => console.log(list))
                .map((res: Response) => res.json() as Hop[])
                .publishReplay(1).refCount()
                .catch(this.handleError);
        }
        return this._hopslist;
    }

    public getHops2(onNext: (hopslist: Hop[]) => void): void {
        this.http.get(API_LOCATION + '/api/hops')
            .do( (list) => console.log(list))
            .map((res: Response) => res.json() as Hop[])
            .subscribe(onNext, this.handleError);
    }

    public getHop(id: number): Observable<Hop> {
        return this.getHops()
            .do( (list) => console.log(list))
            .map( hops => hops.find( (h) => h.id === id));
    }

    public saveHop(hop: Hop): Observable<Hop> {
        return this.http.post(this.config.urls.url("hop"),
                              hop,
                              new RequestOptions( {withCredentials:true}) )
    
           .map( response => {
              let hop = response.json();
    
              // explicitly invalidate the old list
              this._hopslist = null;
    
              return hop;
            })
          .catch( this.handleError );
      }
    
    // private handleError(error: any): Promise<any> {
    //     console.error("An error occurred", error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

}
