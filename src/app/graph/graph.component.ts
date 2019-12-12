import { Component, OnInit } from '@angular/core';
//import { Chart } from 'chart.js';
import {BillService} from '../services/bill.service';
import {Bill, Currency, graphResponse} from '../model';
import * as FusionCharts from 'fusioncharts';
import {SettingsService} from '../services/settings.service';
import {languages, translateFunction} from '../translations/translations';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  /*chart = []

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',

      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
        datasets: [
          {
            data: [100, 2, 18, 200, 1, 19, 15, 200, 1200, 90, 10, 80, 10, 2, 30, 14, 19, 22, 18, 25, 50, 20, 10, 0, 0, 19, 34, 28, 300, 600, 21, 10],
            borderColor: '#3cba9f',
            fill: false,
            label: 'Currently'
          },
          {
            data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
              1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
              1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
            borderColor: '#8B0000',
            fill: false,
            label: 'Average'
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1500,
                }
            }]
        },
        /!*scale: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }*!/
      }
    });
  }*/


  //Trial version

  dataSource: any;
  type: string;
  width: string;
  height: string;
  error_message = '';
  bills: graphResponse;
  //monthly_limit = 0;
  currencies$: Currency[];
  currencyId = 0;
  lang = '';
  langCode = '';
  languages = languages;
  pieFormat = 'json';
  typePie = 'pie2d';
  dateFrom = '';
  dateTo = '';
  dateFromRequest = '';
  dateToRequest = '';
  dataCostCategoryPie = [];
  dataProfitCategoryPie = [];
  dataCostSubCategoryPie = [];
  dataProfitSubCategoryPie = [];
  pieDataCategoryCost = {
  chart: {
    caption: this._translation('Categories (costs)', localStorage.getItem('lang')),
    plottooltext: '<b>$percentValue</b> ' + this._translation('of category', localStorage.getItem('lang')) + ' $label<br> ($Value)',
    showlegend: '1',
    showpercentvalues: '1',
    legendposition: 'bottom',
    usedataplotcolorforlabels: '1',
    theme: 'fusion'
  },
  data: []
};
  pieDataCategoryProfit = {
  chart: {
    caption: this._translation('Categories (profits)', localStorage.getItem('lang')),
    plottooltext: '<b>$percentValue</b> ' + this._translation('of category', localStorage.getItem('lang')) + ' $label<br> ($Value)',
    showlegend: '1',
    showpercentvalues: '1',
    legendposition: 'bottom',
    usedataplotcolorforlabels: '1',
    theme: 'fusion'
  },
  data: []
};
  pieDataSubCategoryCost = {
  chart: {
    caption: this._translation('Sub categories (costs)', localStorage.getItem('lang')),
    plottooltext: '<b>$percentValue</b> ' + this._translation('of sub category', localStorage.getItem('lang')) + ' $label<br> ($Value)',
    showlegend: '1',
    showpercentvalues: '1',
    legendposition: 'bottom',
    usedataplotcolorforlabels: '1',
    theme: 'fusion'
  },
  data: []
};
  pieDataSubCategoryProfit = {
  chart: {
    caption: this._translation('Sub categories (profits)', localStorage.getItem('lang')),
    plottooltext: '<b>$percentValue</b> ' + this._translation('of sub category', localStorage.getItem('lang')) + ' $label<br> ($Value)',
    sshowlegend: '1',
    showpercentvalues: '1',
    legendposition: 'bottom',
    usedataplotcolorforlabels: '1',
    theme: 'fusion'
  },
  data: []
};

  constructor(public billService: BillService, public settingsService: SettingsService, private spinner: NgxSpinnerService) {

    /*this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      caption: {
        text: 'Bills Analysis'
      },
      subcaption: {
        text: 'Profit & Cost'
      },
      series: 'Type',
      yAxis: [
        {
          plot: 'Bills price',
          title: 'Bills price',
          format: {
            prefix: '$'
          }
          referenceLine: [
            {
              label: 'Cost monthly limit',
              value: '3800'
            }
          ]
        }
      ]
    };*/
    //this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    let data = []
    if (this.bills.bills) {
      data = this.bills.bills;
    }
    const schema = [
  {
    'name': 'Time',
    'type': 'date',
    'format': '%d-%b-%y'
  },
  {
    'name': 'Type',
    'type': 'string'
  },
  {
    'name': this._translation('Bills price', localStorage.getItem('lang')),
    'type': 'number'
  }
]
    if (data !== undefined) {
      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      this.dataSource.data = fusionTable;
    }

  }

  ngOnInit() {
    this.spinner.show();
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'en');
      this.langCode = localStorage.getItem('lang');
      this.changeLangByCode(this.langCode);

    }
    else {
      this.langCode = localStorage.getItem('lang');
      this.changeLangByCode(this.langCode);
    }
    this.changeLang(undefined, this.langCode);
    let currencies = (searchValues: string) => this.settingsService.getCurrencies(true, '');
    currencies('').subscribe((data:any) => {
      this.currencies$ = data.currencies;
      this.spinner.hide();
    }, (data:any) => {
      this.error_message = data.error.message;
      this.spinner.hide();
    });
    //this.fetchData(this.bills);
  }

  getGraph(currencyId: number, dateFrom: string, dateTo: string) {
    this.spinner.show();
    this.billService.getGraph(true, true, currencyId, dateFrom, dateTo).subscribe((data: graphResponse) => {
      this.bills = data;
      this.pieDataCategoryCost.data = data.bill_categories_list_cost;
      this.dataCostCategoryPie = data.bill_categories_list_cost;
      this.pieDataCategoryProfit.data = data.bill_categories_list_profit;
      this.dataProfitCategoryPie = data.bill_categories_list_profit;
      this.pieDataSubCategoryCost.data = data.bill_sub_categories_list_cost;
      this.dataCostSubCategoryPie = data.bill_sub_categories_list_cost;
      this.pieDataSubCategoryProfit.data = data.bill_sub_categories_list_profit;
      this.dataProfitSubCategoryPie = data.bill_sub_categories_list_profit;
      //this.monthly_limit = this.bills.monthly_limit
      this.spinner.hide();
      this.graph();
      },
      (data: any) => {
        this.error_message = data.error.message;
        this.spinner.hide();
      });
  }

  graph() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: [],
      caption: {
        text: this._translation('Bills Analysis', this.langCode)
      },
      subcaption: {
        text: this._translation('Profit & Cost', this.langCode)
      },
      series: 'Type',
      theme: 'candy',
      yAxis: [
        {
          plot: this._translation('Bills price', this.langCode),
          title: this._translation('Bills price', this.langCode),
          /*format: {
            prefix: '$'
          }*/
          // Not work good, invastigate why not
          // referenceLine: [
          //   {
          //     label: 'Cost monthly limit',
          //     value: this.bills.monthly_limit
          //   }
          // ]
        }
      ]
    };
    this.fetchData();
  }

  onChange(event, type: string) {
    if (type === 'currencyId') {
      this.currencyId = event.value;
    } else if (type === 'dateFrom') {
      const tempDateFrom = new Date(event.value);
      const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
      this.dateFromRequest = dateString;
    } else if (type === 'dateTo') {
      const tempDateFrom = new Date(event.value);
      const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
      this.dateToRequest = dateString;
    } else {}
    this.getGraph(this.currencyId, this.dateFromRequest, this.dateToRequest);
  }

  clearDateFrom() {
    this.dateFrom = '';
    this.dateFromRequest = '';
    this.getGraph(this.currencyId, this.dateFromRequest, this.dateToRequest);
  }

  clearDateTo() {
    this.dateTo = '';
    this.dateToRequest = '';
    this.getGraph(this.currencyId, this.dateFromRequest, this.dateToRequest);
  }

  // Translations
  changeLangByCode(langCode: string) {
    if (langCode === 'en') {
      this.lang = 'English';
    }
    else if (langCode === 'de') {
      this.lang = 'German';
    }
    else if (langCode === 'hr') {
      this.lang = 'Croatian';
    }
    else {
      this.langCode = 'en'
      this.lang = 'English';
    }
  }

  changeLang(event, lang: string) {
    if (!lang) {
      localStorage.setItem('lang', event.value);
    }
    else {
      localStorage.setItem('lang', lang);
    }
    this.langCode = localStorage.getItem('lang');
    this.changeLangByCode(this.langCode);
  }

  _translation(key: string, language: string) {
    return translateFunction(key, language);
  }
}
