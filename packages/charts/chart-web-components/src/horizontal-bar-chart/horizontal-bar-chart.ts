import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { create as d3Create, select as d3Select } from 'd3-selection';
import { createTabster, getGroupper, getMover, getTabsterAttribute, TABSTER_ATTRIBUTE_NAME } from 'tabster';
import { jsonConverter, SVG_NAMESPACE_URI, validateChartPropsArray } from '../utils/chart-helpers.js';
import { ChartDataPoint, ChartProps, Variant } from './horizontal-bar-chart.options.js';

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

  public chartContainer!: HTMLDivElement;

  /**
   * @public
   * The type of the dialog modal
   */
  @attr
  public _isRTL: boolean = false;

  @attr({ converter: jsonConverter })
  public data!: ChartProps[];

  @observable
  public uniqueLegends: ChartDataPoint[] = [];

  @attr
  public hideRatio = false;

  @attr({ attribute: 'hide-legends', mode: 'boolean' })
  public hideLegends?: boolean;

  @attr({ attribute: 'hide-tooltip', mode: 'boolean' })
  public hideTooltip?: boolean;

  @observable
  public activeLegend: string = '';

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

  public rootDiv!: HTMLDivElement;

  private barHeight: number = 12;
  private _bars: SVGRectElement[] = [];

  constructor() {
    super();
  }

  private bindEvents() {}

  connectedCallback() {
    super.connectedCallback();

    validateChartPropsArray(this.data, 'data');

    this.initializeData();
    this.renderChart();
  }

  private initializeData() {
    if (this.variant === Variant.SingleBar) {
      this._hydrateData();
    }
    this.hydrateLegends();
  }

  public renderChart() {
    const chartContainerDiv = d3Select(this.chartContainer);
    chartContainerDiv
      .selectAll('div')
      .data(this.data!)
      .enter()
      .append('div')
      .each((d, i, nodes) => {
        this.createSingleChartBars(d, i, nodes);

        //Get the tabster attributes
        const attributes = getTabsterAttribute({ root: {} });

        //Apply attributes directly to the current node
        if (attributes[TABSTER_ATTRIBUTE_NAME] !== undefined) {
          nodes[i].setAttribute(TABSTER_ATTRIBUTE_NAME, attributes[TABSTER_ATTRIBUTE_NAME]);
        }
      });
  }

  private createSingleChartBars(singleChartData: ChartProps, index: number, nodes: any) {
    const singleChartBars = this._createBarsAndLegends(singleChartData!, index);

    // create a div element. Loop through chart bars and add to the div as its children
    const divEle = d3Select(nodes[index])
      .attr('key', index)
      .attr('id', `_MSBC_bar-${index}`)
      .node()!
      .appendChild(singleChartBars.node());
  }

  private hydrateLegends() {
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
    this.data!.forEach(({ chartTitle, chartData }) => {
      if (chartData!.length === 1) {
        const pointData = chartData![0];
        const newEntry = {
          legend: '',
          data: pointData.total! - pointData.data! > 0 ? pointData.total! - pointData.data! : 0,
          y: pointData.total!,
          color: '#edebe9',
          placeholder: true,
        };
        chartData!.push(newEntry);
      }
    });
  }

  private calculateBarSpacing(): number {
    //todo: replace 650 with width of svg or div.
    const svgWidth = 650;
    let barSpacing = 0;
    const MARGIN_WIDTH_IN_PX = 3;
    if (svgWidth) {
      const currentBarSpacing = (MARGIN_WIDTH_IN_PX / svgWidth) * 100;
      barSpacing = currentBarSpacing;
    }
    return barSpacing;
  }

  public _createBarsAndLegends(data: ChartProps, barNo?: number) {
    const _isRTL = this._isRTL;
    const _computeLongestBarTotalValue = () => {
      let longestBarTotalValue = 0;
      this.data!.forEach(({ chartData, chartTitle }) => {
        const barTotalValue = chartData!.reduce(
          (acc: number, point: ChartDataPoint) => acc + (point.data ? point.data : 0),
          0,
        );
        longestBarTotalValue = Math.max(longestBarTotalValue, barTotalValue);
      });
      return longestBarTotalValue;
    };
    const longestBarTotalValue = _computeLongestBarTotalValue();
    const noOfBars =
      data.chartData?.reduce((count: number, point: ChartDataPoint) => (count += (point.data || 0) > 0 ? 1 : 0), 0) ||
      1;
    const barSpacingInPercent = this.calculateBarSpacing();
    const totalMarginPercent = barSpacingInPercent * (noOfBars - 1);
    // calculating starting point of each bar and it's range
    const startingPoint: number[] = [];
    const barTotalValue = data.chartData!.reduce(
      (acc: number, point: ChartDataPoint) => acc + (point.data ? point.data : 0),
      0,
    );
    const total = this.variant === Variant.AbsoluteScale ? longestBarTotalValue : barTotalValue;

    let sumOfPercent = 0;
    data.chartData!.map((point: ChartDataPoint, index: number) => {
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

    const createBars = (g: SVGGElement, point: ChartDataPoint, index: number) => {
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

      gEle;
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
        .attr('tabindex', 0)
        .attr('data-tabster', '{"groupper": {...}}"')
        .attr('data-tabster', '{"mover": {...}}"');
      this._bars.push(rect.node()!);
    };

    const containerDiv = d3Create('div').attr('style', 'position: relative');

    const chartTitleDiv = containerDiv.append('div').attr('class', 'chartTitleDiv');
    chartTitleDiv
      .append('div')
      .append('span')
      .attr('class', 'chartTitle')
      .text(data?.chartTitle ? data?.chartTitle : '');

    const showChartDataText = this.variant !== Variant.AbsoluteScale && !this.hideRatio;
    const showRatio =
      (this.variant === Variant.PartToWhole && data!.chartData!.length === 2) || this.variant === Variant.SingleBar;
    const getChartData = () => (data!.chartData![0].data ? data!.chartData![0].data : 0);

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
        ratioDiv.append('span').attr('class', 'ratioNumerator').text(numData!);
        ratioDiv.append('span').attr('class', 'ratioDenominator').text(`/${total!}`);
      }
    }

    const svgEle = containerDiv
      .append('svg')
      .attr('height', 20)
      .attr('width', 100 + '%')
      .attr('aria-label', data?.chartTitle ? data?.chartTitle : '')
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

        const bounds = this.rootDiv.getBoundingClientRect();

        this.tooltipProps = {
          isVisible: true,
          legend: d.legend,
          yValue: `${d.data}`,
          color: d.color!,
          xPos: event.clientX - bounds.left,
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
        svgEle
          .append('text')
          .attr('key', 'text')
          .attr('class', 'barLabel')
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
    return containerDiv;
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

  public activeLegendChanged = (oldValue: string, newValue: string) => {
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
}
