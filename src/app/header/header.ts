import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['header.scss'],
  imports: [

  ]
})
export class Header {
  @Input({
    required:true,
  })
  brandName!:string;
  saleEligible: boolean = false;


  get logoPath() {
    return "/logo.png";
  }

  avatarPath(name:string):string {
    return "/" + name + ".png";
  }

  setSaleEligible():void {
    this.saleEligible = true;
  }

}
