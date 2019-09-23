import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  chart = []

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
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        /*scale: {
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
        }*/
      }
    })
  }

}
