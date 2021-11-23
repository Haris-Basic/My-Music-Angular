import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { SongsModule } from './songs/songs.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    LayoutModule,
    SongsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: []
      }
    })
  
  ],
  providers: [AuthGuard,{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
