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
        [observer]="observer"
        [hops]="containerhops | async">
      </hops-search>
    `
  })
  export class HopsSearchContainer {
  
    public observer: PartialObserver<string>;
    public containerhops: Observable<Hop[]>;
    private _subject: Subject<string>;
  
    constructor(private service: IngredientService) {
      this._subject = new Subject<string>();
      this.observer = this._subject;
      this.containerhops = this._subject
        .debounceTime(1000)
        .distinctUntilChanged()
        .switchMap(username => this.service.searchHops(username));
    }
  }