import { Component, OnInit } from '@angular/core';
declare const require: any; // DEMO IGNORE

@Component({
  selector: 'app-iq-modulation-basic',
  templateUrl: './iq-modulation-basic.component.html',
  styleUrls: ['./iq-modulation-basic.component.scss'],
})
export class IqModulationBasicComponent implements OnInit {
  options: any;
  optionsPolar: any;
  updateOptions: any;
  updateOptionsPolar: any;
  ampI: number = 100;
  ampQ: number = 100;
  private data1: any[];
  private data2: any[];
  private data3: any[];
  private data4: any[];
  private xAxisData: any[];

  constructor() {}

  style = {
    float: 'left',
    height: '300px',
    marginLeft: '70px',
  };

  marksAmpQ = {
    0: {
      label: '<strong>0 %</strong>',
    },
    25: '25 %',
    50: '50 %',
    75: '75 %',
    100: {
      label: '<strong>Amplitude Q</strong>',
    },
  };
  marksAmpI = {
    0: {
      label: '<strong>0 %</strong>',
    },
    25: '25 %',
    50: '50 %',
    75: '75 %',
    100: {
      label: '<strong>Amplitude I</strong>',
    },
  };
  onIAmpChange(value) {
    console.log(`onChange: ${value}`);
    this.generateData();
    // update series data:
    this.updateOptions = {
      series: [
        {
          data: this.data1,
        },
        {
          data: this.data2,
        },
        {
          data: this.data3,
        },
      ],
    };
    this.updateOptionsPolar = {
      series: [
        {
          data: this.data4,
        },
      ],
    };
  }
  onQAmpChange(value) {
    console.log(`onChange: ${value}`);
    this.generateData();
    // update series data:
    this.updateOptions = {
      series: [
        {
          data: this.data1,
        },
        {
          data: this.data2,
        },
        {
          data: this.data3,
        },
      ],
    };
    this.updateOptionsPolar = {
      series: [
        {
          data: this.data4,
        },
      ],
    };
  }

  generateData() {
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    this.xAxisData = [];

    var counter: number = 0;
    for (let i = 0; i < 8 * Math.PI; i += Math.PI / 80) {
      this.xAxisData.push(counter / 40 + 'ms');
      counter++;
      var y1 =
        Math.round(((this.ampI / 100) * Math.cos(i) + Number.EPSILON) * 1000) /
        1000;
      var y2 =
        Math.round(((this.ampQ / 100) * Math.sin(i) + Number.EPSILON) * 1000) /
        1000;
      var y3 = Math.round((y1 + y2 + Number.EPSILON) * 1000) / 1000;
      this.data1.push(y1);
      this.data2.push(y2);
      this.data3.push(y3);
      this.data4.push([
        Math.round((Math.sqrt(y1 ** 2 + y2 ** 2) + Number.EPSILON) * 100) / 100,
        Math.round(
          ((Math.atan2(y1, y2) / (2 * Math.PI)) * 360 + Number.EPSILON) * 100
        ) / 100,
      ]);
    }
  }

  ngOnInit(): void {
    this.generateData();
    this.optionsPolar = {
      title: {
        text: 'Phasor Diagram of IQ Data',
      },
      legend: {
        top: '5px',
        orient: 'horizontal',
        borderColor: '#fff',
        borderWidth: 1,
        textStyle: {
          fontSize: 16,
        },
      },
      polar: {},
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   type: 'cross',
        // },
      },
      angleAxis: {
        type: 'value',
        min: 0,
        max: 360,
        startAngle: 0,
        clockwise: false,
      },
      radiusAxis: {
        min: 0,
        max: 1.5,
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'Resulting Component',
          type: 'line',
          showSymbol: false,
          data: this.data4,
          color: '#fac858',
          lineStyle: {
            width: 3,
          },
        },
      ],
      animationDuration: 2000,
    };
    this.options = {
      title: {
        text: 'IQ-Addition',
      },
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
          saveAsImage: {},
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
          data: this.data1,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'Quadrature Component',
          type: 'line',
          data: this.data2,
          lineStyle: {
            width: 1,
          },
          showSymbol: false,
        },
        {
          name: 'Resulting Component',
          type: 'line',
          data: this.data3,
          lineStyle: {
            width: 3,
          },
          showSymbol: false,
        },
      ],
    };
  }
}
