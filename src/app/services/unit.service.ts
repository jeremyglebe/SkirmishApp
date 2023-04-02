import { Injectable } from '@angular/core';
import { Unit } from '../data/models';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private units: Unit[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    await this.storage.create();
    const storedUnits = (await this.storage.get('units')) || [];
    this.units = storedUnits;
  }

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
}
