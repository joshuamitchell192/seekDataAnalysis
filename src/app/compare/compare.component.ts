import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import { Title } from '@angular/platform-browser';

import marketShareData from '../../assets/data/marketshare_pie_chart.json';
import stackBarData from '../../assets/data/stacked_column.json';
import marketShareCitiesData from '../../assets/data/marketshare_cities_pie_chart.json';


// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  newTitle = 'Compare - Seek Data Analysis';

  constructor(private titleService: Title) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }


  ngOnInit() {
    this.titleService.setTitle(this.newTitle)
  }



  ngAfterViewInit() {

    ////////////////////////////////////////////////////////////////////////////////
    /// Market Share Pie Chart
    /////////////////////////////////////////////////////////////////////////////////

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

    let marketShareTitle = marketSharePieChart.titles.create();
    marketShareTitle.text = "Market Share Between Sectors";
    marketShareTitle.fontSize = 30;
    marketShareTitle.marginBottom = 30;

    ////////////////////////////////////////////////////////////////////////////////
    /// Stacked Bar Chart
    /////////////////////////////////////////////////////////////////////////////////

    let stacked_bar_chart = am4core.create("stackedBarDiv", am4charts.XYChart);

    stacked_bar_chart.data = stackBarData;

    let categoryAxis = stacked_bar_chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "sector";
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = stacked_bar_chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    function createSeries(field, name) {

      // Set up series
      let series = stacked_bar_chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "sector";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(75);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";



      return series;
    }

    createSeries("0 - 60", "0 - 60")
    createSeries("0 - 70", "0 - 70")
    createSeries("0 - 80", "0 - 80")
    createSeries("0 - 100", "0 - 100")
    createSeries("0 - 120", "0 - 120")
    createSeries("0 - 150", "0 - 150")
    createSeries("0 - 200", "0 - 200")
    createSeries("50 - 200", "50 - 200")
    createSeries("0 - 999", "0 - 999")
    createSeries("40 - 999", "40 - 999")
    let title = stacked_bar_chart.titles.create();
    title.text = "Stacked Bar Chart";
    title.fontSize = 50;
    title.marginBottom = 30;
    stacked_bar_chart.legend = new am4charts.Legend();



    ////////////////////////////////////////////////////////////////////////////////
    /// Market Share Cities Pie Chart
    /////////////////////////////////////////////////////////////////////////////////

    let marketShareCitiesPieChart = am4core.create('marketShareCitiesDiv', am4charts.PieChart);
    marketShareCitiesPieChart.data = marketShareCitiesData;
    let marketShareCitiesPieSeries = marketShareCitiesPieChart.series.push(new am4charts.PieSeries());
    marketShareCitiesPieSeries.dataFields.value = "job_advertisement_count";
    marketShareCitiesPieSeries.dataFields.category = "city";
    marketShareCitiesPieSeries.slices.template.stroke = am4core.color("#fff");
    marketShareCitiesPieSeries.slices.template.strokeWidth = 2;
    marketShareCitiesPieSeries.slices.template.strokeOpacity = 1;
    marketShareCitiesPieSeries.hiddenState.properties.opacity = 1;
    marketShareCitiesPieSeries.hiddenState.properties.endAngle = -90;
    marketShareCitiesPieSeries.hiddenState.properties.startAngle = -90;
    marketShareCitiesPieSeries.labels.template.disabled = true;

    let marketShareCitiesPieTitle = marketShareCitiesPieChart.titles.create();
    marketShareCitiesPieTitle.text = "Market Share Between Cities";
    marketShareCitiesPieTitle.fontSize = 30;
    marketShareCitiesPieTitle.marginBottom = 30;

 }




}
