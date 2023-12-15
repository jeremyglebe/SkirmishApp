import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-unit-details',
  templateUrl: './create-unit-details.page.html',
  styleUrls: ['./create-unit-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateUnitDetailsPage implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
