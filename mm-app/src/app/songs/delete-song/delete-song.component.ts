import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {

  songId : string= '';

  constructor(private activeRoute: ActivatedRoute, private http : HttpClient, private _snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data => { 
      this.songId = data['id'];
    });
    if(this.songId !== ''){
      this.deleteSong(this.songId);
    }
  }

  deleteSong(id:any)
  {
    this.http.delete('https://localhost:44319/api/Songs/'+ id ).subscribe(response => {
      if(response)
      {
        this._snackBar.open("Uspjesno ste dodali novu pjesmu :D");
        this.router.navigateByUrl('/songs/list');
      }
      else{
        this._snackBar.open("Greska");
      }
      }, err => {
        this._snackBar.open("Greska");
      });
  }

}
