import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PartialObserver } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IngredientService } from '../service/ingredient.service';
import { Hop } from '../model/hop.model';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'hops-search-container',
    template: `
      <hops-search
        [observer]="containersubject"
        [hops]="containerhops | async">
      </hops-search>
    `
  })
  export class HopsSearchContainer {

    public containerhops: Observable<Hop[]>;
    public containersubject: Subject<string>;

    constructor(private service: IngredientService) {
      this.containersubject = new Subject<string>();
      // this.containerobserver = this._subject;
      this.containerhops = this.containersubject
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(username => this.service.searchHops(username));
    }
  }
