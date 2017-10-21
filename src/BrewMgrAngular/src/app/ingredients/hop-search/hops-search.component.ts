import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Hop } from '../model/hop.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { PartialObserver } from 'rxjs/Observer';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'hops-search',
    templateUrl: './hops-search.component.html'
})
export class HopsSearchComponent implements OnDestroy, OnInit {

  @Input() public observer: PartialObserver<string>;
  @Input() public hops: Hop[];

  public form: FormGroup;
  private _subscription: Subscription;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({ name: [] });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._subscription = this.form.valueChanges
      .do( (values) => console.log(values))
      .map(values => values.name) // flatten down to the entered string
      .subscribe(this.observer);
  }
}