import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(public http: HttpClient) { }

  apiKey : string = 'AIzaSyBSGIafiCQAo_K2V9RRMINf14nOkcPeMyQ';



  getVideosForChanel(channel, maxResults): Observable<Object> {
  let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
  return this.http.get(url);

}

}
