import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Warband } from '../data/models';
import { UnitService } from '../services/unit.service';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warbands-list',
  templateUrl: 'warbands-list.page.html',
  styleUrls: ['warbands-list.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class WarbandsListPage implements OnInit {
  warbands: Warband[] = [];

  constructor(
    private navCtrl: NavController,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    this.warbands = this.unitService.getWarbands();
  }

  viewWarbandDetails(warband: Warband) {
    // Navigate to the Warband Details page (you'll create this page later)
    this.navCtrl.navigateForward(`/warband-details/${warband.id}`);
  }

  createNewWarband() {
    // Navigate to the Warband Creation page (you'll create this page later)
    this.navCtrl.navigateForward('/warband-creation');
  }

}
