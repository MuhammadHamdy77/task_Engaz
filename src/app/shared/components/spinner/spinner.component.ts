import { Component } from '@angular/core';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(public BusyService:BusyService) { }
}
