import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Form } from "../form/form";


@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, Form],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();


}
 