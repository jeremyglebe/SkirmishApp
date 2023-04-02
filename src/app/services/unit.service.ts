import { Injectable } from '@angular/core';
import { Unit, Warband } from '../data/models';
import { Storage } from '@ionic/storage-angular';
import { QUALITY_COSTS } from '../data/core_rules';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private units: Unit[] = [];
  private warbands: Warband[] = [];
  private _startedInitialization = false;

  constructor(private storage: Storage) {}

  async initialize(): Promise<void> {
    if (this._startedInitialization) return;
    this._startedInitialization = true;
    await this.storage.create();
    const storedUnits = (await this.storage.get('units')) || [];
    const storedWarbands = (await this.storage.get('warbands')) || [];
    this.units = storedUnits;
    this.warbands = storedWarbands;
  }

  checkInitialization(): void {
    if (!this._startedInitialization) {
      throw new Error(
        'You must call UnitService.initialize() before using this service!'
      );
    }
  }

  // Unit handling methods
  async addUnit(unit: Unit) {
    this.checkInitialization();
    this.units.push(unit);
    await this.storage.set('units', this.units);
  }

  getUnits(): Unit[] {
    this.checkInitialization();
    return this.units;
  }

  async removeUnit(unit: Unit) {
    this.checkInitialization();
    this.units = this.units.filter((u) => u !== unit);
    await this.storage.set('units', this.units);
  }

  async clearUnits() {
    this.checkInitialization();
    await this.storage.remove('units');
    this.units = [];
  }

  // Warband handling methods
  async addWarband(warband: Warband) {
    this.checkInitialization();
    this.warbands.push(warband);
    await this.storage.set('warbands', this.warbands);
  }

  getWarbands(): Warband[] {
    this.checkInitialization();
    return this.warbands;
  }

  async createWarband(warbandData: Omit<Warband, 'id' | 'units'>) {
    this.checkInitialization();
    const newWarband: Warband = {
      id: Date.now().toString(),
      units: [],
      ...warbandData,
    };
    this.warbands.push(newWarband);
    await this.storage.set('warbands', this.warbands);
  }

  async updateWarband(updatedWarband: Warband) {
    this.checkInitialization();
    const warbandIndex = this.warbands.findIndex(
      (w) => w.id === updatedWarband.id
    );
    if (warbandIndex > -1) {
      this.warbands[warbandIndex] = updatedWarband;
      await this.storage.set('warbands', this.warbands);
    }
  }

  getWarbandById(id: string): Warband | undefined {
    this.checkInitialization();
    return this.warbands.find((w) => w.id === id);
  }

  async removeWarband(warband: Warband) {
    this.checkInitialization();
    this.warbands = this.warbands.filter((w) => w !== warband);
    await this.storage.set('warbands', this.warbands);
  }

  async clearWarbands() {
    this.checkInitialization();
    await this.storage.remove('warbands');
    this.warbands = [];
  }

  calcUnitCost(unit: Unit): number {
    this.checkInitialization();
    let cost = QUALITY_COSTS[unit.quality];
    for (let rule of unit.specialRules) {
      cost += rule.cost;
    }
    return cost;
  }

  calcWarbandCost(warband: Warband): number {
    this.checkInitialization();
    let cost = 0;
    for (let unitObj of warband.units) {
      cost += this.calcUnitCost(unitObj.unit) * unitObj.count;
    }
    return cost;
  }  

  getQualityCost(unit: Unit): number {
    this.checkInitialization();
    return QUALITY_COSTS[unit.quality];
  }
}
