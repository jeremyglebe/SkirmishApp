import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { Unit, Warband } from '../data/models';
import { UnitService } from '../services/unit.service';
import { UnitViewPage } from '../unit-view/unit-view.page';

@Component({
  selector: 'app-warband-view',
  templateUrl: './warband-view.page.html',
  styleUrls: ['./warband-view.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule],
})
export class WarbandViewPage implements OnInit {
  warband: Warband;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public unitService: UnitService,
    private modalController: ModalController
  ) {
    this.warband = {
      id: '',
      name: '',
      description: '',
      units: [],
    };
  }

  async ngOnInit() {
    const warbandId = this.route.snapshot.queryParamMap.get('id');
    if (warbandId) {
      const warband = await this.unitService.getWarbandById(warbandId);
      if (warband) {
        this.warband = warband;
      }
    }
  }

  unitRulesString(unit: Unit): string {
    const rules = [];
    for(let rule of unit.edges) {
      rules.push(rule.name);
    }
    return rules.join(', ');
  }

  
  async viewUnit(unit: Unit) {
    const modal = await this.modalController.create({
      component: UnitViewPage,
      componentProps: { unit },
    });

    await modal.present();
  }

}
