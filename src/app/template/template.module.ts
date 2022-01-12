import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class TemplateModule { }
