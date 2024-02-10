import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataStorage, Unit, Warband } from '../data/models';
import { GuiService } from './gui.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data?: DataStorage;

  constructor(private gui: GuiService, private storage: Storage) {
    this.gui.showPromiseLoader(
      this.initialize(),
      'Initializing Data Service...'
    );
  }

  /**
   * Initializes the DataService by loading units and warbands from storage.
   */
  async initialize(): Promise<void> {
    await this.storage.create();
    await this.loadDataFromStorage();
  }

  get units(): Unit[] {
    return this.data?.units || [];
  }

  get warbands(): Warband[] {
    return this.data?.warbands || [];
  }

  get enhancedUnitCostRule(): boolean {
    return this.data?.enhancedUnitCostRule || false;
  }

  getUnitById(id: string): Unit | null {
    const result = this.units.find((unit) => unit.id === id);
    return result || null;
  }

  async setUnits(units: Unit[]) {
    this.data!.units = units;
    this.gui.showPromiseLoader(this.saveDataToStorage(), 'Saving Units...');
  }

  async setWarbands(warbands: Warband[]) {
    this.data!.warbands = warbands;
    this.gui.showPromiseLoader(this.saveDataToStorage(), 'Saving Warbands...');
  }

  async setEnhancedUnitCostRule(enhancedUnitCostRule: boolean) {
    this.data!.enhancedUnitCostRule = enhancedUnitCostRule;
    this.gui.showPromiseLoader(
      this.saveDataToStorage(),
      'Saving Enhanced Unit Cost Rule...'
    );
  }

  async updateUnit(updatedUnit: Unit): Promise<void> {
    const unitIndex = this.data!.units.findIndex(
      (unit) => unit.id === updatedUnit.id
    );
    if (unitIndex !== -1) {
      this.data!.units[unitIndex] = updatedUnit;
      this.gui.showPromiseLoader(this.saveDataToStorage(), 'Updating Unit...');
    }
  }

  async clearUnits() {
    this.data!.units = [];
    this.gui.showPromiseLoader(this.saveDataToStorage(), 'Clearing Units...');
  }

  async clearWarbands() {
    this.data!.warbands = [];
    this.gui.showPromiseLoader(
      this.saveDataToStorage(),
      'Clearing Warbands...'
    );
  }

  private async saveDataToStorage(): Promise<void> {
    // Save properties to storage
    await this.storage.set('units', this.data?.units);
    await this.storage.set('warbands', this.data?.warbands);
    await this.storage.set(
      'enhancedUnitCostRule',
      this.data?.enhancedUnitCostRule
    );
  }

  private async loadDataFromStorage(): Promise<void> {
    // Get properties from storage
    const storedUnits = (await this.storage.get('units')) || [];
    const storedWarbands = (await this.storage.get('warbands')) || [];
    const storedEnhancedRule =
      (await this.storage.get('enhancedUnitCostRule')) || false;
    // Set the data property
    this.data = {
      units: storedUnits,
      warbands: storedWarbands,
      enhancedUnitCostRule: storedEnhancedRule,
    };
  }
}
