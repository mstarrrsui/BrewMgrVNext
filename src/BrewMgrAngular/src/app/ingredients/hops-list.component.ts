import { Component, OnInit } from '@angular/core';
import { Hop } from './model/hop.model';
import { IngredientService } from './service/ingredient.service';
import { Observable } from "rxjs/Observable";
// import { ToastrService } from "../common/toastr.service";

@Component({
    selector: 'hops-list',
    templateUrl: './hops-list.component.html'
})
export class HopsListComponent implements OnInit {

    //public hopdata: Hop[];
    public hopdata: Observable<Hop[]>;

    constructor(private ingredientService: IngredientService) { }

    public ngOnInit() {
        this.hopdata = this.ingredientService.getHops();
        //this.ingredientService.getHops().subscribe( data => this.hopdata = data);
        //this.ingredientService.getHops2( (data) => this.hopdata = data);
        //console.log(this.hopdata);
    }

    public handleItemClicked(item: Hop) {
        console.log('received:', item.name);
        // this.toastr.success(item.name);
    }
}
