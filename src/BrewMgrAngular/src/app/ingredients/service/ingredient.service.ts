import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Hop } from '../model/hop.model';

import 'rxjs/add/operator/toPromise';

const API_LOCATION: string = '';



@Injectable()
export class IngredientService {

    private _hopslist: Observable<Hop[]> = null;

    constructor(private http: Http) { }

    public getHops(): Observable<Hop[]> {

        if (!this._hopslist) {
            this._hopslist = this.http.get('/api/hops')
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
    
    // private handleError(error: any): Promise<any> {
    //     console.error("An error occurred", error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

}
