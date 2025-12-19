import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-information',
  imports: [FormsModule],
  template: `
  

  <form #userForm="ngForm" (ngSubmit)=infoForm(userForm.value)>
    <input ngModel #test="ngModel" name="name" required type="text" placeholder='Your Name' />
    <input ngModel #test="ngModel" name="surname" required type="text" placeholder='Your Surname' />
    <input ngModel #test="ngModel" name="email" required type="email" placeholder='mail@mail.mail' />
    <input ngModel #test="ngModel" name="adresse" required type="text" placeholder='Your Adresse' />
    <input ngModel #test="ngModel" name="city" required type="text" placeholder='Your City' />
    <input ngModel #test="ngModel" name="zip" required type="text" placeholder='Your ZIP Code' />
    <input ngModel #test="ngModel" name="phone" required type="tel" placeholder='Your phone' />

    <button type='submit' [disabled]="test.invalid">Submit</button>
  </form>
  `,
  styleUrl: './information.css',
})
export class Information {
  infoForm(value: any) {
      console.log(value);
  }
}
