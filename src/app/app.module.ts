import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
        MatButtonModule,
        MatCheckboxModule
      } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
