import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  AlertController,
  IonicModule,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Group, Unit } from '../data/models';
import { UnitService } from '../services/unit.service';
import { ViewUnitPage } from '../view-unit/view-unit.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  units: Unit[] = []; // Array to store the list of units
  groups: Group[] = []; // Array to store the list of groups

  constructor(
    private navCtrl: NavController,
    private unitService: UnitService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.loadUnits();
  }

  async loadUnits() {
    await this.unitService.init();
    this.units = this.unitService.getUnits();
  }

  async viewUnit(unit: Unit) {
    const modal = await this.modalController.create({
      component: ViewUnitPage,
      componentProps: { unit },
    });

    await modal.present();
  }

  viewGroup(group: Group) {
    console.log('View group:', group);
    // Navigate to the group view page (not implemented yet)
  }

  createUnit() {
    console.log('Create unit');
    this.navCtrl.navigateForward('/unit-creation');
  }

  async removeUnit(unit: Unit) {
    const alert = await this.alertController.create({
      header: 'Remove Unit',
      message: 'Are you sure you want to remove this unit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            this.unitService.removeUnit(unit);
            this.units = this.unitService.getUnits();
          },
        },
      ],
    });

    await alert.present();
  }
}
