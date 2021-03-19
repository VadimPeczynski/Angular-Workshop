import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-fist',
  templateUrl: './fist.component.html',
  styleUrls: ['./fist.component.scss'],
})
export class FistComponent implements OnChanges {
  fistWidth: number;
  @Input() rating: number;
  @Output()
  fistRatingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    this.fistWidth = (60 / 5) * this.rating;
  }

  onClick(): void {
    this.fistRatingClicked.emit(`Kliknięty rating to: ${this.rating}`);
  }
}
