/// This service will replace some aspects of UnitService in V2 of the project, for now it is not in use.

import { Injectable } from '@angular/core';
import { UnitV2 } from '../data/models';

export interface State {
  editorUnit?: UnitV2;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state: State = {};

  constructor() {}

  get all(): State {
    return this.state;
  }

  set all(state: State) {
    this.state = state;
  }

  get editorUnit(): UnitV2 | undefined {
    return this.state.editorUnit;
  }

  set editorUnit(unit: UnitV2 | undefined) {
    this.state.editorUnit = unit;
  }
}
