import { Component, Input } from '@angular/core';
import { AAComponentComponent } from './a-a-component/a-a-component.component';

@Component({
  selector: 'app-a-component',
  imports: [AAComponentComponent],
  templateUrl: './a-component.component.html',
  styleUrl: './a-component.component.scss'
})
export class AComponentComponent {
  input: string='test text';

  receiveOutput(event: string) {
    console.log(event);
  }
}
