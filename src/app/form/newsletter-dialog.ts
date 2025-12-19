import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-newsletter-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-content">
      <div class="success-icon">
        <mat-icon>check_circle</mat-icon>
      </div>
      <h2>Merci !</h2>
      <p>Vous êtes maintenant inscrit à notre newsletter.</p>
      <div class="coupon-box">
        <p class="coupon-label">Votre code promo exclusif :</p>
        <p class="coupon-code">{{ coupon }}</p>
      </div>
      <p class="discount-text">Profitez de 10% de réduction sur votre prochain achat !</p>
      <button mat-raised-button color="primary" (click)="close()">Fermer</button>
    </div>
  `,
  styles: [
    `
      .dialog-content {
        text-align: center;
        padding: 20px;
      }
      .success-icon {
        font-size: 60px;
        color: #4caf50;
        margin: 16px 0;
      }
      .success-icon mat-icon {
        width: 60px;
        height: 60px;
        font-size: 60px;
      }
      h2 {
        margin: 16px 0 8px;
      }
      p {
        margin: 8px 0;
      }
      .coupon-box {
        border: 2px dashed #4caf50;
        border-radius: 8px;
        padding: 16px;
        margin: 20px 0;
      }
      .coupon-label {
        font-size: 12px;
        margin: 0;
      }
      .coupon-code {
        font-size: 24px;
        font-weight: bold;
        color: #4caf50;
        margin: 8px 0 0;
        letter-spacing: 2px;
      }
      .discount-text {
        font-size: 14px;
        color: #4caf50;
        font-weight: 500;
      }
      button {
        margin-top: 16px;
      }
    `,
  ],
})
export class NewsletterDialogComponent {
  coupon = 'crea10';
  private dialogRef = inject(MatDialogRef<NewsletterDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
