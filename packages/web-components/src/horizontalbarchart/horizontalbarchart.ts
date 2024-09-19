import { attr, FASTElement } from '@microsoft/fast-element';
import * as d3 from 'd3';
import { createTabster, getGroupper, getMover, getTabsterAttribute, Types } from 'tabster';
import { IChartDataPoint, IChartProps, Variant } from './horizontalbarchart.options.js';

// During the page startup.
const tabsterCore = createTabster(window);
getMover(tabsterCore);
getGroupper(tabsterCore);

/**
 * A Horizontal Bar Chart HTML Element.
 *
 * @public
 */
export class HorizontalBarChart extends FASTElement {
  /**
   * The type of the element, which is always "horizontalbarchart".
   * @see The {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/type | `type`} property
   *
   * @public
   */
  public get type(): 'horizontalbarchart' {
    return 'horizontalbarchart';
  }

  /**
   * @public
   * The type of the dialog modal
   */
  @attr
  public variant: Variant = Variant.AbsoluteScale;

  /**
   * @public
   * The type of the dialog modal
   */
  @attr
  public _isRTL: boolean = false;

  @attr
  public inpData: IChartProps[] = [];

  private barHeight: number = 12;

  constructor() {
    super();

    const chartPoints1: IChartDataPoint[] = [
      {
        legend: 'Debit card numbers (EU and USA)',
        data: 40,
        color: '#0099BC',
      },
      {
        legend: 'Passport numbers (USA)',
        data: 23,
        color: '#77004D',
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: '#4F68ED',
      },
      {
        legend: 'Credit card numbers',
        data: 87,
        color: '#AE8C00',
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: '#004E8C',
      },
    ];

    const chartPoints2: IChartDataPoint[] = [
      {
        legend: 'Debit card numbers (EU and USA)',
        data: 40,
        color: '#0099BC',
      },
      {
        legend: 'Passport numbers (USA)',
        data: 56,
        color: '#77004D',
      },
      {
        legend: 'Social security numbers',
        data: 35,
        color: '#4F68ED',
      },
      {
        legend: 'Credit card numbers',
        data: 92,
        color: '#AE8C00',
      },
      {
        legend: 'Tax identification numbers (USA)',
        data: 87,
        color: '#004E8C',
      },
    ];

    const chartPoints3: IChartDataPoint[] = [
      {
        legend: 'Phone Numbers',
        data: 40,
        color: '#881798',
      },
      {
        legend: 'Credit card Numbers',
        data: 23,
        color: '#AE8C00',
      },
    ];

    this.inpData = [
      {
        chartTitle: 'Monitored First',
        chartData: chartPoints1,
      },
      {
        chartTitle: 'Monitored Second',
        chartData: chartPoints2,
      },
      {
        chartTitle: 'Unmonitored',
        chartData: chartPoints3,
      },
    ];
  }

  private bindEvents() {}

  connectedCallback() {
    this.render();
  }

  renderSingle() {
    const svg = d3
      .select(this.shadowRoot)
      .append('svg')
      .attr('width', 800)
      .attr('height', 800)
      .attr('style', 'margin-left: 20px');

    // Create tooltip div
    const tooltip = d3
      .select(this.shadowRoot)
      .append('div')
      .attr(
        'style',
        'position:absolute, text-align:center, width:60px, height:28px, padding:2px, font:12px sans-serif, background:yellow, border:2px, border-radius:8px, pointer-events:none, opacity:0',
      );

    const data = [12, 10, 15, 16, 23, 42]; // Sample data
    const colors = ['#637cef', '#e3008c', '#2aa0a4', '#9373c0', '#13a10e', '#3a96dd'];

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d, i) => i * 30) // Space out bars vertically
      .attr('x', 0) // Start bars from the left edge
      .attr('height', 25) // Fixed height for all bars
      .attr('width', d => d + '%') // Width based on data
      .attr('fill', (d, i) => colors[i % colors.length])
      .on('mouseover', function (event, d) {
        console.log(event.pageX, event.pageY);
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(d + ' hovered').attr('style', 'left:' + event.pageX + 'px, top:' + (event.pageY - 28) + 'px');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(500).attr('style', 'opacity:0');
      });

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('y', (d, i) => i * 30 + 15) // Position text in the middle of each bar vertically
      .attr('x', d => d + 1 + '%') // Slight offset from the left edge
      .text(d => d) // Set text content to data value
      .attr('fill', 'black') // Text color
      .attr('font-size', '12px'); // Text size
  }

  private createSingleChartBars(singleChartData: IChartProps, index: number, nodes: any) {
    const singleChartBars = this._createBarsAndLegends(singleChartData!, index);

    // create a div element. Loop through chart bars and add to the div as its children
    const divEle = d3
      .select(nodes[index])
      .attr('key', index)
      .attr('id', `_MSBC_bar-${index}`)
      .node()!
      .appendChild(singleChartBars.node());
  }

  render() {
    const div = d3.select(this.shadowRoot).append('div').attr('width', 800).attr('height', 400);
    div
      .append('div')
      .selectAll('div')
      .data(this.inpData!)
      .enter()
      .append('div')
      .each((d, i, nodes) => {
        this.createSingleChartBars(d, i, nodes);

        //Get the tabster attributes
        const attributes = getTabsterAttribute({ root: {} });

        //Apply attributes directly to the current node
        Object.keys(attributes).forEach(key => {
          nodes[i].setAttribute(key, attributes[key]);
        });
      });
  }

  public _createBarsAndLegends(data: IChartProps, barNo?: number) {
    const noOfBars =
      data.chartData?.reduce((count: number, point: IChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const barSpacingInPercent = 1;
    const totalMarginPercent = barSpacingInPercent * (noOfBars - 1);
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const barTotalValue = data.chartData!.reduce(
      (acc: number, point: IChartDataPoint) => acc + (point.data ? point.data : 0),
      0,
    );
    const total = this.variant === Variant.AbsoluteScale ? 400 : barTotalValue;

    let sumOfPercent = 0;
    data.chartData!.map((point: IChartDataPoint, index: number) => {
      const pointData = point.data ? point.data : 0;
      const currValue = (pointData / total) * 100;
      let value = currValue ? currValue : 0;

      if (value < 1 && value !== 0) {
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
      }
      sumOfPercent += value;

      return sumOfPercent;
    });

    // Include an imaginary placeholder bar with value equal to
    // the difference between longestBarTotalValue and barTotalValue
    // while calculating sumOfPercent to get correct scalingRatio for absolute-scale variant
    if (this.variant === Variant.AbsoluteScale) {
      let value = total === 0 ? 0 : ((total - barTotalValue) / total) * 100;
      if (value < 1 && value !== 0) {
        value = 1;
      } else if (value > 99 && value !== 100) {
        value = 99;
      }
      sumOfPercent += value;
    }

    /**
     * The %age of the space occupied by the margin needs to subtracted
     * while computing the scaling ratio, since the margins are not being
     * scaled down, only the data is being scaled down from a higher percentage to lower percentage
     * Eg: 95% of the space is taken by the bars, 5% by the margins
     * Now if the sumOfPercent is 120% -> This needs to be scaled down to 95%, not 100%
     * since that's only space available to the bars
     */

    const scalingRatio = sumOfPercent !== 0 ? sumOfPercent / (100 - totalMarginPercent) : 1;

    let prevPosition = 0;
    let value = 0;

    function createBars(point: IChartDataPoint, index: number) {
      const startColor: string = point.color!;
      const endColor: string = startColor;
      const _isRTL = false;
      const barHeight = 12;
      const pointData = point.data ? point.data : 0;
      if (index > 0) {
        prevPosition += value;
      }
      value = (pointData / total) * 100 ? (pointData / total) * 100 : 0;
      if (value < 1 && value !== 0) {
        value = 1 / scalingRatio;
      } else if (value > 99 && value !== 100) {
        value = 99 / scalingRatio;
      } else {
        value = value / scalingRatio;
      }

      startingPoint.push(prevPosition);

      const gEle = d3
        .select(this) // 'this' refers to the current 'g' element
        .attr('key', index)
        .attr('role', 'img')
        .attr('aria-label', pointData);

      gEle
        .append('rect')
        .attr('key', index)
        .attr('id', `${barNo}-${index}`)
        .attr(
          'x',
          `${
            _isRTL
              ? 100 - startingPoint[index] - value - barSpacingInPercent * index
              : startingPoint[index] + barSpacingInPercent * index
          }%`,
        )
        .attr('y', 0)
        .attr('width', value + '%')
        .attr('height', barHeight)
        .attr('style', `fill: ${point.color}`)
        .attr('tabindex', 0)
        .attr('data-tabster', '{"groupper": {...}}"')
        .attr('data-tabster', '{"mover": {...}}"');
    }

    const containerDiv = d3.create('div');

    const svgEle = containerDiv
      .append('svg')
      .attr('height', 20)
      .attr('aria-label', data?.chartTitle ? data?.chartTitle : '')
      .selectAll('g')
      .data(data.chartData!)
      .enter()
      .append('g')
      .each(createBars);

    if (this.variant === Variant.AbsoluteScale) {
      const showLabel = true;
      const barLabel = barTotalValue;

      if (showLabel) {
        svgEle
          .append('text')
          .attr('key', 'text')
          .attr(
            'x',
            `${
              this._isRTL
                ? 100 - (startingPoint[startingPoint.length - 1] || 0) - value - totalMarginPercent
                : (startingPoint[startingPoint.length - 1] || 0) + value + totalMarginPercent
            }%`,
          )
          .attr('textAnchor', 'start')
          .attr('y', this.barHeight / 2 + 6)
          .attr('dominantBaseline', 'central')
          .attr('transform', `translate(${this._isRTL ? -4 : 4})`)
          .attr('aria-label', `Total: ${barLabel}`)
          .attr('role', 'img')
          .text(barLabel);
      }
    }

    const getChartData = () => (data!.chartData![0].data ? data!.chartData![0].data : 0);

    return containerDiv;
  }
}
