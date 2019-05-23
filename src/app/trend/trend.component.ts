import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4regression from "@amcharts/amcharts4/plugins/regression";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_material from "@amcharts/amcharts4/themes/material";
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import monthChartData from '../../assets/data/month_chart.json';
import weekOfYearData from '../../assets/data/json_weekday_chart.json';
import salaryOverTimeData from '../../assets/data/json_mean_salary_over_time_chart.json';

// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

  newTitle = 'Trend - Seek Data Analysis';
  private month_chart: am4charts.XYChart;

  constructor(private zone: NgZone, private titleService: Title, private router: Router) { }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    this.titleService.setTitle(this.newTitle)
  }

  ngAfterViewInit() {

    this.zone.runOutsideAngular(() => {

      ////////////////////////////////////////////////////////////////////////////////
      /// Month Chart
      /////////////////////////////////////////////////////////////////////////////////
      let month_chart = am4core.create("chartdiv", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();

      month_chart.data = monthChartData;

      // Create axes
      let categoryAxis = month_chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "Month";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      let valueAxis = month_chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      // Create series
      let series = month_chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "no_jobs_posts";
      series.dataFields.categoryX = "Month";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function(fill, target) {
        return month_chart.colors.getIndex(target.dataItem.index);
      });
      let title = month_chart.titles.create();
      title.text = "Posts per Month";
      title.fontSize = 25;
      title.marginBottom = 30;
      // Cursor
      month_chart.cursor = new am4charts.XYCursor();
      month_chart.cursor.behavior = "none";

      ////////////////////////////////////////////////////////////////////////////////
      /// Week of the Year Chart
      /////////////////////////////////////////////////////////////////////////////////

      let week_of_year_chart = am4core.create("weekOfYearDiv", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();

      week_of_year_chart.data = weekOfYearData;

      // Create axes
      let monthCategoryAxis = week_of_year_chart.xAxes.push(new am4charts.CategoryAxis());
      monthCategoryAxis.dataFields.category = "weekOfYear";
      monthCategoryAxis.renderer.grid.template.location = 0;
      monthCategoryAxis.renderer.minGridDistance = 30;
      monthCategoryAxis.renderer.labels.template.horizontalCenter = "right";
      monthCategoryAxis.renderer.labels.template.verticalCenter = "middle";
      monthCategoryAxis.renderer.labels.template.rotation = 270;
      monthCategoryAxis.tooltip.disabled = true;
      monthCategoryAxis.renderer.minHeight = 110;

      let monthValueAxis = week_of_year_chart.yAxes.push(new am4charts.ValueAxis());
      monthValueAxis.renderer.minWidth = 50;

      // Create series
      let monthSeries = week_of_year_chart.series.push(new am4charts.ColumnSeries());
      monthSeries.sequencedInterpolation = true;
      monthSeries.dataFields.valueY = "job_advertisement_count";
      monthSeries.dataFields.categoryX = "weekOfYear";
      // series.columns.template.propertyFields.fill = "month";
      monthSeries.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      monthSeries.columns.template.strokeWidth = 0;

      monthSeries.tooltip.pointerOrientation = "vertical";

      monthSeries.columns.template.column.cornerRadiusTopLeft = 10;
      monthSeries.columns.template.column.cornerRadiusTopRight = 10;
      monthSeries.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let monthHoverState = series.columns.template.column.states.create("hover");
      monthHoverState.properties.cornerRadiusTopLeft = 0;
      monthHoverState.properties.cornerRadiusTopRight = 0;
      monthHoverState.properties.fillOpacity = 1;

      monthSeries.columns.template.adapter.add("fill", function(fill, target) {
        return month_chart.colors.getIndex(target.dataItem.index);
      });
      let week_of_year_title = week_of_year_chart.titles.create();
      week_of_year_title.text = "Weeks of the Year";
      week_of_year_title.fontSize = 25;
      week_of_year_title.marginBottom = 30;
      // Cursor
      month_chart.cursor = new am4charts.XYCursor();
      month_chart.cursor.behavior = "none";

      ////////////////////////////////////////////////////////////////////////////////
      /// Salary Over Time Chart
      /////////////////////////////////////////////////////////////////////////////////

      let salary_over_time_chart = am4core.create("salaryOverTimeDiv", am4charts.XYChart);
      salary_over_time_chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      salary_over_time_chart.data = salaryOverTimeData;

      salary_over_time_chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

      // Create axes
      let dateAxis = salary_over_time_chart.xAxes.push(new am4charts.DateAxis());
      let salaryOverTimeValueAxis = salary_over_time_chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      let salaryOverTimeSeries = salary_over_time_chart.series.push(new am4charts.LineSeries());
      salaryOverTimeSeries.dataFields.valueY = "job_advertisement_count";
      salaryOverTimeSeries.dataFields.dateX = "date";
      salaryOverTimeSeries.tooltipText = "{value}"
      salaryOverTimeSeries.strokeWidth = 2;
      salaryOverTimeSeries.minBulletDistance = 15;

      // Drop-shaped tooltips
      salaryOverTimeSeries.tooltip.background.cornerRadius = 20;
      salaryOverTimeSeries.tooltip.background.strokeOpacity = 0;
      salaryOverTimeSeries.tooltip.pointerOrientation = "vertical";
      salaryOverTimeSeries.tooltip.label.minWidth = 40;
      salaryOverTimeSeries.tooltip.label.minHeight = 40;
      salaryOverTimeSeries.tooltip.label.textAlign = "middle";
      salaryOverTimeSeries.tooltip.label.textValign = "middle";

      // Make bullets grow on hover
      let bullet = salaryOverTimeSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");

      let bullethover = bullet.states.create("hover");
      bullethover.properties.scale = 1.3;

      // Make a panning cursor
      salary_over_time_chart.cursor = new am4charts.XYCursor();
      salary_over_time_chart.cursor.behavior = "panXY";
      salary_over_time_chart.cursor.xAxis = dateAxis;
      salary_over_time_chart.cursor.snapToSeries = series;

      // // Create vertical scrollbar and place it before the value axis
      // salary_over_time_chart.scrollbarY = new am4core.Scrollbar();
      // salary_over_time_chart.scrollbarY.parent = salary_over_time_chart.leftAxesContainer;
      // salary_over_time_chart.scrollbarY.toBack();

      // Create a horizontal scrollbar with previe and place it underneath the date axis
      salary_over_time_chart.scrollbarX = new am4charts.XYChartScrollbar();
      // salary_over_time_chart.scrollbarX.series.push(salaryOverTimeSeries);
      salary_over_time_chart.scrollbarX.parent = salary_over_time_chart.bottomAxesContainer;

      let regseries = salary_over_time_chart.series.push(new am4charts.LineSeries());
      regseries.dataFields.valueY = "job_advertisement_count";
      regseries.dataFields.dateX = "date";

      let reg = regseries.plugins.push(new am4regression.Regression());
      reg.method = "polynomial";

      salary_over_time_chart.events.on("ready", function () {
        dateAxis.zoom({start:0, end:1});

      let salary_over_time_title = salary_over_time_chart.titles.create();
      salary_over_time_title.text = "General Salary Over Time";
      salary_over_time_title.fontSize = 25;
      salary_over_time_title.marginBottom = 30;
      });
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.month_chart) {
        this.month_chart.dispose();
      }
    });
  }

}
