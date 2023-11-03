import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ButtonComponent } from './component/button/button.component';
import { BannerComponent } from './component/banner/banner.component';
import { MainComponent } from './component/main/main.component';
import { BlocksComponent } from './component/blocks/blocks.component';
import { LaboratoriesComponent } from './component/laboratories/laboratories.component';
import { FormComponent } from './component/form/form.component';
import { SoftwareListComponent } from './component/software-list/software-list.component';

const routes: Routes = [
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'banner', component: BannerComponent },
  { path: '', component: MainComponent },
  { path: 'blocos', component: BlocksComponent },
  { path: 'blocos/:blockId/labs', component: LaboratoriesComponent },
  { path: 'form', component: FormComponent },
  {
    path: 'blocos/:blockId/labs/:labId/softwares',
    component: SoftwareListComponent,
  },
  {
    path: 'blocos/:blockId/labs/:labId/softwares/form',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
