import { Component, OnInit } from '@angular/core';


import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-episodehome',
  templateUrl: './episodehome.component.html',
  styleUrls: ['./episodehome.component.scss'],
})
export class EpisodehomeComponent implements OnInit {
  videos: any;
  videosall: any;

  result: any;
  constructor( private youTubeService: YoutubeService) { }

  ngOnInit() {

   
    this.youTubeService
    .getVideosForChanel('UCuLxvZzGeoJYATCMr97dJZQ', 7)
   
    .subscribe(res => {
        this.result = res;
        this.videos = this.result.items;
        console.log(this.videos);
        
      
    });

    this.youTubeService
    .getVideosForChanel('UCuLxvZzGeoJYATCMr97dJZQ', 25)
   
    .subscribe(res => {
        this.result = res;
        this.videosall = this.result.items;
        console.log(this.videos);
        
      
    });
    }
}
