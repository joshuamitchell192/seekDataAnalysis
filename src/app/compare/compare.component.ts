import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";

import marketShareData from '../../assets/data/marketshare_pie_chart.json';


// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    let marketSharePieChart = am4core.create('marketShareDiv', am4charts.PieChart);
    marketSharePieChart.data = marketShareData;
    let pieSeries = marketSharePieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "job_advertisement_count";
    pieSeries.dataFields.category = "sector";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    pieSeries.labels.template.disabled = true;
 }

}
