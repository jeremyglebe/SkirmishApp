import { Injectable, EventEmitter } from '@angular/core';
import { Unit, Warband } from '../data/models';
import { Storage } from '@ionic/storage-angular';
import { QUALITY_COSTS } from '../data/core_rules';

/**
 * UnitService is a service class that handles all interactions with units and warbands.
 * It provides methods for creating, updating, deleting, and retrieving units and warbands,
 * as well as calculating costs for individual units and entire warbands.
 */
@Injectable({
  providedIn: 'root',
})
export class UnitService {
  public changes = new EventEmitter<void>();
  private units: Unit[] = [];
  private warbands: Warband[] = [];
  private _startedInitialization = false;
  private enhancedUnitCostRule: boolean = false;

  constructor(private storage: Storage) {}

  /**
   * Initializes the UnitService by loading units and warbands from storage.
   */
  async initialize(): Promise<void> {
    if (this._startedInitialization) return;
    this._startedInitialization = true;
    await this.storage.create();
    const storedUnits = (await this.storage.get('units')) || [];
    const storedWarbands = (await this.storage.get('warbands')) || [];
    this.units = storedUnits;
    this.warbands = storedWarbands;
    this.enhancedUnitCostRule =
      (await this.storage.get('enhancedUnitCostRule')) || false;
  }

  /**
   * Ensures that the UnitService has been initialized before use.
   */
  checkInitialization(): void {
    if (!this._startedInitialization) {
      throw new Error(
        'You must call UnitService.initialize() before using this service!'
      );
    }
  }

  /**
   * Calculates the cost of a single unit based on its quality and special rules.
   */
  calcUnitCost(unit: Unit): number {
    this.checkInitialization();
    let cost = QUALITY_COSTS[unit.quality];
    const specialRuleCount = unit.specialRules.length;

    for (let i = 0; i < specialRuleCount; i++) {
      const rule = unit.specialRules[i];
      cost += rule.cost;

      if (this.enhancedUnitCostRule && i >= 3) {
        cost += (i - 2) * 10;
      }
    }

    return cost;
  }

  /**
   * Calculates the total cost of a warband by summing the costs of all its units.
   */
  calcWarbandCost(warband: Warband): number {
    this.checkInitialization();
    let cost = 0;
    for (let unitObj of warband.units) {
      cost += this.calcUnitCost(unitObj.unit) * unitObj.count;
    }
    return cost;
  }

  /**
   * Retrieves the cost of a unit's quality.
   */
  getQualityCost(unit: Unit): number {
    this.checkInitialization();
    return QUALITY_COSTS[unit.quality];
  }

  async setEnhancedUnitCostRule(value: boolean): Promise<void> {
    this.checkInitialization();
    this.enhancedUnitCostRule = value;
    await this.storage.set('enhancedUnitCostRule', value);
  }

  async getEnhancedUnitCostRule(): Promise<boolean> {
    this.checkInitialization();
    const value = await this.storage.get('enhancedUnitCostRule');
    this.enhancedUnitCostRule = value || false;
    return this.enhancedUnitCostRule;
  }

  /**
   * Exports the unit and warband data as a JSON string.
   */
  exportData(): string {
    const data = {
      units: this.units,
      warbands: this.warbands,
      enhancedUnitCostRule: this.enhancedUnitCostRule,
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * Imports unit and warband data from a JSON string and saves it to storage.
   * Returns true if the import is successful, and false otherwise.
   */
  async importData(jsonString: string): Promise<boolean> {
    this.checkInitialization();
    try {
      const data = JSON.parse(jsonString);
      this.units = data.units;
      this.warbands = data.warbands;
      this.enhancedUnitCostRule = data.enhancedUnitCostRule;
      await this.storage.set('units', this.units);
      await this.storage.set('warbands', this.warbands);
      await this.storage.set('enhancedUnitCostRule', this.enhancedUnitCostRule);
      this.changes.emit();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  //   _    _ _   _ _____ _______ _____
  //  | |  | | \ | |_   _|__   __/ ____|
  //  | |  | |  \| | | |    | | | (___
  //  | |  | | . ` | | |    | |  \___ \
  //  | |__| | |\  |_| |_   | |  ____) |
  //   \____/|_| \_|_____|  |_| |_____/
  // ASCII Art Font: Big (https://patorjk.com/software/taag/)

  /**
   * Adds a new unit to the units array and saves it to storage.
   */
  async addUnit(unit: Unit) {
    this.checkInitialization();
    this.units.push(unit);
    await this.storage.set('units', this.units);
  }

  /**
   * Retrieves the units array.
   */
  getUnits(): Unit[] {
    this.checkInitialization();
    return this.units;
  }

  /**
   * Removes a unit from the units array and all warbands that include the unit,
   * then saves the updated data to storage.
   */
  async removeUnit(unit: Unit) {
    this.checkInitialization();
    // Remove the unit from the units array
    this.units = this.units.filter((u) => u.id !== unit.id);

    // Remove the unit from all warbands
    this.warbands = this.warbands.map((warband) => {
      warband.units = warband.units.filter(
        (warbandUnit) => warbandUnit.unit.id !== unit.id
      );
      return warband;
    });

    // Save the updated data to storage
    await this.storage.set('units', this.units);
    await this.storage.set('warbands', this.warbands);
  }

  /**
   * Clears the units array and removes the units from storage.
   */
  async clearUnits() {
    this.checkInitialization();
    await this.storage.remove('units');
    this.units = [];
  }

  // __          __     _____  ____          _   _ _____   _____
  // \ \        / /\   |  __ \|  _ \   /\   | \ | |  __ \ / ____|
  //  \ \  /\  / /  \  | |__) | |_) | /  \  |  \| | |  | | (___
  //   \ \/  \/ / /\ \ |  _  /|  _ < / /\ \ | . ` | |  | |\___ \
  //    \  /\  / ____ \| | \ \| |_) / ____ \| |\  | |__| |____) |
  //     \/  \/_/    \_\_|  \_\____/_/    \_\_| \_|_____/|_____/
  // ASCII Art Font: Big (https://patorjk.com/software/taag/)

  /**
   * Adds a new warband to the warbands array and saves it to storage.
   */
  async addWarband(warband: Warband) {
    this.checkInitialization();
    this.warbands.push(warband);
    await this.storage.set('warbands', this.warbands);
  }
  /**
   * Retrieves the warbands array.
   */
  getWarbands(): Warband[] {
    this.checkInitialization();
    return this.warbands;
  }

  /**
   * Creates a new warband with the provided data, adds it to the warbands array,
   * and saves it to storage.
   */
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

  /**
   * Updates an existing warband and saves the changes to storage.
   */
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

  /**
   * Retrieves a warband by its ID.
   */
  getWarbandById(id: string): Warband | undefined {
    this.checkInitialization();
    return this.warbands.find((w) => w.id === id);
  }

  /**
   * Removes a warband from the warbands array and saves the changes to storage.
   */
  async removeWarband(warband: Warband) {
    this.checkInitialization();
    this.warbands = this.warbands.filter((w) => w !== warband);
    await this.storage.set('warbands', this.warbands);
  }

  /**
   * Clears the warbands array and removes warbands from storage.
   */
  async clearWarbands() {
    this.checkInitialization();
    await this.storage.remove('warbands');
    this.warbands = [];
  }
}
