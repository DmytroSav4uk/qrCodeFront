import { Routes } from '@angular/router';
import {QrGeneratorComponent} from './components/qr-generator/qr-generator.component';
import {QrReaderComponent} from './components/qr-reader/qr-reader.component';

export const routes: Routes = [
  {path:'generator', component:QrGeneratorComponent},
  {path:'reader', component:QrReaderComponent}
];
