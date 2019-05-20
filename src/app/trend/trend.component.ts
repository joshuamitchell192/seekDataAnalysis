import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";


// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css']
})
export class TrendComponent implements OnInit {

  private month_chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.zone.runOutsideAngular(() => {

      let month_chart = am4core.create("chartdiv", am4charts.XYChart);
      // chart.scrollbarX = new am4core.Scrollbar();



      ////////////////////////////////////////////////////////////////////////////////
      /// Month Chart
      /////////////////////////////////////////////////////////////////////////////////
      // Add data
      month_chart.data = [{
        'Month' : 'October',
        'no_jobs_posts' : 113782
      }, {
        'Month' : 'November',
        'no_jobs_posts' : 40988
      }, {
        'Month' : 'December',
        'no_jobs_posts' : 71626
      }, {
        'Month' : 'January',
        'no_jobs_posts' : 69676
      }, {
        'Month' : 'February',
        'no_jobs_posts' : 22003
      }, {
        'Month' : 'March',
        'no_jobs_posts' : 402
      }];

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
      ///
      /////////////////////////////////////////////////////////////////////////////////





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
