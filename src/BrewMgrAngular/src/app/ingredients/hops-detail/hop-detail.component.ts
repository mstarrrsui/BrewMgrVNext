import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { IngredientService } from '../service/ingredient.service';
import { Hop } from '../model/hop.model';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from '../../common/toastr.service';


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

  public readonly isNameValid = () => true;

  constructor(private fb: FormBuilder, 
              private toastr: ToastrService,  
              private router: Router, 
              private ingredientService: IngredientService, 
              private route: ActivatedRoute)  {

    this.createForm();
  }

  private createForm() {
    this.hopForm = this.fb.group({
      name: ['',[Validators.required,Validators.pattern('[a-zA-Z].*')]],
      description: ['',Validators.required],
      type: ['',Validators.required],
      countryOfOrigin: ['',Validators.required],
      useIn: ['',Validators.required],
      betaAcid: ['',Validators.required],
      alphaAcid: ['',Validators.required]
    })
  }


  public ngOnInit() {

    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.ingredientService.getHop(+params.get('id')))
    //   .subscribe((h: Hop) => this.setFormValues(h));

      this.setFormValues( this.route.snapshot.data['hop'] );

  }

  private setFormValues(h: Hop) {

    this.hop = h;
    this.hopForm.reset({
      name: this.hop.name,
      description: this.hop.description,
      type: this.hop.type,
      countryOfOrigin: this.hop.countryOfOrigin,
      useIn: this.hop.useIn,
      betaAcid: this.hop.betaAcid,
      alphaAcid: this.hop.alphaAcid
    })


  }

  public onFormSubmit() {

    console.log(this.hopForm.value);

    this.hop = this.prepareSaveHop()

    return this.ingredientService.saveHop(this.hop)
      .subscribe((hop: Hop) => {
          var msg = hop.name + " has been saved."
          const myrouter = this.router;
          console.log(msg);
          //this.error.info(msg);
          this.toastr.success(msg);
          // window.document.getElementById("MainView").scrollTop = 0;
          setTimeout(function () {
            myrouter.navigate(["/hops"]);
          }, 1500)
      },
      err => {
        let msg = `Unable to save hop: ${err.message}`;
        console.log(msg);
        
        // this.error.error(msg);
        this.toastr.error(msg);

        // if (err.response && err.response.status == 401) {
        //   this.user.isAuthenticated = false;
        //   this.router.navigate(["login"]);
        // }
      });
  }

  public onFormRevert() {
    this.setFormValues(this.hop)
  }

  public onFormCancel() {
    const myrouter = this.router;
    this.toastr.info("Cancelled");
    setTimeout(function () {
      myrouter.navigate(["/hops"]);
    }, 800)
  }


  private prepareSaveHop(): Hop {

    const formModel = this.hopForm.value;

    const saveHop: Hop = {
      id: this.hop.id,
      name: formModel.name as string,
      description: formModel.description as string,
      type: formModel.type as string,
      countryOfOrigin: formModel.countryOfOrigin as string,
      useIn: formModel.useIn as string,
      hsi: this.hop.hsi,
      betaAcid: formModel.betaAcid as string,
      alphaAcid: formModel.alphaAcid as string
    };
    return saveHop;  
  }

  
}