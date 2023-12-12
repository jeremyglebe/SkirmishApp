import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { UnitService } from '../services/unit.service';
import { APP_DEPLOYMENT } from '../data/app_info';
import { PeerService } from '../services/peer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SettingsPage implements OnInit, OnDestroy {
  enhancedUnitCostRule: boolean = false;
  peerConnectionsEnabled: boolean = false;
  peerConnectionEstablished: boolean = false;
  appDeployment: string = APP_DEPLOYMENT;
  showEnhancedUnitCostDescription: boolean = false;
  peerId: string = '';

  constructor(
    public unitService: UnitService,
    private alertController: AlertController,
    private p2p: PeerService
  ) {}

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

  async onPeerConnectionsToggleChange(event: Event) {
    const value = (<CustomEvent>event).detail.checked;
    if (value) {
      const alert = await this.alertController.create({
        header: 'Peer Connections',
        message:
          'Peer connections are experimental and may not work as expected. ' +
          'Use at your own risk.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.peerConnectionsEnabled = false;
              this.peerConnectionEstablished = false;
            },
          },
          {
            text: 'Enable',
            handler: () => {
              this.p2p.initialize();
              this.p2p.open.subscribe(() => {
                console.log('Peer connections enabled!');
                this.peerConnectionEstablished = true;
                this.peerId = this.p2p.id;
              });
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.p2p.destroy();
      this.peerConnectionsEnabled = false;
      this.peerConnectionEstablished = false;
      this.peerId = '';
    }
  }

  async onEnhancedUnitCostRuleToggleChange(event: Event) {
    const value = (<CustomEvent>event).detail.checked;
    await this.unitService.setEnhancedUnitCostRule(value);
  }

  toggleEnhancedUnitCostDescription(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName !== 'ION-TOGGLE') {
      this.showEnhancedUnitCostDescription =
        !this.showEnhancedUnitCostDescription;
    }
  }

  async exportData() {
    const data = this.unitService.exportData();
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'skirmish-app-backup.json';
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
          const success = await this.unitService.importAndMergeData(jsonString);
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

  async importUnits() {
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
          const success = await this.unitService.importAndMergeUnitsOnly(
            jsonString
          );
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

  async importWarbands() {
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
          const success = await this.unitService.importAndMergeWarbandsOnly(
            jsonString
          );
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

  async overwriteData() {
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
          // Once the data has been loaded, confirm that the user wants to overwrite their data
          const confirmAlert = await this.alertController.create({
            header: 'Confirm Overwrite',
            message: 'Are you sure you want to overwrite your data?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
              },
              {
                text: 'Overwrite',
                handler: async () => {
                  const success = await this.unitService.importAndOverwriteData(
                    jsonString
                  );
                  if (success) {
                    console.log('Data imported successfully');
                  } else {
                    console.error('Error importing data');
                  }
                },
              },
            ],
          });
          await confirmAlert.present();
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  }

  deleteData() {
    // Confirm that the user wants to delete their data
    this.alertController
      .create({
        header: 'Confirm Delete',
        message: 'Are you sure you want to delete your data?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Delete',
            handler: async () => {
              await this.unitService.clearUnits();
              await this.unitService.clearWarbands();
              await this.unitService.setEnhancedUnitCostRule(false);
              console.log('Data deleted successfully');
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
