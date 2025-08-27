import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { ChartDemosModule } from './chart-demos/chart-demos.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SidebarModule,
    ChartDemosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
