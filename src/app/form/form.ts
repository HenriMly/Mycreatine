import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewsletterDialogComponent } from './newsletter-dialog';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  template: `
    <form #userForm="ngForm" (ngSubmit)="submitForm(userForm.value, userForm)">
      <mat-form-field appearance="outline" class="email-field">
        <mat-label>Newsletter</mat-label>
        <input
          matInput
          ngModel
          #email="ngModel"
          name="email"
          required
          type="email"
          placeholder="mail@mail.mail"
          aria-label="Adresse email pour la newsletter"
        />
        <mat-icon matSuffix>mail</mat-icon>
        <mat-error *ngIf="email.hasError('required')">L'email est requis</mat-error>
        <mat-error *ngIf="email.hasError('email')">Email invalide</mat-error>
      </mat-form-field>
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="email.invalid"
        aria-label="S'inscrire à la newsletter"
      >
        S'inscrire
      </button>
    </form>
  `,
  styleUrl: './form.css',
})
export class Form {
  private dialog = inject(MatDialog);

  submitForm(value: any, form: any): void {
    if (form.valid) {
      console.log('Newsletter signup:', value);
      this.dialog.open(NewsletterDialogComponent, {
        width: '400px',
        maxWidth: '90vw',
        disableClose: false,
      });
      form.reset();
    }
  }
}
