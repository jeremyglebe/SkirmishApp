import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  AlertController,
  IonicModule,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Unit } from '../data/models';
import { UnitService } from '../services/unit.service';
import { UnitViewPage } from '../unit-view/unit-view.page';

@Component({
  selector: 'app-units-list',
  templateUrl: 'units-list.page.html',
  styleUrls: ['units-list.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class UnitsListPage implements OnInit, OnDestroy {
  units: Unit[] = []; // Array to store the list of units

  constructor(
    private navCtrl: NavController,
    public unitService: UnitService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.unitService.initialize();
    this.units = this.unitService.units;
    // Subscribe to changes in the unit service so we can update the list of units if needed
    this.unitService.changes.subscribe(() => {
      this.units = this.unitService.units;
    });
  }

  async ngOnDestroy() {
    // Unsubscribe from changes in the unit service
    this.unitService.changes.unsubscribe();
  }

  async viewUnit(unit: Unit) {
    const modal = await this.modalController.create({
      component: UnitViewPage,
      componentProps: { unit },
    });

    await modal.present();
  }

  createUnit() {
    this.navCtrl.navigateForward('/unit-editor');
    // this.navCtrl.navigateForward('/create-unit-details');
  }

  editUnit(unit: Unit) {
    this.navCtrl.navigateForward(`/unit-editor?unitId=${unit.id}`);
  }

  async removeUnit(unit: Unit) {
    const alert = await this.alertController.create({
      header: 'Delete Unit',
      message: 'Are you sure you want to delete this unit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            // Ask the user if they would like to just delete the unit, or purge it from all warbands
            const purgeAlert = await this.alertController.create({
              header: 'Purge Unit',
              message: 'Would you like to remove this unit from all warbands?',
              buttons: [
                {
                  text: 'No',
                  handler: async () => {
                    await this.unitService.deleteUnit(unit);
                    this.units = this.unitService.units;
                  },
                },
                {
                  text: 'Yes, purge from all my warbands',
                  handler: async () => {
                    await this.unitService.purgeUnit(unit);
                    this.units = this.unitService.units;
                  },
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                },
              ],
            });
            await purgeAlert.present();
          },
        },
      ],
    });
    await alert.present();
  }
}
