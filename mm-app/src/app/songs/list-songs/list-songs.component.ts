import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SongDetalisComponent } from '../song-detalis/song-detalis.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
  styleUrls: ['./list-songs.component.css']
})

export class ListSongsComponent implements OnInit {

  displayedColumns: string[] = ['songName', 'artistName', 'songUrl', 'category', 'rate', 'favorite', 'details', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  stars: string = '';
  clickCounter = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>('https://localhost:44319/api/Songs').subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }

  openDialog(ID: any) {
    this.dialog.open(SongDetalisComponent, {
      data: {
        songId: ID
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toFavorite(request: any) {

    var val: any =
    {
      "songName": request.songName,
      "artistName": request.artistName,
      "songUrl": request.songUrl,
      "rate": request.rate,
      "favorite": !request.favorite,
      "entryDate": request.entryDate,
      "editDate": request.editDate,
      "categoryId": request.categoryId
    }
    this.http.put<any>('https://localhost:44319/api/Songs/' + request.songsId, val).subscribe(() => {
      this.refreshList();
    }, err => {
      console.log(err);
    });
  }

  returnStar(i: number) {
    this.stars = '';
    this.clickCounter += 1;

    if (i == 0) {
      return 'star_border star_border star_border star_border star_border';
    }
    if (i <= 5) {
      for (let j = 1; j <= i; j++) {
        this.stars = this.stars + ' star';
      }
      for (let j = 0; j < (5 - i); j++) {
        this.stars = this.stars + ' star_border'
      }
      return this.stars;
    }
    return '';
  }

  onClick(request) {
    var val: any;
    if (request.rate < 5) {
      val =
      {
        "songName": request.songName,
        "artistName": request.artistName,
        "songUrl": request.songUrl,
        "rate": request.rate + 1,
        "favorite": request.favorite,
        "entryDate": request.entryDate,
        "editDate": request.editDate,
        "categoryId": request.categoryId
      }
    } else {
      val =
      {
        "songName": request.songName,
        "artistName": request.artistName,
        "songUrl": request.songUrl,
        "rate": 0,
        "favorite": request.favorite,
        "entryDate": request.entryDate,
        "editDate": request.editDate,
        "categoryId": request.categoryId
      }
    }
    this.http.put<any>('https://localhost:44319/api/Songs/' + request.songsId, val).subscribe(() => {
      this.refreshList();
    }, err => {
      console.log(err);
    });

  }
}