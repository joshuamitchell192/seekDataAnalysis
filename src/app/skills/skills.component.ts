import { Component, OnInit, NgZone } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";

import main_word_cloud from '../../assets/data/wordcloud_all_sectors.json';
import word_cloud from '../../assets/data/wordcloud_complete.json';

console.log(word_cloud);

// am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);


export interface User {
  name: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {



  selected_class : string = '';
  data: any;
  // word_cloud_dict : {[options : string]:[{word: string; frequency: number;}]} = {};




  // Select Class Form ////////////////////////
  select_class = new FormControl();
  options: string[] = [
    'retail consumer products', 'call centre customer service', 'hospitality tourism', 'banking financial services', 'manufacturing transport logistics', 'sales', 'administration office support', 'trades services', 'accounting', 'real estate property', 'healthcare medical', 'marketing communications', 'government defence', 'information communication technology', 'education training', 'community services development', 'mining resources energy', 'human resources recruitment', 'insurance superannuation', 'engineering', 'ceo general management', 'design architecture', 'legal', 'construction', 'sport recreation', 'science technology', 'advertising arts media', 'farming animals conservation', 'self employment', 'consulting strategy'
  ];
  filteredOptions: Observable<string[]>;
  //////////////////////////////////////////////////
  // foreach

  ngOnInit() {
    this.filteredOptions = this.select_class.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  constructor() { }

  ngAfterViewInit() {

    ////////////////////////////////////////////////////////////////////////////////
    /// Main Word Cloud
    /////////////////////////////////////////////////////////////////////////////////
    let main_word_cloud_chart = am4core.create("main_word_cloud_div", am4plugins_wordCloud.WordCloud);
    let series = main_word_cloud_chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = main_word_cloud;

    series.dataFields.word = "word";
    series.dataFields.value = "frequency";
    series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";


    ////////////////////////////////////////////////////////////////////////////////
    /// Selective Word Cloud
    /////////////////////////////////////////////////////////////////////////////////


  }
  onEnter(event: any) {

    this.selected_class = String(event.target.value);
    console.log(this.selected_class);
    // console.log(word_cloud);

    // console.log(word_cloud[0]);


    let word_cloud_chart = am4core.create("word_cloud_div", am4plugins_wordCloud.WordCloud);
    let series = word_cloud_chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    switch (this.selected_class) {
      case 'trades services': series.data = word_cloud[0]['trades services'];
        break;
      case 'banking financial services': series.data = word_cloud[1]['banking financial services'];
        break;
      case 'education training' : series.data = word_cloud[2]['education training'];
        break;
      case 'engineering' : series.data = word_cloud[3]['engineering'];
        break;
      case 'information communication technology' : series.data = word_cloud[4]['information communication technology'];
        break;
      case 'government defence' : series.data = word_cloud[5]['government defence'];
        break;
      case 'marketing communications' : series.data = word_cloud[6]['marketing communications'];
        break;
      case 'ceo general management' : series.data = word_cloud[7]['ceo general management'];
        break;
      case 'human resources recruitment' : series.data = word_cloud[8]['human resources recruitment'];
        break;
      case 'accounting' : series.data = word_cloud[9]['accounting'];
        break;
      case 'design architecture' : series.data = word_cloud[10]['design architecture'];
        break;
      case 'manufacturing transport logistics' : series.data = word_cloud[11]['manufacturing transport logistics'];
        break;
      case 'legal' : series.data = word_cloud[12]['legal'];
        break;
      case 'real estate property' : series.data = word_cloud[13]['real estate property'];
        break;
      case 'healthcare medical' : series.data = word_cloud[14]['healthcare medical'];
        break;
      case 'hospitality tourism' : series.data = word_cloud[15]['hospitality tourism'];
        break;
      case 'construction' : series.data = word_cloud[16]['construction'];
      break;
      case 'sport recreation' : series.data = word_cloud[17]['sport recreation'];
      break;
      case 'sales' : series.data = word_cloud[18]['sales'];
      break;
      case 'retail consumer products' : series.data = word_cloud[19]['retail consumer products'];
      break;
      case 'call centre customer service' : series.data = word_cloud[20]['call centre customer service'];
      break;
      case 'mining resources energy' : series.data = word_cloud[21]['mining resources energy'];
      break;
      case 'administration office support' : series.data = word_cloud[22]['administration office support'];
      break;
      case 'science technology' : series.data = word_cloud[23]['science technology'];
      break;
      case 'advertising arts media' : series.data = word_cloud[24]['advertising arts media'];
      break;
      case 'insurance superannuation' : series.data = word_cloud[25]['insurance superannuation'];
      break;
      case 'community services development' : series.data = word_cloud[26]['lecommunity services developmentgal'];
      break;
      case 'farming animals conservation' : series.data = word_cloud[27]['farming animals conservation'];
      break;
      case 'self employment' : series.data = word_cloud[28]['self employment'];
      break;
      case 'consulting strategy' : series.data = word_cloud[29]['consulting strategy'];
      break;

      default: series.data = [{"word" : "Enter a Job Sector", "frequency" : 200}]
    }
    // console.log(this.data);
    console.log('Logging series data');
    console.log(series.data);
    // series.data = word_cloud[this.selected_class];

    series.dataFields.word = "word";
    series.dataFields.value = "frequency";
    // series.labels.template.fill = am4core.color("#9F6BA0");
    // series.labels.template.propertyFields.fill = "color";
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {};
    series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";
  }

}
