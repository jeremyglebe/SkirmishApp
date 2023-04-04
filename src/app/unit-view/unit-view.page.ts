import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Unit } from '../data/models';
import { UnitService } from '../services/unit.service';
import { QUALITY_COSTS } from '../data/core_rules';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.page.html',
  styleUrls: ['./unit-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UnitViewPage implements OnInit {
  @Input() unit!: Unit;

  constructor(
    private modalController: ModalController,
    public unitService: UnitService
  ) {}

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss();
  }

}
