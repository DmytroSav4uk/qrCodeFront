import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QrcodeService } from '../../services/qrcode.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
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

  foregroundColor = '#000000';
  backgroundColor = '#ffffff';
  bubbleStyle = false;
  transparentBackground = false;

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
    this.clearMessages();

    if (!this.urlValue) {
      this.errorMessage = 'A valid URL is required to regenerate the QR code.';
      this.showToast(this.errorMessage, true);
      return;
    }

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

    const link = document.createElement('a');
    link.href = 'data:image/png;base64,' + this.imageBase64;
    link.download = 'qr-code.png';
    link.click();

    this.successMessage = 'QR code image downloaded successfully.';
    this.showToast(this.successMessage);
    console.info('QR code image downloaded.');
  }
}
