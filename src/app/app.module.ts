import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomepageComponent } from './homepage/homepage.component';
import { GroupesliderComponent } from './homepage/homecomp/groupeslider/groupeslider.component';
import { NewpostComponent } from './homepage/homecomp/newpost/newpost.component';
import { FeedhomeComponent } from './homepage/homecomp/feedhome/feedhome.component';
import { GroupesingleComponent } from './homepage/groupesingle/groupesingle.component';
import { HomecompComponent } from './homepage/homecomp/homecomp.component';
import { HeadersideComponent } from './homepage/groupesingle/headerside/headerside.component';
import { CovergroupeComponent } from './homepage/groupesingle/covergroupe/covergroupe.component';
import { GroupefeedComponent } from './homepage/groupesingle/groupefeed/groupefeed.component';
import { GroupenewpostComponent } from './homepage/groupesingle/groupenewpost/groupenewpost.component';
import { GroupetabComponent } from './homepage/groupesingle/groupetab/groupetab.component';
import { BodyComponent } from './homepage/groupesingle/body/body.component';
import { MembresComponent } from './homepage/groupesingle/membres/membres.component';
import { PhotoComponent } from './homepage/groupesingle/photo/photo.component';
import { HeadComponent } from './homepage/head/head.component';
import { EpisodehomeComponent } from './homepage/episodehome/episodehome.component';
import { CategorieComponent } from './homepage/episodehome/categorie/categorie.component';
import { LatestComponent } from './homepage/episodehome/latest/latest.component';
import { MorevideoComponent } from './homepage/episodehome/morevideo/morevideo.component';

import { GroupesComponent } from './homepage/groupes/groupes.component';
import { GroupecatComponent } from './homepage/groupes/groupecat/groupecat.component';
import { GroupetabuComponent } from './homepage/groupes/groupetabu/groupetabu.component';

import { QuestionComponent } from './homepage/question/question.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AuthGuard } from './auth.guard';
import { DataService } from './services/data.service';
import { PopupComponent } from './homepage/groupesingle/popup/popup.component';
import { CreategroupeComponent } from './homepage/creategroupe/creategroupe.component';
import { LatestsComponent } from './homepage/groupes/latests/latests.component';

import { YoutubeService } from './services/youtube.service';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { ShopComponent } from './homepage/shop/shop.component';
import { AboutComponent } from './homepage/about/about.component';
import { IonicStorageModule } from '@ionic/storage';
import { MygroupeComponent } from './homepage/mygroupe/mygroupe.component';
import { ProfileComponent } from './homepage/profile/profile.component';
import { UsercoverComponent } from './homepage/profile/usercover/usercover.component';
import { ProfilesliderComponent } from './homepage/profile/profileslider/profileslider.component';
import { UserfeedComponent } from './homepage/profile/userfeed/userfeed.component';
import { PhotoPopupComponent } from './homepage/photo-popup/photo-popup.component';
import { NotifComponent } from './homepage/notif/notif.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
 


@NgModule({
  declarations: [
    AppComponent,
    GroupesliderComponent , 
    NewpostComponent , 
    FeedhomeComponent, 
    GroupesingleComponent,
    HomecompComponent,
  
    HeadersideComponent , 
    CovergroupeComponent, 
    GroupefeedComponent, 
    GroupenewpostComponent, 
    GroupetabComponent,
    BodyComponent,
    MembresComponent,
    PhotoComponent,
    HeadComponent,
    EpisodehomeComponent,
    CategorieComponent,
    LatestComponent,
    MorevideoComponent,

    GroupesComponent,
    GroupecatComponent,
    GroupetabuComponent,
    LatestComponent,
    HomepageComponent,
    PopupComponent,
    CreategroupeComponent,
    LatestsComponent,
    ShopComponent,
    AboutComponent,
    MygroupeComponent,
    ProfileComponent,
    UsercoverComponent,
    ProfilesliderComponent,
    UserfeedComponent,
    PhotoPopupComponent,
    NotifComponent,
    QuestionComponent
    
  
  
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    IonicStorageModule.forRoot(),
    AngularEditorModule
    
  ],
  providers: [
    FeedhomeComponent, 
    YoutubeVideoPlayer,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataService,
    AuthGuard,
    YoutubeService,
    GroupesliderComponent,
    GroupefeedComponent,
    GroupesingleComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
