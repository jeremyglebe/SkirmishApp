import { Injectable, EventEmitter } from '@angular/core';
import { Unit, Warband } from '../data/models';
import { Storage } from '@ionic/storage-angular';
import { RANK_COSTS } from '../data/core_rules';
import { DataService } from './data.service';

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
  private warbands: Warband[] = [];
  private _startedInitialization = false;
  private enhancedUnitCostRule: boolean = false;

  constructor(private data: DataService) {}

  /**
   * Initializes the UnitService by loading units and warbands from storage.
   */
  async initialize(): Promise<void> {
    if (this._startedInitialization) return;
    this._startedInitialization = true;
    await this.data.initialize();
    const storedWarbands = this.data.warbands || [];
    this.warbands = storedWarbands;
    this.enhancedUnitCostRule = this.data.enhancedUnitCostRule || false;
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

  get units(): Unit[] {
    return this.data.units;
  }

  /**
   * Calculates the cost of a single unit based on its rank and edges.
   */
  calcUnitCost(unit: Unit): number {
    this.checkInitialization();
    // The base cost of the unit based on its rank
    let unitCost = RANK_COSTS[unit.rank];
    // The total number of edges the unit has
    const numberOfEdges = unit.edges.length;
    // The number of allowed (positive cost) edges before enhanced
    // cost kicks in (if the user has enabled the enhanced cost rule)
    const maximumEdgesBeforeEnhancedCost = 3;
    // Counter for the number of edges with positive cost
    // (Used in enhanced cost calculation)
    let positiveCostEdgeCount = 0;
    // Iterate through each edge and add its cost to the total cost
    for (let i = 0; i < numberOfEdges; i++) {
      const rule = unit.edges[i];
      // If the cost is positive
      if (rule.cost > 0) {
        // Increment the counter for the number of edges with positive cost
        positiveCostEdgeCount++;
        // If the enhanced cost rule is enabled and the number of edges with
        // positive cost exceeds the maximum allowed, add the enhanced cost
        if (
          this.enhancedUnitCostRule &&
          positiveCostEdgeCount > maximumEdgesBeforeEnhancedCost
        ) {
          unitCost +=
            (positiveCostEdgeCount - maximumEdgesBeforeEnhancedCost) * 10;
        }
        // Add the cost of the edge to the total cost
        unitCost += rule.cost;
      }
      // If the cost is negative, it should be added directly and not contribute
      // towards the enhanced cost calculation
      else {
        unitCost += rule.cost;
      }
    }
    return unitCost;
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
   * Retrieves the cost of a unit's rank.
   */
  getRankCost(unit: Unit): number {
    this.checkInitialization();
    return RANK_COSTS[unit.rank];
  }

  async setEnhancedUnitCostRule(value: boolean): Promise<void> {
    this.checkInitialization();
    this.enhancedUnitCostRule = value;
    await this.data.setEnhancedUnitCostRule(value);
    this.changes.emit();
  }

  async getEnhancedUnitCostRule(): Promise<boolean> {
    this.checkInitialization();
    const value = this.data.enhancedUnitCostRule;
    this.enhancedUnitCostRule = value || false;
    return this.enhancedUnitCostRule;
  }

  /**
   * Exports the unit and warband data as a JSON string.
   */
  exportData(): string {
    const data = {
      units: this.data.units,
      warbands: this.warbands,
      enhancedUnitCostRule: this.enhancedUnitCostRule,
    };
    return JSON.stringify(data, null, 2);
  }

  async importAndMergeData(jsonString: string): Promise<boolean> {
    this.checkInitialization();
    try {
      const data = JSON.parse(jsonString);
      const units = this.data.units.concat(data.units);
      this.warbands = this.warbands.concat(data.warbands);
      await this.data.setUnits(units);
      await this.data.setWarbands(this.warbands);
      this.changes.emit();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  async importAndMergeUnitsOnly(jsonString: string): Promise<boolean> {
    this.checkInitialization();
    try {
      const data = JSON.parse(jsonString);
      const units = this.data.units.concat(data.units);
      await this.data.setUnits(units);
      this.changes.emit();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  async importAndMergeWarbandsOnly(jsonString: string): Promise<boolean> {
    this.checkInitialization();
    try {
      const data = JSON.parse(jsonString);
      this.warbands = this.warbands.concat(data.warbands);
      await this.data.setWarbands(this.warbands);
      this.changes.emit();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  /**
   * Imports unit and warband data from a JSON string and saves it to storage.
   * Returns true if the import is successful, and false otherwise.
   */
  async importAndOverwriteData(jsonString: string): Promise<boolean> {
    this.checkInitialization();
    try {
      const data = JSON.parse(jsonString);
      const units = data.units;
      this.warbands = data.warbands;
      this.enhancedUnitCostRule = data.enhancedUnitCostRule;
      await this.data.setUnits(units);
      await this.data.setWarbands(this.warbands);
      await this.data.setEnhancedUnitCostRule(this.enhancedUnitCostRule);
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
    const units = this.data.units.concat(unit);
    await this.data.setUnits(units);
  }

  /**
   * Removes a unit from the units array and all warbands that include the unit,
   * then saves the updated data to storage.
   */
  async purgeUnit(unit: Unit) {
    this.checkInitialization();
    // Remove the unit from the units array
    const units = this.data.units.filter((u) => u.id !== unit.id);

    // Remove the unit from all warbands
    this.warbands = this.warbands.map((warband) => {
      warband.units = warband.units.filter(
        (warbandUnit) => warbandUnit.unit.id !== unit.id
      );
      return warband;
    });

    // Save the updated data to storage
    await this.data.setUnits(units);
    await this.data.setWarbands(this.warbands);
  }

  // Deletes a unit from the units array and storage, but does not remove it from warbands.
  async deleteUnit(unit: Unit) {
    const units = this.data.units.filter((u) => u.id !== unit.id);
    await this.data.setUnits(units);
  }

  /**
   * Clears the units array and removes the units from storage.
   */
  async clearUnits() {
    await this.data.clearUnits();
    this.changes.emit();
  }

  async updateUnit(updatedUnit: Unit): Promise<void> {
    this.data.updateUnit(updatedUnit);
  }

  getUnitById(id: string): Unit | null {
    return this.data.getUnitById(id);
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
    await this.data.setWarbands(this.warbands);
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
  async createWarband(warbandData: Omit<Warband, 'id'>) {
    this.checkInitialization();
    const newWarband: Warband = {
      id: Date.now().toString(),
      ...warbandData,
    };
    this.warbands.push(newWarband);
    await this.data.setWarbands(this.warbands);
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
      await this.data.setWarbands(this.warbands);
    }
  }

  /**
   * Retrieves a warband by its ID.
   */
  getWarbandById(warbandId: string): Warband | null {
    this.checkInitialization();
    const warband = this.warbands.find((w) => w.id === warbandId);
    return warband ? { ...warband } : null;
  }

  /**
   * Removes a warband from the warbands array and saves the changes to storage.
   */
  async removeWarband(warband: Warband) {
    this.checkInitialization();
    this.warbands = this.warbands.filter((w) => w !== warband);
    await this.data.setWarbands(this.warbands);
  }

  /**
   * Clears the warbands array and removes warbands from storage.
   */
  async clearWarbands() {
    this.checkInitialization();
    await this.data.clearWarbands();
    this.warbands = [];
    this.changes.emit();
  }
}
