import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormsModule,
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
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
})
export class WarbandEditorPage {
  warbandForm: FormGroup;
  warband: Warband | null;
  allUnits: Unit[] = [];
  units: { unit: Unit; count: number }[];
  unitCounts: { [key: string]: number } = {};

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public unitService: UnitService,
    private modalController: ModalController
  ) {
    this.allUnits = this.unitService.getUnits();
    const warbandId = this.route.snapshot.queryParamMap.get('warbandId');
    if (warbandId) {
      this.warband = this.unitService.getWarbandById(warbandId);
    } else {
      this.warband = null;
    }
    this.warbandForm = this.fb.group({
      name: [this.warband ? this.warband.name : '', Validators.required],
      description: [
        this.warband ? this.warband.description : '',
        Validators.required,
      ],
    });
    this.units = this.warband ? this.warband.units : [];
    this.allUnits.forEach((unit) => {
      this.unitCounts[unit.id] = 1;
    });
  }

  toggleUnitSelection(unit: Unit) {
    const index = this.units.findIndex((u) => u.unit.id === unit.id);
    if (index === -1) {
      this.units.push({ unit, count: 1 });
    } else {
      this.units.splice(index, 1);
    }
  }
  
  async saveWarband() {
    const updatedUnits = this.units.map((unitCountObj) => {
      return {
        unit: unitCountObj.unit,
        count: this.unitCounts[unitCountObj.unit.id] || 1,
      };
    });
  
    const formData = {
      ...this.warbandForm.value,
      units: updatedUnits, // Include updated units from the form
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
    return this.units.some((u) => u.unit.id === unit.id);
  }
  
}
