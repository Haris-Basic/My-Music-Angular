import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HeaderComponent,SidebarComponent,FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [HeaderComponent,SidebarComponent,FooterComponent]
})
export class LayoutModule { }
