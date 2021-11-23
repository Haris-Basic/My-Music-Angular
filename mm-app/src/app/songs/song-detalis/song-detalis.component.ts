import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-song-detalis',
  templateUrl: './song-detalis.component.html',
  styleUrls: ['./song-detalis.component.css']
})
export class SongDetalisComponent implements OnInit {

  songId;
  songsDetalis: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private http:HttpClient) { 
    this.songId = data.songId;
  }

  ngOnInit(): void {
    this.viewSong(this.songId);
  }

  viewSong(id:any): any{
    this.http.get<any>('https://localhost:44319/api/Songs/'+ id).subscribe( response => {
      this.songsDetalis = response;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  returnStar(i: number) {
    var stars : string = '';
    if (i == 0) {
      return 'star_border star_border star_border star_border star_border';
    }
    if (i <= 5) {
      for (let j = 1; j <= i; j++) {
        stars = stars + ' star';
      }
      for (let j = 0; j < (5 - i); j++) {
        stars = stars + ' star_border'
      }
      return stars;
    }
    return '';
  }
}
