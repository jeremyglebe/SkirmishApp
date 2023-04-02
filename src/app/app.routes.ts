import { Routes } from '@angular/router';
import { UnitCreationPage } from './unit-creation/unit-creation.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'unit-creation',
    component: UnitCreationPage,
  },
  {
    path: 'view-unit',
    loadComponent: () => import('./view-unit/view-unit.page').then( m => m.ViewUnitPage)
  },
];
