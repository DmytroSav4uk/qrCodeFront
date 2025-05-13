import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QrcodeService } from '../../services/qrcode.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgStyle
  ],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {

  qrForm: FormGroup;
  urlValue: string = '';
  imageBase64: string | null = null;
  logoBase64: string | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  borderWidth: number = 5;  // За замовчуванням ширина бордера 5px


  border: string = `5px solid #000000`;


  foregroundColor = '#000000';
  backgroundColor = '#ffffff';
  bubbleStyle = false;
  transparentBackground = false;



  borderRadius: number = 30;

  colorOptions: string[] = [
    '#000000',
    '#700909',
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ae',
    '#ff00ff',
    '#808080',
    '#ffa500'
  ];

  constructor(
    private qrCodeService: QrcodeService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.qrForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
      foregroundColor: ['#000000'],
      backgroundColor: ['#ffffff'],
      bubbleStyle: [false],
      transparentBackground: [false]
    });
  }

  showToast(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? 'snackbar-error' : 'snackbar-success'
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    this.clearMessages();

    if (!this.urlValue) {
      this.showToast('Please enter a valid URL.', true);
      return;
    }

    this.loading = true;

    const body = { url: this.urlValue };

    this.qrCodeService.generateCode(body).subscribe({
      next: (res) => {
        this.imageBase64 = res.base64Png;
        this.showToast('QR code generated successfully.');
        console.info('QR code generated successfully.');
      },
      error: (err) => {
        this.showToast('Failed to generate QR code.', true);
        console.error('QR code generation failed:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onRegenerate() {
    // Очищаємо повідомлення
    this.clearMessages();

    if (!this.urlValue) {
      this.errorMessage = 'A valid URL is required to regenerate the QR code.';
      this.showToast(this.errorMessage, true);
      return;
    }

    // Оновлюємо бордер на основі введеної ширини
    this.border = `${this.borderWidth}px solid #000000`;  // Застосовуємо чорний колір бордера

    const body = {
      url: this.urlValue,
      foregroundColor: this.foregroundColor,
      backgroundColor: this.backgroundColor,
      bubble: this.bubbleStyle,
      logoBase64: this.logoBase64,
      transparentBackground: this.transparentBackground
    };

    this.loading = true;

    this.qrCodeService.generateCode(body).subscribe({
      next: (res) => {
        this.imageBase64 = res.base64Png;
        this.successMessage = 'QR code regenerated successfully.';
        this.showToast(this.successMessage);
        console.info('QR code regenerated successfully.');
      },
      error: (err) => {
        this.errorMessage = 'QR code regeneration failed.';
        this.showToast(this.errorMessage, true);
        console.error('QR code regeneration failed:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.logoBase64 = (reader.result as string).split(',')[1];
        this.showToast('Logo uploaded successfully.');
        console.info('Logo image uploaded and converted to base64.');
      };

      reader.readAsDataURL(file);
    }
  }

  downloadImage() {
    if (!this.imageBase64) {
      this.showToast('There is no image available for download.', true);
      console.warn('Download attempted without an available QR code image.');
      return;
    }

    const image = new Image();
    image.src = 'data:image/png;base64,' + this.imageBase64;

    image.onload = () => {
      const canvas = this.renderFinalCanvas();

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr-code-custom.png';
      link.click();

      this.showToast('QR code downloaded.');
      console.info('QR code image downloaded.');
    };
  }


  renderFinalCanvas(): HTMLCanvasElement {
    const image = new Image();
    image.src = 'data:image/png;base64,' + this.imageBase64;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const size = Math.max(image.width, image.height) + this.borderWidth * 2;
    canvas.width = size;
    canvas.height = size;

    // Малюємо бордер
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    this.roundRect(ctx, 0, 0, size, size, this.borderRadius);
    ctx.fill();

    // Вирізаємо внутрішню частину
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    this.roundRect(ctx, this.borderWidth, this.borderWidth, image.width, image.height, this.borderRadius);
    ctx.fill();
    ctx.restore();

    // Малюємо QR-код
    ctx.save();
    ctx.beginPath();
    this.roundRect(ctx, this.borderWidth, this.borderWidth, image.width, image.height, this.borderRadius);
    ctx.clip();
    ctx.drawImage(image, this.borderWidth, this.borderWidth, image.width, image.height);
    ctx.restore();

    return canvas;
  }


  roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
