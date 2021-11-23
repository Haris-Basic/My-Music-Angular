import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

  songId: string = '';
  songsDetalis: any;
  editFormDetalis : FormGroup = new FormGroup({});
  loaded : boolean = false;

  categoryes: any;
  selectedCat: number = 0;

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient
    ,private builder:FormBuilder, private _snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {

    this.loaded = false; // provjerava da li su ucitani podaci u formu na html, ukoliko nisu, imat cemo error

    this.activeRoute.params.subscribe(data=>{
      this.songId =data['id'];
    });

    if(this.songId !== '')
    {
      this.viewSong(this.songId);
    }
    this.getCategorie();
  }

  viewSong(id:any): any {
    this.http.get<any>('https://localhost:44319/api/Songs/'+ id).toPromise().then(data => {
      
    this.songsDetalis = data;
     
    this.editFormDetalis = this.builder.group(
        {
        'songName' : new FormControl(this.songsDetalis.songName, [Validators.required]),
        'artistName' : new FormControl(this.songsDetalis.artistName, [Validators.required]),
        'songUrl' : new FormControl(this.songsDetalis.songUrl, [Validators.required]),
        'editDate' : new FormControl(new Date()),
        'categoryId' : new FormControl(this.songsDetalis.categoryId, [Validators.required])
      });
      this.loaded = true;
    }).catch(err => { console.log(err); });
  }

  save(){
    this.http.put<any>('https://localhost:44319/api/Songs/'+ this.songId,this.editFormDetalis.value).subscribe(() =>{
      this._snackBar.open("Uspjesno editovanje");
      this.router.navigateByUrl('/songs/list');
    }, err => {
      this._snackBar.open("Greska");
    });
  }

  getCategorie() {
    this.http.get('https://localhost:44319/api/Category').subscribe(data => {
      this.categoryes = data;
    }, err => {
      console.log(err);
    })
  }

  changeClient(value) {
    this.selectedCat = value;
  }

}
