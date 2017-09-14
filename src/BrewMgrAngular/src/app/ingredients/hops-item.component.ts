import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hop } from './model/hop.model';

@Component({
    selector: 'hops-item',
    templateUrl: './hops-item.component.html',
    styleUrls: ['./hops-item.component.css']
})
export class HopsItemComponent {
    @Input() public hop: Hop;
    @Output() public itemClick = new EventEmitter();

    public handleClickMe() {
        console.log('clicked item!');
        this.itemClick.emit(this.hop);
    }
}
