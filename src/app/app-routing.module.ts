import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './homepage/about/about.component';
import { CreategroupeComponent } from './homepage/creategroupe/creategroupe.component';
import { EpisodehomeComponent } from './homepage/episodehome/episodehome.component';
import { GroupesComponent } from './homepage/groupes/groupes.component';
import { BodyComponent } from './homepage/groupesingle/body/body.component';
import { GroupesingleComponent } from './homepage/groupesingle/groupesingle.component';
import { MembresComponent } from './homepage/groupesingle/membres/membres.component';
import { PhotoComponent } from './homepage/groupesingle/photo/photo.component';
import { HomecompComponent } from './homepage/homecomp/homecomp.component';

import { HomepageComponent } from './homepage/homepage.component';
import { MygroupeComponent } from './homepage/mygroupe/mygroupe.component';
import { NotifComponent } from './homepage/notif/notif.component';
import { ProfileComponent } from './homepage/profile/profile.component';

import { ShopComponent } from './homepage/shop/shop.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './homepage/question/question.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login', component:LoginComponent
  },
    {
    path: 'home',
    canActivate: [AuthGuard] ,
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: HomecompComponent,
      },
      {path: 'groupedetail/:id', component:GroupesingleComponent , children:[
          
        {path:'', component: BodyComponent},
        {path:'membre/:idg' , component: MembresComponent},
        {path: 'photo/:idg' , component: PhotoComponent}
      ]},
      {path: 'video', component: EpisodehomeComponent},
    
      {path: 'groupes', component: GroupesComponent},
      {path: 'create', component: CreategroupeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'shop', component: ShopComponent},
      {path: 'mygroupe', component: MygroupeComponent},
      {path: 'notif', component: NotifComponent},
      {path: 'question', component: QuestionComponent},


      {path: 'profile/:id' , component: ProfileComponent}





    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
