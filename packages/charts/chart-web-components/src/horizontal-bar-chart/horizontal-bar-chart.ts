import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { create as d3Create, select as d3Select } from 'd3-selection';
import { getRTL, jsonConverter, SVG_NAMESPACE_URI, validateChartPropsArray } from '../utils/chart-helpers.js';
import type { ChartDataPoint, ChartProps } from './horizontal-bar-chart.options.js';
import { Variant } from './horizontal-bar-chart.options.js';

/**
 * A Horizontal Bar Chart HTML Element.
 *
 * @public
 */
export class HorizontalBarChart extends FASTElement {
  @attr
  public variant?: Variant;

  @attr({ converter: jsonConverter })
  public data!: ChartProps[];

  @attr({ attribute: 'hide-ratio', mode: 'boolean' })
  public hideRatio: boolean = false;

  @attr({ attribute: 'hide-legends', mode: 'boolean' })
  public hideLegends: boolean = false;

  @attr({ attribute: 'hide-tooltip', mode: 'boolean' })
  public hideTooltip: boolean = false;

  @attr({ attribute: 'legend-list-label' })
  public legendListLabel?: string;

  @attr({ attribute: 'chart-title' })
  public chartTitle?: string;

  @observable
  public uniqueLegends: ChartDataPoint[] = [];

  @observable
  public activeLegend: string = '';
  protected activeLegendChanged = (oldValue: string, newValue: string) => {
    if (newValue === '') {
      this._bars?.forEach(bar => bar.classList.remove('inactive'));
    } else {
      this._bars?.forEach(bar => {
        if (bar.getAttribute('barinfo') === newValue) {
          bar.classList.remove('inactive');
        } else {
          bar.classList.add('inactive');
        }
      });
    }
  };

  @observable
  public isLegendSelected: boolean = false;

  @observable
  public tooltipProps = {
    isVisible: false,
    legend: '',
    yValue: '',
    color: '',
    xPos: 0,
    yPos: 0,
  };

  public chartContainer!: HTMLDivElement;
  public elementInternals: ElementInternals = this.attachInternals();

  private _isRTL: boolean = false;
  private _barHeight: number = 12;
  private _bars: SVGRectElement[] = [];

  constructor() {
    super();

    this.elementInternals.role = 'region';
  }

  public handleLegendMouseoverAndFocus = (legendTitle: string) => {
    if (this.isLegendSelected) {
      return;
    }

    this.activeLegend = legendTitle;
  };

  public handleLegendMouseoutAndBlur = () => {
    if (this.isLegendSelected) {
      return;
    }

    this.activeLegend = '';
  };

  public handleLegendClick = (legendTitle: string) => {
    if (this.isLegendSelected && this.activeLegend === legendTitle) {
      this.activeLegend = '';
      this.isLegendSelected = false;
    } else {
      this.activeLegend = legendTitle;
      this.isLegendSelected = true;
    }
  };

  connectedCallback() {
    super.connectedCallback();

    validateChartPropsArray(this.data, 'data');

    this._isRTL = getRTL(this);
    this.elementInternals.ariaLabel = this.chartTitle || `Horizontal bar chart with ${this.data.length} categories.`;

    this._initializeData();
    this._renderChart();
  }

  private _initializeData() {
    if (this.variant === Variant.SingleBar) {
      this._hydrateData();
    }
    this._hydrateLegends();
  }

  private _renderChart() {
    const chartContainerDiv = d3Select(this.chartContainer);
    chartContainerDiv
      .selectAll('div')
      .data(this.data!)
      .enter()
      .append('div')
      .each((d, i, nodes) => {
        this._createSingleChartBars(d, i, nodes);
      });
  }

  private _createSingleChartBars(singleChartData: ChartProps, index: number, nodes: any) {
    const singleChartBars = this._createBarsAndLegends(singleChartData!, index);

    // create a div element. Loop through chart bars and add to the div as its children
    d3Select(nodes[index])
      .attr('key', index)
      .attr('id', `_MSBC_bar-${index}`)
      .node()!
      .appendChild(singleChartBars.node());
  }

  private _hydrateLegends() {
    // Create a map to store unique legends
    const uniqueLegendsMap = new Map();

    // Iterate through all chart points and populate the map
    for (const dataSeries of this.data) {
      for (const point of dataSeries.chartData!) {
        if ((point as any).placeholder === true) {
          continue;
        }
        // Check if the legend is already in the map
        if (!uniqueLegendsMap.has(point.legend)) {
          uniqueLegendsMap.set(point.legend, {
            legend: point.legend,
            data: point.data,
            color: point.gradient ? point.gradient[0] : point.color,
          });
        }
      }
    }

    // Convert the map values back to an array
    this.uniqueLegends = Array.from(uniqueLegendsMap.values());
  }

  private _hydrateData() {
    this.data!.forEach(({ chartData }) => {
      if (chartData!.length === 1) {
        const pointData = chartData![0];
        const newEntry = {
          legend: '',
          data: Math.max(pointData.total! - pointData.data!, 0),
          y: pointData.total!,
          color: '#edebe9',
          placeholder: true,
        };
        chartData!.push(newEntry);
      }
    });
  }

  private _calculateBarSpacing(): number {
    const svgWidth = this.getBoundingClientRect().width;
    let barSpacing = 0;
    const MARGIN_WIDTH_IN_PX = 3;
    if (svgWidth) {
      const currentBarSpacing = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;
      barSpacing = currentBarSpacing;
    }
    return barSpacing;
  }

  private _createBarsAndLegends(data: ChartProps, barNo?: number) {
    const _isRTL = this._isRTL;
    const _computeLongestBarTotalValue = () => {
      let longestBarTotalValue = 0;
      this.data!.forEach(({ chartData }) => {
        const barTotalValue = chartData!.reduce((acc: number, point: ChartDataPoint) => acc + (point.data ?? 0), 0);
        longestBarTotalValue = Math.max(longestBarTotalValue, barTotalValue);
      });
      return longestBarTotalValue;
    };
    const longestBarTotalValue = _computeLongestBarTotalValue();
    const noOfBars =
      data.chartData?.reduce((count: number, point: ChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const barSpacingInPercent = this._calculateBarSpacing();
    const totalMarginPercent = barSpacingInPercent * (noOfBars - 1);
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const barTotalValue = data.chartData!.reduce((acc: number, point: ChartDataPoint) => acc + (point.data ?? 0), 0);
    const total = this.variant === Variant.AbsoluteScale ? longestBarTotalValue : barTotalValue;

    let sumOfPercent = 0;
    data.chartData!.map((point: ChartDataPoint, index: number) => {
      const pointData = point.data ?? 0;
      const currValue = (pointData / total) * 100;
      let value = currValue ?? 0;

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

    const createBars = (g: SVGGElement, point: ChartDataPoint, index: number) => {
      const barHeight = 12;
      const pointData = point.data ?? 0;
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

      const gEle = d3Select(g) // 'this' refers to the current 'g' element
        .attr('key', index)
        .attr('role', 'img')
        .attr('aria-label', pointData);

      let gradientId = '';
      if (point.gradient) {
        const defs = document.createElementNS(SVG_NAMESPACE_URI, 'defs');
        gEle.node()!.appendChild(defs);

        const linearGradient = document.createElementNS(SVG_NAMESPACE_URI, 'linearGradient');
        defs.appendChild(linearGradient);
        gradientId = `gradient-${barNo}-${index}`;
        linearGradient.setAttribute('id', gradientId);

        const stop1 = document.createElementNS(SVG_NAMESPACE_URI, 'stop');
        linearGradient.appendChild(stop1);
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', point.gradient[0]);

        const stop2 = document.createElementNS(SVG_NAMESPACE_URI, 'stop');
        linearGradient.appendChild(stop2);
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', point.gradient[1]);
      }

      const rect = gEle
        .append('rect')
        .attr('key', index)
        .attr('id', `${barNo}-${index}`)
        .attr('barinfo', `${point.legend}`)
        .attr('class', 'bar')
        .attr('style', point.gradient ? `fill:url(#${gradientId})` : `fill:${point.color!}`)
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
        .attr('tabindex', 0);
      this._bars.push(rect.node()!);
    };

    const containerDiv = d3Create('div').attr('style', 'position: relative');

    const chartTitleDiv = containerDiv.append('div').attr('class', 'chart-title-div');
    chartTitleDiv
      .append('div')
      .append('span')
      .attr('class', 'chart-title')
      .text(data?.chartSeriesTitle ? data?.chartSeriesTitle : '');

    const showChartDataText = this.variant !== Variant.AbsoluteScale;
    // chartData length is always 2 in single-bar variant
    const showRatio = !this.hideRatio && data!.chartData!.length === 2;
    const getChartData = () => data!.chartData![0].data ?? 0;

    if (showChartDataText) {
      if (data.chartDataText) {
        const chartTitleRight = document.createElement('div');
        chartTitleDiv.node()!.appendChild(chartTitleRight);
        chartTitleRight.classList.add('chart-data-text');
        chartTitleRight.textContent = data.chartDataText;
      } else if (showRatio) {
        const ratioDiv = chartTitleDiv.append('div').attr('role', 'text');
        const numData = data!.chartData![0].data;
        const denomData = data!.chartData![1].data;
        const total = numData! + denomData!;
        ratioDiv.append('span').attr('class', 'ratio-numerator').text(numData!);
        ratioDiv.append('span').attr('class', 'ratio-denominator').text(`/${total!}`);
      }
    }

    const svgDiv = containerDiv.append('div').attr('style', 'display: flex;');
    const svgEle = svgDiv
      .append('svg')
      .attr('height', 12)
      .attr('width', 100 + '%')
      .attr('class', 'svg-chart')
      .attr(
        'aria-label',
        data?.chartSeriesTitle ??
          `Series with ${data.chartData.length}${data.chartData.length > 1 ? ' stacked' : ''} bars.`,
      )
      .selectAll('g')
      .data(data.chartData!)
      .enter()
      .append('g')
      .each(function (this, d, i) {
        createBars(this, d, i);
      })
      .on('mouseover', (event, d) => {
        if (d && d.hasOwnProperty('placeholder') && (d as any).placeholder === true) {
          return;
        }

        const bounds = this.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const xPos = Math.max(0, Math.min(centerX, window.innerWidth));

        this.tooltipProps = {
          isVisible: true,
          legend: d.legend,
          yValue: `${d.data}`,
          color: d.gradient ? d.gradient[0] : d.color!,
          xPos: this._isRTL ? bounds.right - event.clientX : Math.min(event.clientX - bounds.left, xPos),
          yPos: event.clientY - bounds.top - 40,
        };
      })
      .on('mouseout', () => {
        this.tooltipProps = { isVisible: false, legend: '', yValue: '', color: '', xPos: 0, yPos: 0 };
      });

    if (this.variant === Variant.AbsoluteScale) {
      const showLabel = true;
      const barLabel = barTotalValue;
      if (showLabel) {
        if (Math.round((startingPoint[startingPoint.length - 1] || 0) + value + totalMarginPercent) === 100) {
          svgDiv
            .append('text')
            .attr('key', 'text')
            .attr('style', 'margin-top: -4.5px; margin-left: 2px;')
            .attr('class', 'bar-label')
            .attr(
              'x',
              `${
                this._isRTL
                  ? 100 - (startingPoint[startingPoint.length - 1] || 0) - value - totalMarginPercent
                  : (startingPoint[startingPoint.length - 1] || 0) + value + totalMarginPercent
              }%`,
            )
            .attr('textAnchor', 'start')
            .attr('y', this._barHeight / 2 + 6)
            .attr('dominantBaseline', 'central')
            .attr('transform', `translate(${this._isRTL ? -4 : 4})`)
            .attr('aria-label', `Total: ${barLabel}`)
            .attr('role', 'img')
            .text(barLabel);
        } else {
          svgEle
            .append('text')
            .attr('key', 'text')
            .attr('class', 'bar-label')
            .attr(
              'x',
              `${
                this._isRTL
                  ? 100 - (startingPoint[startingPoint.length - 1] || 0) - value - totalMarginPercent
                  : (startingPoint[startingPoint.length - 1] || 0) + value + totalMarginPercent
              }%`,
            )
            .attr('textAnchor', 'start')
            .attr('y', this._barHeight / 2 + 6)
            .attr('dominantBaseline', 'central')
            .attr('transform', `translate(${this._isRTL ? -4 : 4})`)
            .attr('aria-label', `Total: ${barLabel}`)
            .attr('role', 'img')
            .text(barLabel);
        }
      }
    }

    if (data.benchmarkData) {
      const benchmarkContainer = document.createElement('div');
      containerDiv.node()!.appendChild(benchmarkContainer);
      benchmarkContainer.classList.add('benchmark-container');

      const triangle = document.createElement('div');
      benchmarkContainer.appendChild(triangle);
      triangle.classList.add('triangle');

      const benchmarkRatio = (data.benchmarkData / total) * 100;
      triangle.style['insetInlineStart'] = `calc(${benchmarkRatio}% - 4px)`;
    }

    return containerDiv;
  }
}
