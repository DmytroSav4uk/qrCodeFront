import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styles: [`
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

  `]
})
export class NavigationComponent {

}
