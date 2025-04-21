import {Component, HostListener} from '@angular/core';
import {QrcodeService} from '../../services/qrcode.service';

@Component({
  selector: 'app-qr-reader',
  imports: [],
  templateUrl: './qr-reader.component.html',
  styleUrl: './qr-reader.component.css'
})
export class QrReaderComponent {


  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    const inputElement = document.querySelector('.copy-text') as HTMLInputElement;


    if (inputElement && inputElement === document.activeElement) {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          this.selectedFile = file;
          this.generatePreview(file);
          this.uploadImage();
        }
      }
    }
  }




  constructor(private qrCodeService:QrcodeService) {
  }

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.generatePreview(this.selectedFile);
      setTimeout(()=>{
        this.uploadImage()
      },300)
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    (event.currentTarget as HTMLElement).classList.remove('dragover');

    if (event.dataTransfer?.files?.length) {
      this.selectedFile = event.dataTransfer.files[0];
      this.generatePreview(this.selectedFile);
      this.uploadImage();
    }
  }

  qrCodeText:string = '';

  uploadImage(){

    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);


    this.qrCodeService.readCode(formData).subscribe((res)=>{
      this.qrCodeText = res.text
    })
  }

  copied: boolean = false;

  copyToClipboard(): void {
    if (!this.qrCodeText) return;

    navigator.clipboard.writeText(this.qrCodeText).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    });
  }


  generatePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



}
