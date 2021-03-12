
import { Component , ElementRef, OnInit} from '@angular/core';
import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
 
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

registerWebPlugin(FacebookLogin);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  fbLogin: FacebookLoginPlugin;
  user = null;
  token = null;
 
  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private _router: Router,
    private _data: DataService) {
    this.setupFbLogin();
  }


  membre = {

    name:'',
    image:'',
    idFacebook:'',
    bio:''


  }
 

  ngOnInit(){

  }


  ngOndestroy() {
    this.elementRef.nativeElement.remove();
  }

  async setupFbLogin() {
    if (isPlatform('desktop')) {
      this.fbLogin = FacebookLogin;
    } else {
      // Use the native implementation inside a real app!
      const { FacebookLogin } = Plugins;
      this.fbLogin = FacebookLogin;
    } 
  }

  


  async login() {
    const FACEBOOK_PERMISSIONS =['email', 'user_birthday', 'user_photos', 'user_gender' ];
    const result = await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    console.log("ffffffffffff", result);
    if (result.accessToken && result.accessToken.userId) {
      this.token = result.accessToken;
      console.log(this.token);
      
      this.loadUserData();
    } else if (result.accessToken && !result.accessToken.userId) {
      // Web only gets the token but not the user ID
      // Directly call get token to retrieve it now
      this.getCurrentToken();
    } else {
      // Login failed
    }
  }
 
  async getCurrentToken() {    
    const result = await this.fbLogin.getCurrentAccessToken();
 
    if (result.accessToken) {
      this.token = result.accessToken;
      this.loadUserData();
    } else {
      // Not logged in.
    }
  }
 
  async loadUserData() {
    
    localStorage.clear();
    localStorage.removeItem('user');
    const url = `https://graph.facebook.com/me?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
    this.http.get(url).subscribe(res => {
      this.user = res;
      console.log('ahaya',this.user);
      
      localStorage.clear();
      localStorage.removeItem('user');
      this.membre.idFacebook = this.user.id;
      this.membre.name = this.user.name;
      this.membre.image = this.user.picture.data.url;
      this.membre.bio = 'معا من أجل مجتمع أفضل';
      this._data.addMembre(this.membre).subscribe(
        res=>{
        localStorage.clear();
        localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));
          this._router.navigate(['/home']);
          console.log(res);
        },
        err=>{
          this._router.navigate(['/home']);
        }
      );
     
      
    });
  }
 
  async logout() {
    await this.fbLogin.logout();
    this.user = null;
    this.token = null;
  }


}
