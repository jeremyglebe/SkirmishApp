/// This service will replace some aspects of UnitService in V2 of the project, for now it is not in use.

import { Injectable } from '@angular/core';
import { DraftUnit, UnitV2, Warband } from '../data/models';

export interface State {
  draftUnit?: DraftUnit;
  units: UnitV2[];
  warbands: Warband[];
  settings: {
    enhancedUnitCostRule: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state: State = {
    units: [],
    warbands: [],
    settings: {
      enhancedUnitCostRule: false,
    },
  };

  constructor() {}

  get all(): State {
    return this.state;
  }

  set all(state: State) {
    this.state = state;
  }

  get draftUnit(): DraftUnit | undefined {
    return this.state.draftUnit;
  }

  set draftUnit(unit: DraftUnit | undefined) {
    this.state.draftUnit = unit;
  }

  fromJSON(json: string): void {
    // Should probably validate the JSON before parsing it...
    // ...but why would anyone ever parse invalid JSON? It just wouldn't happen. Never.
    // ...right?
    // TODO: Validate JSON
    this.state = JSON.parse(json);
  }

  toJSON(): string {
    const { draftUnit, ...state } = this.state;
    return JSON.stringify(state);
  }
}
