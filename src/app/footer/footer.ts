import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  @Input({
    required: true,
  })
  logoPath!:string;

  @Input()
  brandName:string = "My Brand";

  currentYear(): number {
    return new Date().getFullYear();
  }

}
