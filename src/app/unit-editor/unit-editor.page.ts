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
import { Edge, Unit } from '../data/models';
import { EDGES_LIST } from '../data/edges';
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
  edges: Edge[] = EDGES_LIST;
  edgesSelected: Edge[] = [];
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
      edges: new FormControl([]),
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
          edges: ogUnit.edges,
          image: ogUnit.image,
        });
        this.edgesSelected = ogUnit.edges;
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
      edges: submission.edges,
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

  toggleEdgeExpansion(edge: Edge) {
    if (this.expandedRules.includes(edge.name)) {
      this.expandedRules = this.expandedRules.filter(
        (rule) => rule !== edge.name
      );
    } else {
      this.expandedRules.push(edge.name);
    }
  }

  toggleShowRules() {
    this.showRules = !this.showRules;
  }

  toggleEdge(rule: Edge) {
    if (this.ruleIsSelected(rule)) {
      this.removeEdge(rule);
    } else {
      this.addEdge(rule);
    }
  }

  addEdge(edge: Edge) {
    // Check whether the selected edges have an edge with the same name
    const existingRule = this.edgesSelected.find(
      (selectedEdge) => selectedEdge.name === edge.name
    );
    if (!existingRule) {
      this.edgesSelected.push(edge);
      this.unitForm.controls['edges'].setValue(
        this.edgesSelected
      );
    } else {
      this.removeEdge(existingRule);
      this.addEdge(edge);
    }
  }

  removeEdge(ruleToRemove: Edge) {
    this.edgesSelected = this.edgesSelected.filter(
      (rule: Edge) => rule.name !== ruleToRemove.name
    );
    this.unitForm.controls['edges'].setValue(this.edgesSelected);
  }

  ruleIsSelected(rule: Edge) {
    // Check by name rather than actual object equality because the rule may have come from an import
    return this.edgesSelected.some(
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
