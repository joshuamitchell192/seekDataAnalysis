import { Component, NgZone, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

import { Title } from '@angular/platform-browser';

// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newTitle = 'Home - Seek Data Analysis';

  // private chart: am4charts.XYChart;
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone, private titleService: Title) {}


  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }


  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  ngOnInit() {
    this.titleService.setTitle(this.newTitle);
  }

  ngAfterViewInit() {
  }

}
