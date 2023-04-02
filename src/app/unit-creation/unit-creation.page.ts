import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SpecialRule, Unit } from '../data/models';
import { SPECIAL_RULES } from '../data/special_rules';
import { CommonModule } from '@angular/common';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-unit-creation',
  templateUrl: 'unit-creation.page.html',
  styleUrls: ['unit-creation.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class UnitCreationPage {
  unitForm: FormGroup;
  qualityOptions: { value: number; cost: number }[] = [
    { value: 6, cost: 5 },
    { value: 5, cost: 10 },
    { value: 4, cost: 20 },
    { value: 3, cost: 35 },
    { value: 2, cost: 55 },
  ];
  specialRules: SpecialRule[] = SPECIAL_RULES;
  cost: number = 0;

  constructor(
    private navCtrl: NavController,
    private unitService: UnitService
  ) {
    this.unitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quality: new FormControl('', Validators.required),
      specialRules: new FormControl([]),
      image: new FormControl(''),
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.unitForm.value);
    const submission: any = this.unitForm.value;
    const newUnit: Unit = {
      id: Math.random().toString(36).substring(2, 9),
      name: submission.name,
      quality: submission.quality.value,
      specialRules: submission.specialRules,
      totalCost: submission.quality.cost,
      image: submission.image,
    };
    this.unitService.addUnit(newUnit);
    this.navCtrl.navigateBack('/');
  }
}
