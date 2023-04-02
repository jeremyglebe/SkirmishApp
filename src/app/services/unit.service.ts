import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Unit } from '../data/models';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitsSource = new BehaviorSubject<Unit[]>([]);
  units$ = this.unitsSource.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedUnits = (await this.storage.get('units')) || [];
    this.unitsSource.next(storedUnits);
  }

  async addUnit(unit: Unit) {
    const units = this.unitsSource.getValue();
    units.push(unit);
    this.unitsSource.next(units);
    await this.storage.set('units', units);
  }

  // Clear all units from storage
  async clearUnits() {
    await this.storage.remove('units');
    this.unitsSource.next([]);
  }
}
