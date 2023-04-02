import {
  Component,
  Input,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpecialRule } from '../data/models';

@Component({
  selector: 'app-special-rule-modal',
  templateUrl: './special-rule-modal.component.html',
  styleUrls: ['./special-rule-modal.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpecialRuleModalComponent implements OnInit {
  @Input() specialRule!: SpecialRule;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  addSpecialRule() {
    this.modalController.dismiss(this.specialRule);
  }

  cancel() {
    this.modalController.dismiss();
  }
}
