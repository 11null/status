import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeatstarSiteModStatusPageViewModule } from './beatstar-site-mod-status-page-view/beatstar-site-mod-status-page-view.module';
import { ModStatusSiteMainComponent } from './beatstar-site-mod-status-page-view/mod-status-site-main/mod-status-site-main.component';
import { HomePagePlaceholderViewComponent } from './home-page-placeholder-view/home-page-placeholder-view/home-page-placeholder-view.component';
import { HomePagePlaceholderViewModule } from './home-page-placeholder-view/home-page-placeholder-view.module';

const routes: Routes = [
  {path:'',component:ModStatusSiteMainComponent},
  {path:'**',component:HomePagePlaceholderViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),BeatstarSiteModStatusPageViewModule,HomePagePlaceholderViewModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
