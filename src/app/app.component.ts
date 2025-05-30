import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styles:[
    `
      .nav{
        width: 100%;
        margin-bottom: 50px;
        display: flex;
        justify-content: center;
      }

      .nav div{
        display: flex;
        justify-content: space-around;
        gap: 20px;
        padding: 30px;
        box-shadow: rgba(0, 0, 0, 0.13) 1px 3px 3px 3px;
      }

      .nav a {
        color: black;
        font-size: 30px;
        text-decoration: none;
        padding: 10px;
        width: 120px;
        text-align: center;
        border-radius: 20px;
        transition: ease-in-out 0.2s;
      }

      .active{
        background: #e8e8e8;
      }

      .color-palette {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 15px;
      }

      .color-option {
        width: 30px;
        height: 30px;
        margin: 4px;
        border-radius: 4px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border 0.2s ease-in-out;
      }

      .color-option.selected {
        border: 2px solid #000;
      }

      .qrEditing {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        box-shadow: rgba(0, 0, 0, 0.13) 1px 3px 3px 3px;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
      }

      .qr {
        display: flex;
        justify-content: center;
        gap: 30px;
        align-items: center;
        margin-top: 10px;
      }

      .checkbox {
        display: flex;
        justify-content: space-between;
        width: 80%;
        align-items: center;
      }

      input[type="checkbox"] {
        margin: 0;
        width: 22px;
        height: 22px;
      }

      ::file-selector-button {
        background: none;
        background: #6c7ff2;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
      }

      img{
        pointer-events: none;
      }

      .relative{
        position: absolute;
        bottom: 10px;
      }

      .snackbar-success {
        background-color: #4caf50;
        color: white;
      }

      .snackbar-error {
        background-color: #f44336;
        color: white;
      }

      .dropzone {
        border: 2px dashed #aaa;
        padding: 30px;
        text-align: center;
        border-radius: 12px;
        background-color: #f9f9f9;
        position: relative;
        cursor: pointer;
        transition: border-color 0.3s ease, background-color 0.3s ease;
      }

      .dropzone.dragover {
        background-color: #e0f7fa;
        border-color: #00796b;
      }

      .file-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .result {
        margin-top: 20px;
        font-size: 1.1rem;
        color: #333;
      }

      .result {
        margin-top: 20px;
      }

      .result {
        margin-top: 20px;
      }

      .copy-group {
        display: flex;
        margin-top: 8px;
        width: 100%;
        max-width: 500px;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
      }

      .copy-text {
        flex: 1;
        border: none;
        outline: none;
        user-select: none;
        padding: 8px 12px;
      }

      .container__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .copy-group button {
        padding: 8px 16px;
        background-color: #00796b;
        color: white;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        border-left: 1px solid #ccc;
      }

      .copy-group button:hover {
        background-color: #005f56;
      }

      .saved-message {
        margin-top: 8px;
        color: green;
        font-size: 0.95rem;
        opacity: 0;
        animation: fadeInOut 2s forwards;
      }

      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      button {
        padding: 8px 16px;
        background-color: #00796b;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #005f56;
      }

      .copy-group {
        display: flex;
        margin-top: 8px;
        width: 100%;
        max-width: 500px;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
      }

      .copy-text {
        flex: 1;
        padding: 8px 12px;
        border: none;
        outline: none;
        user-select: none;
      }

      .copy-group button {
        padding: 8px 16px;
        background-color: #00796b;
        color: white;
        border: none;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        border-left: 1px solid #ccc;
      }

      .copy-group button:hover {
        background-color: #005f56;
      }

      .saved-message {
        margin-top: 8px;
        color: green;
        font-size: 0.95rem;
      }

      a {
        color: inherit;
      }

      a:hover {
        color: #7f8ff4;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .uppercase {
        text-transform: uppercase;
      }

      .btn {
        display: inline-block;
        background: transparent;
        color: inherit;
        border: 0;
        outline: 0;
        padding: 0;
        transition: all 200ms ease-in;
        cursor: pointer;
      }

      .btn--primary {
        background: #7f8ff4;
        color: #fff;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
        border-radius: 2px;
        padding: 12px 36px;
      }

      .btn--primary:hover {
        background: #6c7ff2;
      }

      .btn--primary:active {
        background: #7f8ff4;
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
      }

      .btn--inside {
        margin-left: -96px;
      }

      label{
        margin-top: 10px;
        font-size: 20px;
      }

      /* You can add global styles to this file, and also import other style files */
      html, body {
        margin: 0;
        padding: 0;
        padding-bottom: 10px;
        font-family: Arial, sans-serif;
      }

      a {
        color: inherit;
      }

      a:hover {
        color: #7f8ff4;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .uppercase {
        text-transform: uppercase;
      }

      .btn {
        display: inline-block;
        background: transparent;
        color: inherit;
        font-size: 20px;
        border: 0;
        outline: 0;
        padding: 0;
        transition: all 200ms ease-in;
        cursor: pointer;
      }

      .btn--primary {
        background: #7f8ff4;
        color: #fff;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
        border-radius: 2px;
        padding: 12px 36px;
      }

      .btn--primary:hover {
        background: #6c7ff2;
      }

      .btn--primary:active {
        background: #7f8ff4;
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
      }

      .btn--inside {
        margin-left: -96px;
      }

      .form__field {
        width: 460px;
        background: #fff;
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .1);
        border: 0;
        outline: 0;
        padding: 22px 18px !important;
        font-size: 25px;
      }

      .qrCode {
        display: flex;
        justify-content: center;
        position: relative;
      }

      .qrCode img {
        margin-top: 20px;
        box-shadow: rgba(0, 0, 0, 0.13) 1px 3px 3px 3px;
        /*border-radius: 100px;*/
        width: 700px;
        height: 700px;
        object-fit: cover;
      }

      .image{
        position: relative;
      }

      .overlay {
        position: absolute;
        top: 0;
        margin-top: 20px;
        left: 50%;
        width: 700px;
        height: 700px;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transform: translateX(-50%);
        color: white;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
      }

      html, body { height: 100%; }
      body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

      .snackbar-success {
        background-color: #4caf50;
        color: #fff;
        text-align: center;
        font-weight: 500;
      }

      .snackbar-error {
        background-color: #f44336;
        color: #fff;
        text-align: center;
        font-weight: 500;
      }

      /* -------- Адаптивність --------- */

      @media (max-width: 900px) {

        .nav{
          width: 100%;
        }

        .nav div {
          width: 100%;
          padding: 15px;
        }

        .nav a {
          width: 100%;
          font-size: 22px;
          padding: 8px 0;
        }

        .color-palette {
          justify-content: center;
        }

        .qrEditing {
          padding: 15px;
          font-size: 18px;
        }

        .qr {
          flex-direction: column;
          gap: 15px;
        }

        input[type="checkbox"] {
          width: 18px;
          height: 18px;
        }

        .qrCode img {
          width: 90vw;
          height: auto;
          max-width: 400px;
          max-height: 400px;
        }

        .overlay {
          width: 90vw;
          height: auto;
          max-width: 400px;
          max-height: 400px;
          font-size: 24px;
        }

        .form__field {
          width: 90vw;
          max-width: 400px;
          font-size: 18px;
          padding: 15px 12px !important;
        }

        .copy-group {
          max-width: 90vw;
          flex-direction: column;
        }

        .copy-text {
          padding: 10px;
          font-size: 16px;
        }

        .copy-group button {
          border-left: none;
          border-top: 1px solid #ccc;
          width: 100%;
          padding: 10px 0;
          font-size: 16px;
        }

        .container__item {
          width: 90vw;
        }
      }

      @media (max-width: 1200px) and (min-width: 901px) {
        .nav{
          width: 100%;
        }

        .nav div {
          width: 70%;
        }

        .qrCode img {
          width: 500px;
          height: 500px;
        }

        .overlay {
          width: 500px;
          height: 500px;
          font-size: 32px;
        }

        .form__field {
          width: 80vw;
          max-width: 500px;
        }

        .copy-group {
          max-width: 80vw;
        }

        .copy-text {
          font-size: 18px;
        }

        .copy-group button {
          font-size: 18px;
        }
      }

    `
  ]
})
export class AppComponent {
  title = 'qrCodeFront';
}
