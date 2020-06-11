import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: "listEst"
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'listEst',
        loadChildren: () => import('./../estudiante/list/list.module').then( m => m.ListPageModule)
      },
      {
        path: 'listMat',
        loadChildren: () => import('./../materia/list/list.module').then( m => m.ListPageModule)
      },
      {
        path: 'listDoc',
        loadChildren: () => import('./../docente/list/list.module').then( m => m.ListPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
