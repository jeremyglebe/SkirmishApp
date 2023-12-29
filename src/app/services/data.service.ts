import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataStorage, Unit, Warband } from '../data/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public whenLocked = new EventEmitter<void>();
  public whenUnlocked = new EventEmitter<void>();
  private _startedInitialization = false;
  private _locked = true;
  private data?: DataStorage;

  constructor(private storage: Storage) {}

  /**
   * Initializes the DataService by loading units and warbands from storage.
   */
  async initialize(): Promise<void> {
    if (this._startedInitialization) return;
    this._startedInitialization = true;
    await this.storage.create();
    await this.loadDataFromStorage();
    this.unlock();
  }

  get locked(): boolean {
    return this._locked;
  }

  get units(): Unit[] {
    if (this.locked) throw new Error('DataService is locked!');
    return this.data?.units || [];
  }

  get warbands(): Warband[] {
    if (this.locked) throw new Error('DataService is locked!');
    return this.data?.warbands || [];
  }

  get enhancedUnitCostRule(): boolean {
    if (this.locked) throw new Error('DataService is locked!');
    return this.data?.enhancedUnitCostRule || false;
  }

  getUnitById(id: string): Unit | null {
    const result = this.units.find((unit) => unit.id === id);
    return result || null;
  }

  async setUnits(units: Unit[]) {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.setUnits(units);
      });
    }
    this.data!.units = units;
    await this.saveDataToStorage();
    this.unlock();
  }

  async setWarbands(warbands: Warband[]) {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.setWarbands(warbands);
      });
    }
    this.data!.warbands = warbands;
    await this.saveDataToStorage();
    this.unlock();
  }

  async setEnhancedUnitCostRule(enhancedUnitCostRule: boolean) {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.setEnhancedUnitCostRule(enhancedUnitCostRule);
      });
    }
    this.data!.enhancedUnitCostRule = enhancedUnitCostRule;
    await this.saveDataToStorage();
    this.unlock();
  }

  async updateUnit(updatedUnit: Unit): Promise<void> {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.updateUnit(updatedUnit);
      });
    }
    const unitIndex = this.data!.units.findIndex(
      (unit) => unit.id === updatedUnit.id
    );
    if (unitIndex !== -1) {
      this.data!.units[unitIndex] = updatedUnit;
      await this.saveDataToStorage();
    }
    this.unlock();
  }

  async clearUnits() {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.clearUnits();
      });
    }
    this.data!.units = [];
    await this.saveDataToStorage();
    this.unlock();
  }

  async clearWarbands() {
    if (!this.lock()) {
      this.whenLocked.subscribe(() => {
        this.clearWarbands();
      });
    }
    this.data!.warbands = [];
    await this.saveDataToStorage();
    this.unlock();
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
    const storagedEnhancedRule =
      (await this.storage.get('enhancedUnitCostRule')) || false;
    // Set the data property
    this.data = {
      units: storedUnits,
      warbands: storedWarbands,
      enhancedUnitCostRule: storagedEnhancedRule,
    };
  }

  private lock(): boolean {
    // console.log('Locking DataService');
    if (this._locked) return false;
    this._locked = true;
    this.whenLocked.emit();
    return true;
  }

  private unlock(): boolean {
    // console.log('Unlocking DataService');
    if (!this._locked) return false;
    this._locked = false;
    this.whenUnlocked.emit();
    return true;
  }
}
