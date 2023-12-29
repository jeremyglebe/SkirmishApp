import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-create-unit-details',
  templateUrl: './create-unit-details.page.html',
  styleUrls: ['./create-unit-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreateUnitDetailsPage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('unitImage') unitImage!: ElementRef;

  constructor(private navCtrl: NavController, private units: UnitService) {}

  ngOnInit() {
    this.units.unitDraft = {
      id: this.units.generateID(),
      name: '',
      rank: 0,
      edges: [],
    };
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      this.units.unitDraft!.image = base64Url;
      this.unitImage.nativeElement.src = base64Url;
    };
    reader.readAsDataURL(file);
  }

  onNameChange(event: any) {
    this.units.unitDraft!.name = event.target.value;
  }

  onProceed() {
    this.units.addUnit(this.units.unitDraft!);
    this.units.unitDraft = null;
    this.navCtrl.navigateRoot('/', {
      animated: true,
      animationDirection: 'back',
    });
  }
}
