import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [

  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  constructor(private router: Router){}

  @Input({required:true})
  modalId!:string;

  @Input({
    required:true
  })
  title!:string;

  @Input({required:true})
  body!:string;

  @Input()
  ctaName:string = "Submit";

  navigateToPayments() {
    this.router.navigate(['/payment'])
      .then(success => {
        if (!success) console.error('Navigation to /payment failed');
      });
  }

}
