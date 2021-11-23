import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  addSongForm: FormGroup = new FormGroup({});
  categoryes: any;
  selectedCat: number = 0;

  constructor(private builder: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.addSongForm = this.builder.group({
      'songName': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'artistName': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'songUrl': new FormControl('', [Validators.required]),
      'rate': new FormControl(0),
      'entryDate': new FormControl(new Date()),
      'editDate': new FormControl(new Date()),
      'categoryId': new FormControl(this.selectedCat)
    });
    this.getCategorie();
  }

  createRequest() {
    this.addSongForm.value.categoryId = this.selectedCat;

    this.http.post('https://localhost:44319/api/Songs', this.addSongForm.value).subscribe(response => {
      this._snackBar.open("Uspjesno ste dodali novu pjesmu :D");
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
