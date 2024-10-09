import { attr, FASTElement } from '@microsoft/fast-element';
import * as d3 from 'd3';
import { IChartDataPoint, IChartProps } from './donut-chart.options.js';

export class DonutChart extends FASTElement {
  public get type(): 'donut-chart' {
    return 'donut-chart';
  }

  @attr
  public inpData: IChartProps;

  constructor() {
    super();

    const points: IChartDataPoint[] = [
      {
        legend: 'first',
        data: 20000,
        color: '#0099BC',
      },
      {
        legend: 'second',
        data: 39000,
        color: '#77004D',
      },
    ];

    this.inpData = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };
  }

  private bindEvents() {}

  connectedCallback() {
    this.render();
  }

  render() {
    const rootDiv = d3.select(this.shadowRoot).append('div');
    const svg = rootDiv
      .append('svg')
      .attr('aria-label', this.inpData.chartTitle!)
      .attr('width', 200)
      .attr('height', 200);
    const group = svg.append('g').attr('transform', 'translate(100, 100)');
    const pie = d3
      .pie()
      .value((d: any) => d.data)
      .padAngle(0.02);
    const arc = d3.arc().innerRadius(55).outerRadius(90);
    group
      .selectAll('path')
      .data(pie(this.inpData.chartData))
      .enter()
      .append('path')
      .attr('d', d => {
        console.log(d);
        return arc(d);
      })
      .attr('fill', d => d.data.color);
    group.append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'middle').text('35,000');
  }
}
