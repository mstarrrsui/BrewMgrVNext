import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IngredientService } from '../service/ingredient.service';
import { Hop } from '../model/hop.model';
import { Observable } from 'rxjs/Rx';


@Component({
  templateUrl: './hop-detail.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
  `]
})
export class HopDetailComponent implements OnInit {

  public hop: Hop;

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) {

  }

  public ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.ingredientService.getHop(+params.get('id')))
      .subscribe((h: Hop) => this.hop = h);

  }

}