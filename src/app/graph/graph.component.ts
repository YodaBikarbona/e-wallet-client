import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

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
  constructor() {
    this.type = 'timeseries';
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
          plot: 'Sales Value',
          title: 'Sale Value',
          /*format: {
            prefix: '$'
          }*/
          referenceLine: [
            {
              label: 'Cost monthly limit',
              value: '3800'
            }
          ]
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {

    const data = [
      [
    "01-Feb-11",
    "Profit",
    8866
  ],
  [
    "01-Feb-11",
    "Cost",
    984
  ],
  [
    "02-Feb-11",
    "Profit",
    2174
  ],
  [
    "02-Feb-11",
    "Cost",
    1109
  ],
  [
    "03-Feb-11",
    "Profit",
    2084
  ],
  [
    "03-Feb-11",
    "Cost",
    6526
  ],
  [
    "04-Feb-11",
    "Profit",
    1503
  ],
  [
    "04-Feb-11",
    "Cost",
    1007
  ],
  [
    "05-Feb-11",
    "Profit",
    4928
  ],
  [
    "05-Feb-11",
    "Cost",
    4112
  ],
  [
    "06-Feb-11",
    "Profit",
    4667
  ],
  [
    "06-Feb-11",
    "Cost",
    7206
  ],
  ]
    const schema = [
  {
    "name": "Time",
    "type": "date",
    "format": "%d-%b-%y"
  },
  {
    "name": "Type",
    "type": "string"
  },
  {
    "name": "Sales Value",
    "type": "number"
  }
]
    const fusionDataStore = new FusionCharts.DataStore();
    const fusionTable = fusionDataStore.createDataTable(data, schema);
    this.dataSource.data = fusionTable;
  }

  ngOnInit() {

  }

}
