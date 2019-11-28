import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { TestComponent } from './test/test.component';
import { PregsResComponent } from './pregs-res/pregs-res.component';
import { AltaPregResComponent } from './pregs-res/alta/alta.component';
// Kits
import { KitsListComponent } from './kits/kits-list/kits-list.component';
import { KitsUpdateComponent } from './kits/kits-update/kits-update.component';
import {KitsCreateComponent} from './kits/kits-create/kits-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'pregsres', component: PregsResComponent },
  { path: 'pregsres/nuevo', component: AltaPregResComponent },
  { path: 'kits/lista/:id', component: KitsListComponent },
  { path: 'kits/lista', component: KitsListComponent },
  { path: 'kits/actualizar', component: KitsUpdateComponent },
  { path: 'kits', redirectTo: '/kits/lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
