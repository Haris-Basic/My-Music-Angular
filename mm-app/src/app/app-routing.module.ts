import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login.component';
import { AddSongComponent } from './songs/add-song/add-song.component';
import { DeleteSongComponent } from './songs/delete-song/delete-song.component';
import { EditSongComponent } from './songs/edit-song/edit-song.component';
import { ListSongsComponent } from './songs/list-songs/list-songs.component';

const routes: Routes = [
  
  { path: 'songs',
      children: [
        { path: '', component:ListSongsComponent },
        { path: 'list', component:ListSongsComponent },
        { path: 'create', component:AddSongComponent },
        { path: 'delete/:id', component:DeleteSongComponent },
        { path: 'edit/:id', component:EditSongComponent },
      ], canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
