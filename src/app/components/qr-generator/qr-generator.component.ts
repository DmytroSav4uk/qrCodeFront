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

  onSubmit() {

    let body = {
      url:this.urlValue
    }

    this.qrCodeService.generateCode(body).subscribe((res)=>{
      console.log('i worked')
      this.imageBase64 = res.base64Png
    })
  }
}
