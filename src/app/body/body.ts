import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-body',
  imports: [MatButtonModule, MatCardModule, ],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body {

}
