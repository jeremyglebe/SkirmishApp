import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Warband } from '../data/models';
import { UnitService } from '../services/unit.service';
import { Unit } from '../data/models';
import { ModalController } from '@ionic/angular';
import { ViewUnitPage } from '../view-unit/view-unit.page';

@Component({
  selector: 'app-warband-editor',
  templateUrl: 'warband-editor.page.html',
  styleUrls: ['warband-editor.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class WarbandEditorPage {
  warbandForm: FormGroup;
  warband: Warband;
  allUnits: Unit[] = [];
  units: Unit[];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public unitService: UnitService,
    private modalController: ModalController
  ) {
    this.allUnits = this.unitService.getUnits();
    const warbandParam = this.route.snapshot.queryParamMap.get('warband');
    this.warband = warbandParam ? JSON.parse(warbandParam) : null;
    this.warbandForm = this.fb.group({
      name: [this.warband ? this.warband.name : '', Validators.required],
      description: [
        this.warband ? this.warband.description : '',
        Validators.required,
      ],
    });
    this.units = this.warband ? this.warband.units : [];
  }

  toggleUnitSelection(unit: Unit) {
    // Check for the unit in this.units, if it's there, remove it, if it's not there, add it
    // Comparison can't be done by reference, so we need to compare the id
    const index = this.units.findIndex((u: Unit) => u.id === unit.id);
    if (index === -1) {
      this.units.push(unit);
    } else {
      this.units.splice(index, 1);
    }
  }

  async saveWarband() {
    const formData = {
      ...this.warbandForm.value,
      units: this.units, // Include units from the form
    };

    if (this.warband) {
      this.unitService.updateWarband({ ...this.warband, ...formData });
    } else {
      this.unitService.createWarband(formData);
    }
    this.navCtrl.navigateBack('/warbands-list');
  }

  async viewUnit(unit: Unit) {
    const modal = await this.modalController.create({
      component: ViewUnitPage,
      componentProps: { unit },
    });

    await modal.present();
  }

  isUnitInWarband(unit: Unit): boolean {
    return this.units.some((u: Unit) => u.id === unit.id);
  }
}
