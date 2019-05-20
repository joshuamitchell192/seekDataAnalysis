import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from './material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TrendComponent } from './trend/trend.component';
import { HomeComponent } from './home/home.component';
import { CompareComponent } from './compare/compare.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trend', component: TrendComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'skills', component: SkillsComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    TrendComponent,
    HomeComponent,
    CompareComponent,
    SkillsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
