import { Component, ChangeDetectionStrategy } from "@angular/core";
import { PartialObserver } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs";
import { IngredientService } from "../service/ingredient.service";
import { Hop } from "../model/hop.model";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "hops-search-container",
    template: `
      <hops-search
        [observer]="containerobserver"
        [hops]="containerhops | async">
      </hops-search>
    `
  })
  export class HopsSearchContainer {
  
    public containerobserver: PartialObserver<string>;
    public containerhops: Observable<Hop[]>;
    private _subject: Subject<string>;
  
    constructor(private service: IngredientService) {
      this._subject = new Subject<string>();
      this.containerobserver = this._subject;
      this.containerhops = this._subject
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(username => this.service.searchHops(username));
    }
  }