import { Component, OnInit } from '@angular/core';
import { of, interval, concatMap } from 'rxjs';
declare const require: any; // DEMO IGNORE

@Component({
  selector: 'app-iq-modulation-basic',
  templateUrl: './iq-modulation-basic.component.html',
  styleUrls: ['./iq-modulation-basic.component.scss'],
})
export class IqModulationBasicComponent implements OnInit {
  options: any;
  optionsPolar: any;
  options3d: any;
  updateOptions: any;
  updateOptionsPolar: any;
  updateOptions3d: any;
  ampI: number = 1;
  ampQ: number = 1;
  private dataI: any[];
  private dataQ: any[];
  private dataSumIQ: any[];
  private dataIQ: any[];
  private data3D: any[];
  private xAxisData: any[];

  constructor() {}

  style = {
    float: 'left',
    height: '300px',
    marginLeft: '70px',
  };

  marks = {
    [-1]: '-1',
    0: { label: '<strong>0</strong>' },
    1: '1',
  };

  recalcCharts() {
    this.generateData();
    // update series data:
    this.updateOptions = {
      series: [
        {
          data: this.dataI,
        },
        {
          data: this.dataQ,
        },
        {
          data: this.dataSumIQ,
        },
      ],
    };
    this.updateOptionsPolar = {
      series: [
        {
          data: this.dataIQ,
        },
      ],
    };
    this.updateOptions3d = {
      series: [
        {
          data: this.data3D,
        },
      ],
    };
  }

  generateData() {
    this.dataI = [];
    this.dataQ = [];
    this.dataSumIQ = [];
    this.dataIQ = [];
    this.data3D = [];
    this.xAxisData = [];

    var counter: number = 0;
    for (let i = 0; i < 8 * Math.PI; i += Math.PI / 80) {
      this.xAxisData.push(counter / 40 + 'ms');
      counter++;
      var y1 =
        Math.round((this.ampI * Math.cos(i) + Number.EPSILON) * 1000) / 1000;
      var y2 =
        Math.round((this.ampQ * Math.sin(i) + Number.EPSILON) * 1000) / 1000;
      var y3 = Math.round((y1 + y2 + Number.EPSILON) * 1000) / 1000;

      this.dataI.push(y1);
      this.dataQ.push(y2);
      this.dataSumIQ.push(y3);
      this.dataIQ.push([y1, y2]);

      this.data3D.push([y2, counter / 40, y1]);
    }
  }

  ngOnInit(): void {
    this.generateData();
    // interval(1000).subscribe(() => this.recalcCharts());
    this.options3d = {
      toolbox: {
        feature: {
          restore: {},
        },
      },
      backgroundColor: '#fff',
      xAxis3D: {
        type: 'value',
        name: 'Q',
        min: -1.1,
        max: 1.1,
        axisLabel: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yAxis3D: {
        type: 'value',
        name: 'Time',
        axisLabel: {
          formatter: '{value} ms',
        },
        axisTicks: {
          show: false,
        },
      },
      zAxis3D: {
        type: 'value',
        name: 'I',
        min: -1.1,
        max: 1.1,
        axisLabel: {
          show: false,
        },
        axisLine: {
          interval: 2,
        },
      },
      grid3D: {
        boxWidth: 100,
        boxDepth: 250,
        viewControl: {
          beta: 55,
          alpha: 10,
          projection: 'orthographic',
        },
      },
      series: [
        {
          type: 'line3D',
          data: this.data3D,
          lineStyle: {
            width: 4,
          },
          animation: false,
        },
      ],
    };
    this.optionsPolar = {
      media: {
        query: {
          aspectRatio: '1/1',
        },
      },
      grid: {
        left: '30px',
        right: '20px',
        bottom: '30px',
        top: '30px',
      },
      xAxis: {
        name: 'I',
        min: -1.1,
        max: 1.1,
      },
      yAxis: {
        name: 'Q',
        min: -1.1,
        max: 1.1,
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
          clip: true,
          data: this.dataIQ,
        },
      ],
    };
    this.options = {
      legend: {
        // align: 'left',
        // left: '10px',
        top: '5px',
        orient: 'horizontal',
        borderColor: '#fff',
        borderWidth: 1,
        textStyle: {
          fontSize: 16,
        },
      },
      grid: {
        left: '30px',
        right: '20px',
        bottom: '30px',
        top: '30px',
      },
      xAxis: {
        data: this.xAxisData,
        splitLine: {
          show: true,
        },
        axisLabel: {
          interval: 39,
        },
      },
      yAxis: {
        min: -1.5,
        max: 1.5,
        splitLine: {
          show: true,
        },
      },
      toolbox: {
        feature: {
          restore: {},
        },
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '0%'];
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: 'In-Phase Component',
          type: 'line',
          data: this.dataI,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Quadrature Component',
          type: 'line',
          data: this.dataQ,
          lineStyle: {
            width: 1,
          },
          showSymbol: false,
        },
        {
          name: 'Resulting Component',
          type: 'line',
          data: this.dataSumIQ,
          lineStyle: {
            width: 3,
          },
          showSymbol: false,
        },
      ],
    };
  }
}
