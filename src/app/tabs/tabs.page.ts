import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTabs, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs') tabs!: IonTabs;

  private readonly defaultTitle = 'Army Manager';
  title: string = this.defaultTitle;

  constructor() {}

  ngOnInit() {}

  onTabWillChange() {
    // Query for the page component of the current tab
    const currentPage = this.tabs.outlet.activatedView?.element;
    // Find the <ion-title> element in the current tab (if it exists)
    const titleElement = currentPage?.querySelector('ion-title');
    // If the title element exists, get it, otherwise use the default title
    this.title = titleElement?.textContent ?? this.defaultTitle;
  }
}
