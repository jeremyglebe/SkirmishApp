import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
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
import { QUALITY_COSTS } from '../data/core_rules';
import { SpecialRuleModalComponent } from '../special-rule-modal/special-rule-modal.component';

@Component({
  selector: 'app-unit-creation',
  templateUrl: 'unit-creation.page.html',
  styleUrls: ['unit-creation.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class UnitCreationPage {
  @ViewChild('fileInput') fileInput!: ElementRef;

  unitForm: FormGroup;
  qualityOptions: { value: number; cost: number }[] = [];
  specialRules: SpecialRule[] = SPECIAL_RULES;
  specialRulesSelected: SpecialRule[] = [];
  expandedRules: string[] = [];
  showRules: boolean = false;

  constructor(
    private navCtrl: NavController,
    private unitService: UnitService,
    private modalController: ModalController
  ) {
    // Create the quality options from the QUALITY_COSTS object
    for (let quality in QUALITY_COSTS) {
      this.qualityOptions.push({
        value: parseInt(quality),
        cost: QUALITY_COSTS[quality],
      });
    }
    // Create the form group
    this.unitForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quality: new FormControl('', Validators.required),
      specialRules: new FormControl([]),
      image: new FormControl(''),
    });
  }

  get totalCost(): number {
    let t = this.unitForm.value.quality.cost;
    for (let rule of this.specialRulesSelected) {
      t += rule.cost;
    }
    return t;
  }

  onSubmit() {
    console.log('Form submitted:', this.unitForm.value);
    const submission: any = this.unitForm.value;
    const newUnit: Unit = {
      id: Math.random().toString(36).substring(2, 9),
      name: submission.name,
      quality: submission.quality.value,
      specialRules: submission.specialRules,
      totalCost: this.totalCost,
      image: submission.image,
    };
    this.unitService.addUnit(newUnit);
    this.navCtrl.navigateBack('/');
  }

  toggleRuleExpansion(specialRule: SpecialRule) {
    if (this.expandedRules.includes(specialRule.name)) {
      this.expandedRules = this.expandedRules.filter(
        (rule) => rule !== specialRule.name
      );
    } else {
      this.expandedRules.push(specialRule.name);
    }
  }

  toggleShowRules() {
    this.showRules = !this.showRules;
  }

  toggleSpecialRule(rule: SpecialRule) {
    if (this.specialRulesSelected.includes(rule)) {
      this.removeSpecialRule(rule);
    } else {
      this.addSpecialRule(rule);
    }
  }

  addSpecialRule(rule: SpecialRule) {
    if (!this.specialRulesSelected.includes(rule)) {
      this.specialRulesSelected.push(rule);
      this.unitForm.controls['specialRules'].setValue(
        this.specialRulesSelected
      );
    }
  }

  removeSpecialRule(ruleToRemove: SpecialRule) {
    this.specialRulesSelected = this.specialRulesSelected.filter(
      (rule: SpecialRule) => rule !== ruleToRemove
    );
    this.unitForm.controls['specialRules'].setValue(this.specialRulesSelected);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      this.unitForm.controls['image'].setValue(base64Url);
    };
    reader.readAsDataURL(file);
  }
}
