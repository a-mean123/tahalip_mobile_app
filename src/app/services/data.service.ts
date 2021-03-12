import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = 'http://5.196.13.136:3100/';
  constructor(private router: Router,private http: HttpClient) { }



  /**
   * gestion des groupes
   */

  getAllLatestGroupes(){
   return this.http.get(this.url + 'groupe/getgroupe');
  } 

  getGroupeById(id: any){
    return this.http.get(this.url + 'groupe/getgroupebyid/' + id);
  }

  getGroupeByCategorie(c: string){
    return this.http.get(this.url + 'groupe/getgroupebycategorie/' + c);
  }

  getMyGroupe(g: any){
    return this.http.post(this.url + 'groupe/getmygroupe' , g);
  }
  getMyGroupeCat(g: string , c: string){
    return this.http.post(this.url + 'groupe/getmygroupecat/' + c , g);
  }

  addGroupe(Groupe: any){
    return this.http.post<any>(this.url + 'groupe/addgroupe' , Groupe);
  }

  
 

  getlatestGroupe(){
    return this.http.get<any>(this.url + 'groupe/getlastgroupe');
   }

   
  /**
   * gstion des membres
   */

   addMembre(membre: any){

    return this.http.post(this.url + 'membre/addmembre' , membre);
   }

   updatecover(cover: any , id: any){
     return this.http.put(this.url + 'membre/updatecover/' + id , cover);
   }

   updatebio(bio: any , id: any){
    return this.http.put(this.url + 'membre/updatebio/' + id , bio);
  }

  updategroupe(gr: any , id: any){
    return this.http.put(this.url + 'membre/updategroupe/' + id , gr);
  }


   getGroupeMembre(id: any){
     return this.http.get(this.url + 'membre/getgroupemembre/' + id);
   }

    getGroupeFounder(id: any){
     return this.http.get(this.url + 'membre/getfounder/' + id);
   }
   


  /**
   * gestion des post
   */

   deletepost(id:any){
    return this.http.get(this.url + 'post/deletepost/' + id);
   }

   addNewPost(post: any){

   return this.http.post(this.url + 'post/addpost' , post);
   
  }


  getlatestPost(s: any){
    return this.http.get(this.url + 'post/getpost/' + s);
  }

  getPostByGroupeId(id: any, s: any){
    return this.http.get(this.url + 'post/getpostbygroupeid/' + id + '/' + s);
  }

  getMyPost(id: any, s: any){
    return this.http.get(this.url + 'post/getmypost/' + id + '/' + s);
  }

  getPostByCategorie(c: any, s: any){
    return this.http.get(this.url + 'post/getpostbycategorie/' + c + '/' + s);
  }


  likePost(like , id: any){
  
    return this.http.put(this.url + 'post/like/'+ id  , like);
  }


  dislikePost(like , id: any){
  
    return this.http.put(this.url + 'post/dislike/'+ id  , like);
  }

  getPostImages(id: any , s: any){
    return this.http.get(this.url + 'post/getpostimagebygroupeId/' + id + '/' + s);
  }


  /**
   * 
   * gestion des commentaires
   */

   addComment(comment: any){
     return this.http.post(this.url + 'comment/addcomment' , comment);
   }

   getCommentByPostId(id: any){
     return this.http.get(this.url + 'comment/getcommentbypostid/' + id);
   }
   deleteComment(id: any){
    return this.http.delete(this.url + 'comment/deletecomment/' + id);
  }

   likeComment(like , id: any){
   
    
    return this.http.put(this.url + 'comment/like/'+ id  , like);
  }




  
  dislikeComment(like , id: any){
   
    
    return this.http.put(this.url + 'comment/dislike/'+ id  , like);
  }

  updateTextComment(id: any, comment: any){

    return this.http.put(this.url + 'comment/updatetextcomment/' + id , comment);

  }





  /**
   * gestion des categorie
   */


  getAllCategorie(){
   return this.http.get(this.url + 'categorie/getcategorie');
  } 





  /**
   * Join manager
   */


  addJoin(join: any){

    return this.http.post(this.url + 'join/addjoin' , join);

  }



  getjoinbyusergroupe(iduser: any, idgroupe: any){

      return this.http.get(this.url + 'join/getjoinbyusergroupe/' + iduser + '/' + idgroupe);

  }

  deleteJoin(id: any){
    return this.http.delete(this.url + 'join/deletejoin/' + id);
  }



/**
 * categorie
 */

getAllcategorie(){
  return this.http.get<any>(this.url + 'categorie/getcategorie');
 }


 /**
  * notification
  */

getUserNotification(id: any){

  return this.http.get(this.url +'notification/getNotificationbyuser/' + id);
}

updateUserNotificationStatus(notif:any, id: any){

  return this.http.put(this.url +'notification/updatenotificationstatusforuser/' + id , notif);

}





/***
 * 
 * Question data
 */

 
getAllQuestion(){
  return this.http.get<any>(this.url + 'question/getquestion');
 }
 likeQuestion(like , id: any){
   
    
  return this.http.put(this.url + 'question/like/'+ id  , like);
}





dislikeQuestion(like , id: any){
 
  
  return this.http.put(this.url + 'question/dislike/'+ id  , like);
}


 /**
  * Response data
  */

 addReponse(Reponse: any){
  return this.http.post<any>(this.url + 'response/addresponse' , Reponse);
 }



 likeResponse(like , id: any){
   
    
  return this.http.put(this.url + 'response/like/'+ id  , like);
}





dislikeResponse(like , id: any){
 
  
  return this.http.put(this.url + 'response/dislike/'+ id  , like);
}

updateTextResponse(id: any, comment: any){

  return this.http.put(this.url + 'response/updatetextcomment/' + id , comment);

}

deleteResponse(id: any){
  return this.http.delete(this.url + 'response/deleteresponse/' + id);
}




  /**
   * 
   * 
   * authentication
   * 
   */

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('user');
  }

  loggedIn() {
    return !!localStorage.getItem('user');
  }


  getUserData(){
    return JSON.parse(localStorage.getItem('user'));
  }


  getUserDataWithId(id: any){
    return this.http.get(this.url + 'membre/getmembrebyid/' + id);
  }


}
