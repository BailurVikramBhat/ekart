import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {

  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }

}
