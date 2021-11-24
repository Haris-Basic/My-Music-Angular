import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSongsComponent } from './list-songs/list-songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';
import { MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { SongDetalisComponent } from './song-detalis/song-detalis.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    ListSongsComponent,
    AddSongComponent,
    EditSongComponent,
    DeleteSongComponent,
    SongDetalisComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule
    
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }]
})
export class SongsModule { }
