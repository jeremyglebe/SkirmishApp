import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  constructor(private _: DataService, private navCtrl: NavController) {}

  ngOnInit() {}

  onClickManageMyArmies() {
    this.navCtrl.navigateForward('tabs');
  }

  onClickSettings() {
    this.navCtrl.navigateForward('settings');
  }
}
