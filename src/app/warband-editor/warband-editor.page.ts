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
import { UnitViewPage } from '../unit-view/unit-view.page';

@Component({
  selector: 'app-warband-editor',
  templateUrl: 'warband-editor.page.html',
  styleUrls: ['warband-editor.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
})
export class WarbandEditorPage {
  paramID: string | null;
  warband: Warband;
  warbandForm: FormGroup;
  // The unit list is the list of all units currently saved and managed by the unit service
  unitList: Unit[] = [];
  // Unique units are units which were loaded in as part of a warband being edited
  // They do not exist in the saved unit list, so we need to keep track of them separately
  uniqueUnits: Unit[] = [];
  // The units and unit counts is the list of currently selected units for this warband
  units: { unit: Unit; count: number }[];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public unitService: UnitService,
    private modalController: ModalController
  ) {
    this.unitList = this.unitService.units;
    this.paramID = this.route.snapshot.queryParamMap.get('warbandId');
    const newWarband = {
      id: '',
      name: '',
      description: '',
      units: [],
    };
    if (this.paramID) {
      const result = this.unitService.getWarbandById(this.paramID);
      this.warband = result ? result : newWarband;
    } else {
      this.warband = newWarband;
    }
    this.warbandForm = this.fb.group({
      name: [this.warband.name, Validators.required],
      description: [this.warband.description],
    });
    this.units = this.warband.units;
    // Searching through the units in the warband, if any are not in the unit list,
    // then they are unique to this warband
    this.warband.units.forEach((u) => {
      if (!this.unitList.some((unit) => unit.id === u.unit.id)) {
        this.uniqueUnits.push(u.unit);
      }
    });
  }

  toggleUnitSelection(unit: Unit) {
    const index = this.units.findIndex((u) => u.unit.id === unit.id);
    // If the unit is not currently in the warband, add it
    if (index === -1) {
      this.units.push({ unit, count: 1 });
    }
    // If the unit is currently in the warband, remove it
    else {
      this.units.splice(index, 1);
    }
  }

  async saveWarband() {
    const formData = {
      ...this.warbandForm.value,
      units: this.units, // Use the units array directly
    };

    if (this.paramID) {
      this.unitService.updateWarband({ ...this.warband, ...formData });
    } else {
      this.unitService.createWarband(formData);
    }
    this.navCtrl.navigateBack('/tabs/warbands');
  }

  async viewUnit(unit: Unit) {
    const modal = await this.modalController.create({
      component: UnitViewPage,
      componentProps: { unit },
    });

    await modal.present();
  }

  isUnitInWarband(unit: Unit): boolean {
    return this.units.some((u) => u.unit.id === unit.id);
  }

  getUnitCount(unit: Unit): number {
    const unitIndex = this.units.findIndex((u) => u.unit.id === unit.id);
    return unitIndex !== -1 ? this.units[unitIndex].count : 0;
  }

  onUnitCountClick(ev: Event) {
    (ev.target as HTMLInputElement).value = '';
  }

  onUnitCountInput(unitId: string, ev: Event) {
    const newCount = (ev.target as HTMLInputElement).valueAsNumber;
    console.log(newCount);
    if (!isNaN(newCount)) {
      const unitIndex = this.units.findIndex((u) => u.unit.id === unitId);
      if (unitIndex !== -1) {
        this.units[unitIndex].count = newCount;
      }
    }
  }
}
