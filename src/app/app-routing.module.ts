import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create',
    loadChildren: () => import('./estudiante/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./estudiante/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./materia/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./materia/update/update.module').then( m => m.UpdatePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
