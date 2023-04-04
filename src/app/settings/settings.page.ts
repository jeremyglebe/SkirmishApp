import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnitService } from '../services/unit.service';
import { APP_DEPLOYMENT } from '../data/app_info';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage implements OnInit, OnDestroy {
  enhancedUnitCostRule: boolean = false;
  appDeployment: string = APP_DEPLOYMENT;

  constructor(public unitService: UnitService) {}

  async ngOnInit() {
    // Retrieve existing settings from the unit service
    this.enhancedUnitCostRule =
      await this.unitService.getEnhancedUnitCostRule();
    // Subscribe to changes in the unit service so we can update settings if needed
    this.unitService.changes.subscribe(async () => {
      this.enhancedUnitCostRule =
        await this.unitService.getEnhancedUnitCostRule();
    });
  }

  async ngOnDestroy() {
    // Unsubscribe from changes in the unit service
    this.unitService.changes.unsubscribe();
  }

  async onEnhancedUnitCostRuleToggleChange(event: Event) {
    const value = (<CustomEvent>event).detail.checked;
    await this.unitService.setEnhancedUnitCostRule(value);
  }

  async exportData() {
    const data = this.unitService.exportData();
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'warstuff-backup.json';
    link.click();
  }

  async importData() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    // fileInput.accept = '.json';
    // fileInput.accept = '*/*';
    fileInput.addEventListener('change', async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const jsonString = (e.target?.result as string) ?? '';
          const success = await this.unitService.importData(jsonString);
          if (success) {
            console.log('Data imported successfully');
          } else {
            console.error('Error importing data');
          }
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  }
}
