import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Unit } from '../data/models';
import { UnitService } from '../services/unit.service';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.page.html',
  styleUrls: ['./unit-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UnitViewPage implements OnInit {
  @Input() unit!: Unit;
  private backButton: Subscription | null = null;

  constructor(
    private modalController: ModalController,
    public unitService: UnitService
  ) {}

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backButton = event.subscribe(async () => {
      await this.dismissModal();
    });
  }

  ngOnDestroy() {
    this.backButton?.unsubscribe();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
