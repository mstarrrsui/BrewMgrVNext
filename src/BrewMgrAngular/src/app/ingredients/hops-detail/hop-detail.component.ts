import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IngredientService } from '../service/ingredient.service';
import { Hop } from '../model/hop.model';
import { Observable } from 'rxjs/Rx';


@Component({
  templateUrl: './hop-detail.component.html',
  styles: [`
    .container { padding-left:20px; padding-right:20px; }
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class HopDetailComponent implements OnInit {

  public hop: Hop;

  public hopForm : FormGroup;
  public name : FormControl;
  public description : FormControl;
  public type : FormControl;
  public countryOfOrigin : FormControl;
  public useIn : FormControl;
  public betaAcidPct : FormControl;
  public alphaAcidPct : FormControl;


  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) {

  }

  public ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.ingredientService.getHop(+params.get('id')))
      .subscribe((h: Hop) => this.setFormValues(h));

  }

  private setFormValues(h: Hop) {

    this.name = new FormControl(h.name,Validators.required);
    this.description = new FormControl(h.description,Validators.required);
    this.type = new FormControl(h.type,Validators.required);
    this.countryOfOrigin = new FormControl(h.countryOfOrigin,Validators.required);
    this.useIn = new FormControl(h.useIn,Validators.required);
    this.betaAcidPct = new FormControl(h.betaAcid,Validators.required);
    this.alphaAcidPct = new FormControl(h.alphaAcid,Validators.required);

    this.hopForm = new FormGroup({
      name: this.name,
      description: this.description,
      type: this.type,
      countryOfOrigin: this.countryOfOrigin,
      useIn: this.useIn,
      betaAcidPct: this.betaAcidPct,
      alphaAcidPct: this.alphaAcidPct
    });
  }

  public onFormSubmit(formValues) {
    console.log(formValues);
  }
}