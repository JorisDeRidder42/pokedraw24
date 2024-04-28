import { AboutPageModule } from './about/about.module';
import { PokedexPageModule } from './pokedex/pokedex.module';
import { DrawPageModule } from './draw/draw.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/draw',
    loadChildren: () => import('./draw/draw.module').then( m => m.DrawPageModule)
  },
  {
    path: 'home/pokedex',
    loadChildren: () => import('./pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: 'home/about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'home/pokedex/:index',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
