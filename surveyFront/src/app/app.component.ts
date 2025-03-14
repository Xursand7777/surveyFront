import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NzButtonModule],
  standalone: true,
})
export class AppComponent {
  title = 'surveyFront';

  @Input() test: any;
}
