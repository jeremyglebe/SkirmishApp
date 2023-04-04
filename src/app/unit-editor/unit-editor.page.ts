import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
import { QUALITY_COSTS } from '../data/core_rules';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unit-editor',
  templateUrl: 'unit-editor.page.html',
  styleUrls: ['unit-editor.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class UnitEditorPage {
  @ViewChild('fileInput') fileInput!: ElementRef;

  paramID: string | null = null;
  unitForm: FormGroup;
  qualityOptions: { value: number; cost: number }[] = [];
  specialRules: SpecialRule[] = SPECIAL_RULES;
  specialRulesSelected: SpecialRule[] = [];
  expandedRules: string[] = [];
  showRules: boolean = false;
  editing: boolean = false;

  constructor(
    private navCtrl: NavController,
    private unitService: UnitService,
    private route: ActivatedRoute
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

  async ngOnInit() {
    this.paramID = this.route.snapshot.queryParamMap.get('unitId');
    if (this.paramID) {
      this.editing = true;
      const ogUnit = this.unitService.getUnitById(this.paramID);
      if (ogUnit) {
        this.unitForm.patchValue({
          name: ogUnit.name,
          quality: this.qualityOptions.find(
            (option) => option.value === ogUnit!.quality
          ),
          specialRules: ogUnit.specialRules,
          image: ogUnit.image,
        });
        this.specialRulesSelected = ogUnit.specialRules;
      }
    }
  }

  get unit(): Unit {
    const submission: any = this.unitForm.value;
    const newUnit: Unit = {
      id: this.editing
        ? this.paramID!
        : Math.random().toString(36).substring(2, 9),
      name: submission.name,
      quality: submission.quality.value,
      specialRules: submission.specialRules,
      image: submission.image,
    };
    return newUnit;
  }

  get totalCost(): number {
    return this.unitService.calcUnitCost(this.unit);
  }

  onSubmit() {
    if (this.editing) {
      this.unitService.updateUnit(this.unit);
    } else {
      this.unitService.addUnit(this.unit);
    }
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
    if (this.ruleIsSelected(rule)) {
      this.removeSpecialRule(rule);
    } else {
      this.addSpecialRule(rule);
    }
  }

  addSpecialRule(rule: SpecialRule) {
    // Check whether the selected special rules have a rule with the same name
    const existingRule = this.specialRulesSelected.find(
      (selectedRule) => selectedRule.name === rule.name
    );
    if (!existingRule) {
      this.specialRulesSelected.push(rule);
      this.unitForm.controls['specialRules'].setValue(
        this.specialRulesSelected
      );
    } else {
      this.removeSpecialRule(existingRule);
      this.addSpecialRule(rule);
    }
  }

  removeSpecialRule(ruleToRemove: SpecialRule) {
    this.specialRulesSelected = this.specialRulesSelected.filter(
      (rule: SpecialRule) => rule.name !== ruleToRemove.name
    );
    this.unitForm.controls['specialRules'].setValue(this.specialRulesSelected);
  }

  ruleIsSelected(rule: SpecialRule) {
    // Check by name rather than actual object equality because the rule may have come from an import
    return this.specialRulesSelected.some(
      (selectedRule) => selectedRule.name === rule.name
    );
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
