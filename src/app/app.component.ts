import { Component, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";


// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bigData';

  // private chart: am4charts.XYChart;
  // private chart: am4charts.XYChart;

  // constructor(private zone: NgZone) {}

  // scrollToElement($element): void {
  //   console.log($element);
  //   $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // }

  // ngAfterViewInit() {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   // this.zone.runOutsideAngular(() => {
  //   //   let chart = am4core.create("chartdiv", am4charts.XYChart);

  //   //   chart.paddingRight = 20;

  //   //   let data = [];

  //   //   let visits = 10;

  //   //   for (let i = 1; i < 366; i++) {
  //   //     visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  //   //     data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
  //   //   }

  //   //   chart.data = data;

  //   //   let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  //   //   dateAxis.renderer.grid.template.location = 0;

  //   //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   //   valueAxis.tooltip.disabled = true;
  //   //   valueAxis.renderer.minWidth = 35;

  //   //   let series = chart.series.push(new am4charts.LineSeries());
  //   //   series.dataFields.dateX = "date";
  //   //   series.dataFields.valueY = "value";

  //   //   series.tooltipText = "{valueY.value}";
  //   //   chart.cursor = new am4charts.XYCursor();

  //   //   let scrollbarX = new am4charts.XYChartScrollbar();
  //   //   scrollbarX.series.push(series);
  //   //   chart.scrollbarX = scrollbarX;

  //   //   this.chart = chart;
  //   // });

  //   this.zone.runOutsideAngular(() =>{

  //     let chart = am4core.create("chartdiv", am4charts.XYChart);
  //     // chart.scrollbarX = new am4core.Scrollbar();

  //     // Add data
  //     chart.data = [{
  //       'Month' : 'October',
  //       'no_jobs_posts' : 113782
  //     }, {
  //       'Month' : 'November',
  //       'no_jobs_posts' : 40988
  //     }, {
  //       'Month' : 'December',
  //       'no_jobs_posts' : 71626
  //     }, {
  //       'Month' : 'January',
  //       'no_jobs_posts' : 69676
  //     }, {
  //       'Month' : 'February',
  //       'no_jobs_posts' : 22003
  //     }, {
  //       'Month' : 'March',
  //       'no_jobs_posts' : 402
  //     }];

  //     // Create axes
  //     let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  //     categoryAxis.dataFields.category = "Month";
  //     categoryAxis.renderer.grid.template.location = 0;
  //     categoryAxis.renderer.minGridDistance = 30;
  //     categoryAxis.renderer.labels.template.horizontalCenter = "right";
  //     categoryAxis.renderer.labels.template.verticalCenter = "middle";
  //     categoryAxis.renderer.labels.template.rotation = 270;
  //     categoryAxis.tooltip.disabled = true;
  //     categoryAxis.renderer.minHeight = 110;

  //     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //     valueAxis.renderer.minWidth = 50;

  //     // Create series
  //     let series = chart.series.push(new am4charts.ColumnSeries());
  //     series.sequencedInterpolation = true;
  //     series.dataFields.valueY = "no_jobs_posts";
  //     series.dataFields.categoryX = "Month";
  //     series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
  //     series.columns.template.strokeWidth = 0;

  //     series.tooltip.pointerOrientation = "vertical";

  //     series.columns.template.column.cornerRadiusTopLeft = 10;
  //     series.columns.template.column.cornerRadiusTopRight = 10;
  //     series.columns.template.column.fillOpacity = 0.8;

  //     // on hover, make corner radiuses bigger
  //     let hoverState = series.columns.template.column.states.create("hover");
  //     hoverState.properties.cornerRadiusTopLeft = 0;
  //     hoverState.properties.cornerRadiusTopRight = 0;
  //     hoverState.properties.fillOpacity = 1;

  //     series.columns.template.adapter.add("fill", function(fill, target) {
  //       return chart.colors.getIndex(target.dataItem.index);
  //     });
  //     let title = chart.titles.create();
  //     title.text = "Posts per Month";
  //     title.fontSize = 25;
  //     title.marginBottom = 30;
  //     // Cursor
  //     chart.cursor = new am4charts.XYCursor();
  //     chart.cursor.behavior = "none";
  //   });
  // }

  // ngOnDestroy() {
  //   this.zone.runOutsideAngular(() => {
  //     if (this.chart) {
  //       this.chart.dispose();
  //     }
  //   });
  // }
}
