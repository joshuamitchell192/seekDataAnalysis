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
// import * as word_cloud from '../../assets/data/json/';

// console.log(word_cloud)

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
  word_cloud_dict : {[options : string]:[{word: string; frequency: number;}]} = {};

  


  // Select Class Form ////////////////////////
  select_class = new FormControl();
  options: string[] = [
    'retail  consumer products', 'call centre  customer service', 'hospitality  tourism', 'banking  financial services', 'manufacturing transport  logistics', 'sales', 'administration  office support', 'trades  services', 'accounting', 'real estate  property', 'healthcare  medical', 'marketing  communications', 'government  defence', 'information  communication technology', 'education  training', 'community services  development', 'mining resources  energy', 'human resources  recruitment', 'insurance  superannuation', 'engineering', 'ceo  general management', 'design  architecture', 'legal', 'construction', 'sport  recreation', 'science  technology', 'advertising arts  media', 'farming animals  conservation', 'self employment', 'consulting  strategy'
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
    
    this.selected_class = event.target.value;
    console.log(this.selected_class);
    
    let word_cloud_chart = am4core.create("word_cloud_div", am4plugins_wordCloud.WordCloud);
    let series = word_cloud_chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.data = main_word_cloud;

    series.dataFields.word = "word";
    series.dataFields.value = "frequency";
    // series.labels.template.fill = am4core.color("#9F6BA0");
    // series.labels.template.propertyFields.fill = "color";
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {};
    series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";
  }

}
