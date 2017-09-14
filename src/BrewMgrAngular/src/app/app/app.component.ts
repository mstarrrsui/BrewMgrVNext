import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit() {
    //var clicks = Observable.fromEvent(document, 'click');
    // Each click event is mapped to an Observable that ticks every second
    //var higherOrder = clicks.map((ev) => Observable.interval(1000));
    //var switched = higherOrder.switch();
    // The outcome is that `switched` is essentially a timer that restarts
    // on every click. The interval Observables from older clicks do not merge
    // with the current interval Observable.
    //switched.subscribe(x => console.log(x));    
  } 
}
