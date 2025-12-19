import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  template : `
  <form #userForm="ngForm" (ngSubmit)=submitForm(userForm.value)>
    <input ngModel #test="ngModel" name="email" required type="email" placeholder='mail@mail.mail' />
    <button type='submit' [disabled]="test.invalid">Submit</button>
  </form>
  `,
  styleUrl: './form.css',
})
export class Form {
  submitForm(value: any) {
      console.log(value);
  }
}
