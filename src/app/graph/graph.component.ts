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
      /*subcaption: {
        text: 'Grocery'
      },*/
      yAxis: [
        {
          plot: {
            value: 'Adds bill prices',
            type: 'line'
          },
          /*format: {
            prefix: '€'
          },*/
          title: 'Bills values'
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {

    const data = [[
    "01-Feb-11",
    8866
  ],
  [
    "02-Feb-11",
    2174
  ],
  [
    "03-Feb-11",
    2084
  ],
  [
    "04-Feb-11",
    1503
  ],
  [
    "05-Feb-11",
    4928
  ],
  [
    "06-Feb-11",
    0
  ],
  [
    "07-Feb-11",
    1064
  ],
  [
    "08-Feb-11",
    851
  ],
  [
    "09-Feb-11",
    7326
  ],
  [
    "10-Feb-11",
    8399
  ],
  [
    "11-Feb-11",
    4084
  ],
  [
    "12-Feb-11",
    4012
  ],
  [
    "13-Feb-11",
    1673
  ],
  [
    "14-Feb-11",
    6018
  ],
  [
    "15-Feb-11",
    9011
  ],
  [
    "16-Feb-11",
    5817
  ],
  [
    "17-Feb-11",
    5813
  ],
  [
    "18-Feb-11",
    566
  ],
  [
    "19-Feb-11",
    9065
  ],
  [
    "20-Feb-11",
    6734
  ],
  [
    "21-Feb-11",
    6937
  ],
  ]
    const schema = [
  {
    "name": "Time",
    "type": "date",
    "format": "%d-%b-%y"
  },
  {
    "name": "Bills values",
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
