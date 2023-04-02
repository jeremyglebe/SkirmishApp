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
    public unitService: UnitService
  ) {}

  async ngOnInit() {
    await this.unitService.initialize();
    this.loadWarbands();
  }

  async ionViewWillEnter() {
    this.loadWarbands();
  }

  loadWarbands() {
    this.warbands = this.unitService.getWarbands();
  }

  viewWarbandDetails(warband: Warband) {
    // Navigate to the Warband Details page (you'll create this page later)
    this.navCtrl.navigateForward(`/warband-view`, {
      queryParams: { id: warband.id },
    });
  }

  createNewWarband() {
    // Navigate to the Warband Editor page for creating a new Warband
    this.navCtrl.navigateForward('/warband-editor');
  }

  editWarband(warband: Warband) {
    this.navCtrl.navigateForward('/warband-editor', {
      queryParams: { warband: JSON.stringify(warband) },
    });
  }

  removeWarband(warband: Warband) {
    this.unitService.removeWarband(warband);
    this.loadWarbands();
  }
}
