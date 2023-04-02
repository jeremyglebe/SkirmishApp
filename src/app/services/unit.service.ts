import { Injectable } from '@angular/core';
import { Unit, Warband } from '../data/models';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private units: Unit[] = [];
  private warbands: Warband[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    await this.storage.create();
    const storedUnits = (await this.storage.get('units')) || [];
    const storedWarbands = (await this.storage.get('warbands')) || [];
    this.units = storedUnits;
    this.warbands = storedWarbands;
  }

  // Unit handling methods
  async addUnit(unit: Unit) {
    this.units.push(unit);
    await this.storage.set('units', this.units);
  }

  getUnits(): Unit[] {
    return this.units;
  }

  async removeUnit(unit: Unit) {
    this.units = this.units.filter((u) => u !== unit);
    await this.storage.set('units', this.units);
  }

  async clearUnits() {
    await this.storage.remove('units');
    this.units = [];
  }

  // Warband handling methods
  async addWarband(warband: Warband) {
    this.warbands.push(warband);
    await this.storage.set('warbands', this.warbands);
  }

  getWarbands(): Warband[] {
    return this.warbands;
  }

  async removeWarband(warband: Warband) {
    this.warbands = this.warbands.filter((w) => w !== warband);
    await this.storage.set('warbands', this.warbands);
  }

  async clearWarbands() {
    await this.storage.remove('warbands');
    this.warbands = [];
  }
}
