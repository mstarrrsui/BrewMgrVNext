import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IngredientService } from "../service/ingredient.service";
import { Observable } from "rxjs/Observable";
import { Hop } from "../model/hop.model";

@Injectable()
export class HopResolver implements Resolve<Hop> {
    constructor(private ingredientService: IngredientService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hop> {
        let id = +route.paramMap.get('id');
        return this.ingredientService.getHop(id);
    }
}