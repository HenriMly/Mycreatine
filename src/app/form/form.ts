import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  template : `
  <form #userForm="ngForm" (ngSubmit)=submitForm(userForm.value)>
    <input ngModel name="email" placeholder='mail@mail.mail' />
    <button type='submit' [disabled]="userForm.invalid">Submit</button>
  </form>
  `,
  styleUrl: './form.css',
})
export class Form {
  submitForm(value: any) {
    console.log('Form submitted with value:', value);
  }
}
