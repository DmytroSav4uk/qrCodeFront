import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {QrcodeService} from '../../services/qrcode.service';

@Component({
  selector: 'app-qr-generator',
  imports: [
    FormsModule
  ],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {

  constructor(private qrCodeService:QrcodeService) {
  }

  urlValue: string = '';
  imageBase64: any

  foregroundColor = '#000000';
  backgroundColor = '#ffffff';
  bubbleStyle = false;
  logoBase64: string | null = null;
  transparentBackground = false;

  colorOptions: string[] = [
    '#000000', '#700909', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ae', '#ff00ff', '#808080', '#ffa500'
  ];


  onSubmit() {
    let body = {
      url:this.urlValue
    }
    this.qrCodeService.generateCode(body).subscribe((res)=>{
      this.imageBase64 = res.base64Png
    })
  }

  onLogoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoBase64 = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  onRegenerate() {
    const body = {
      url: this.urlValue,
      foregroundColor: this.foregroundColor,
      backgroundColor: this.backgroundColor,
      bubble: this.bubbleStyle,
      logoBase64: this.logoBase64,
      transparentBackground: this.transparentBackground
    };


    this.qrCodeService.generateCode(body).subscribe(res => {
      this.imageBase64 = res.base64Png;
    });
  }


  downloadImage() {
    const link = document.createElement('a');
    link.href = 'data:image/png;base64,' + this.imageBase64;
    link.download = 'qr-code.png';
    link.click();
  }


}
