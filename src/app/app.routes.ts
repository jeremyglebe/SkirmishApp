import { Routes } from '@angular/router';

export const routes: Routes = [
  // The default "home" page is a tabs container for the 3 main pages
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  // Tabs page must specify routes to each of the child pages
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      // If no tab is specified, the first tab to be selected should be the units tab
      {
        path: '',
        redirectTo: '/tabs/units',
        pathMatch: 'full',
      },
      // The units tab lists all the units and allows users to enter creation and view pages
      {
        path: 'units',
        loadComponent: () => import('./units-list/units-list.page').then((m) => m.UnitsListPage),
      },
      // The warbands tab lists all the warbands and allows users to enter creation and view pages
      {
        path: 'warbands',
        loadComponent: () =>
          import('./warbands-list/warbands-list.page').then(
            (m) => m.WarbandsListPage
          ),
      },
      // The settings tab allows users to change app settings, as well as manage data backups and accounts
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
      }
    ],
  },
  // This is a standalone route to the units listing page
  // This is usually accessed as a tab and shouldn't be accessed directly
  {
    path: 'units',
    loadComponent: () => import('./units-list/units-list.page').then((m) => m.UnitsListPage),
  },
  // The unit creation page is where users design new units
  {
    path: 'unit-editor',
    loadComponent: () =>
      import('./unit-editor/unit-editor.page').then(
        (m) => m.UnitEditorPage
      ),
  },
  // The unit view page is where users view the details of a unit
  {
    path: 'unit-view',
    loadComponent: () =>
      import('./unit-view/unit-view.page').then((m) => m.UnitViewPage),
  },
  // This is a standalone route to the warbands listing page
  // This is usually accessed as a tab and shouldn't be accessed directly
  {
    path: 'warbands-list',
    loadComponent: () =>
      import('./warbands-list/warbands-list.page').then(
        (m) => m.WarbandsListPage
      ),
  },
  // The warband creation page is where users design new warbands
  {
    path: 'warband-editor',
    loadComponent: () =>
      import('./warband-editor/warband-editor.page').then(
        (m) => m.WarbandEditorPage
      ),
  },
  // The warband view page is where users view the details of a warband
  {
    path: 'warband-view',
    loadComponent: () =>
      import('./warband-view/warband-view.page').then((m) => m.WarbandViewPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },  {
    path: 'create-unit-details',
    loadComponent: () => import('./pages/create-unit/create-unit-details/create-unit-details.page').then( m => m.CreateUnitDetailsPage)
  },

];
