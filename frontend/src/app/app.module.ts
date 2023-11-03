import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ButtonComponent } from './component/button/button.component';
import { BannerComponent } from './component/banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionComponent } from './component/accordion/accordion.component';
import { BlocksComponent } from './component/blocks/blocks.component';
import { MainComponent } from './component/main/main.component';
import { LaboratoriesComponent } from './component/laboratories/laboratories.component';
import { FormComponent } from './component/form/form.component';
import { SoftwareListComponent } from './component/software-list/software-list.component';
import { TableComponent } from './component/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ButtonComponent,
    BannerComponent,
    AccordionComponent,
    BlocksComponent,
    MainComponent,
    LaboratoriesComponent,
    FormComponent,
    SoftwareListComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
