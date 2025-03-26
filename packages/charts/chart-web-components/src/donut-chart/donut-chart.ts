import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { arc as d3Arc, pie as d3Pie, PieArcDatum } from 'd3-shape';
import {
  getColorFromToken,
  getNextColor,
  getRTL,
  jsonConverter,
  SVG_NAMESPACE_URI,
  validateChartProps,
  wrapText,
} from '../utils/chart-helpers.js';
import type { ChartDataPoint, ChartProps, Legend } from './donut-chart.options.js';

export class DonutChart extends FASTElement {
  @attr({ converter: nullableNumberConverter })
  public height: number = 200;

  @attr({ converter: nullableNumberConverter })
  public width: number = 200;

  @attr({ attribute: 'hide-legends', mode: 'boolean' })
  public hideLegends: boolean = false;

  @attr({ attribute: 'hide-tooltip', mode: 'boolean' })
  public hideTooltip: boolean = false;

  @attr({ converter: jsonConverter })
  public data!: ChartProps;

  @attr({ attribute: 'inner-radius', converter: nullableNumberConverter })
  public innerRadius: number = 1;

  @attr({ attribute: 'value-inside-donut' })
  public valueInsideDonut?: string;

  @attr({ attribute: 'legend-list-label' })
  public legendListLabel?: string;

  @observable
  public legends: Legend[] = [];

  @observable
  public activeLegend: string = '';
  protected activeLegendChanged(oldValue: string, newValue: string) {
    if (newValue === '') {
      this._arcs?.forEach(arc => arc.classList.remove('inactive'));
    } else {
      this._arcs?.forEach(arc => {
        if (arc.getAttribute('data-id') === newValue) {
          arc.classList.remove('inactive');
        } else {
          arc.classList.add('inactive');
        }
      });
    }

    this._updateTextInsideDonut();
  }

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
  protected tooltipPropsChanged(oldValue: any, newValue: any) {
    this._updateTextInsideDonut();
  }

  public chartWrapper!: HTMLDivElement;
  public group!: SVGGElement;
  public elementInternals: ElementInternals = this.attachInternals();

  private _arcs: SVGPathElement[] = [];
  private _isRTL: boolean = false;
  private _textInsideDonut?: SVGTextElement;

  constructor() {
    super();

    this.elementInternals.role = 'region';
  }

  public handleLegendMouseoverAndFocus(legendTitle: string) {
    if (this.isLegendSelected) {
      return;
    }

    this.activeLegend = legendTitle;
  }

  public handleLegendMouseoutAndBlur() {
    if (this.isLegendSelected) {
      return;
    }

    this.activeLegend = '';
  }

  public handleLegendClick(legendTitle: string) {
    if (this.isLegendSelected && this.activeLegend === legendTitle) {
      this.activeLegend = '';
      this.isLegendSelected = false;
    } else {
      this.activeLegend = legendTitle;
      this.isLegendSelected = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    validateChartProps(this.data, 'data');

    this.data.chartData.forEach((dataPoint, index) => {
      if (dataPoint.color) {
        dataPoint.color = getColorFromToken(dataPoint.color);
      } else {
        dataPoint.color = getNextColor(index);
      }
    });

    this.legends = this._getLegends();
    this._isRTL = getRTL(this);
    this.elementInternals.ariaLabel =
      this.data.chartTitle || `Donut chart with ${this.data.chartData.length} segments.`;

    this._render();
  }

  private _render() {
    const pie = d3Pie<ChartDataPoint>()
      .value(d => d.data)
      .padAngle(0.02);
    const arc = d3Arc<PieArcDatum<ChartDataPoint>>()
      .innerRadius(this.innerRadius)
      .outerRadius((Math.min(this.height, this.width) - 20) / 2);

    pie(this.data.chartData).forEach(arcDatum => {
      const arcGroup = document.createElementNS(SVG_NAMESPACE_URI, 'g');
      this.group.appendChild(arcGroup);

      const pathOutline = document.createElementNS(SVG_NAMESPACE_URI, 'path');
      arcGroup.appendChild(pathOutline);
      pathOutline.classList.add('arc-outline');
      pathOutline.setAttribute('d', arc(arcDatum)!);

      const path = document.createElementNS(SVG_NAMESPACE_URI, 'path');
      arcGroup.appendChild(path);
      this._arcs.push(path);
      path.classList.add('arc');
      path.setAttribute('d', arc(arcDatum)!);
      path.setAttribute('fill', arcDatum.data.color!);
      path.setAttribute('data-id', arcDatum.data.legend);
      path.setAttribute('tabindex', '0');
      path.setAttribute('aria-label', `${arcDatum.data.legend}, ${arcDatum.data.data}.`);
      path.setAttribute('role', 'img');

      path.addEventListener('mouseover', event => {
        if (this.activeLegend !== '' && this.activeLegend !== arcDatum.data.legend) {
          return;
        }

        const bounds = this.getBoundingClientRect();

        this.tooltipProps = {
          isVisible: true,
          legend: arcDatum.data.legend,
          yValue: `${arcDatum.data.data}`,
          color: arcDatum.data.color!,
          xPos: this._isRTL ? bounds.right - event.clientX : event.clientX - bounds.left,
          yPos: event.clientY - bounds.top - 85,
        };
      });
      path.addEventListener('focus', event => {
        if (this.activeLegend !== '' && this.activeLegend !== arcDatum.data.legend) {
          return;
        }

        const rootBounds = this.getBoundingClientRect();
        const arcBounds = path.getBoundingClientRect();

        this.tooltipProps = {
          isVisible: true,
          legend: arcDatum.data.legend,
          yValue: `${arcDatum.data.data}`,
          color: arcDatum.data.color!,
          xPos: this._isRTL
            ? rootBounds.right - arcBounds.left - arcBounds.width / 2
            : arcBounds.left + arcBounds.width / 2 - rootBounds.left,
          yPos: arcBounds.top - rootBounds.top - 85,
        };
      });
      path.addEventListener('blur', event => {
        this.tooltipProps = { isVisible: false, legend: '', yValue: '', color: '', xPos: 0, yPos: 0 };
      });
    });

    this.addEventListener('mouseleave', () => {
      this.tooltipProps = { isVisible: false, legend: '', yValue: '', color: '', xPos: 0, yPos: 0 };
    });

    if (this.valueInsideDonut) {
      this._textInsideDonut = document.createElementNS(SVG_NAMESPACE_URI, 'text');
      this.group.appendChild(this._textInsideDonut);
      this._textInsideDonut.classList.add('text-inside-donut');
      this._textInsideDonut.setAttribute('x', '0');
      this._textInsideDonut.setAttribute('y', '0');
      this._textInsideDonut.setAttribute('text-anchor', 'middle');
      this._textInsideDonut.setAttribute('dominant-baseline', 'middle');
      this._updateTextInsideDonut();
    }
  }

  private _getLegends(): Legend[] {
    return this.data.chartData.map((d, index) => ({
      title: d.legend,
      color: d.color!,
    }));
  }

  private _getTextInsideDonut(valueInsideDonut: string) {
    let textInsideDonut = valueInsideDonut;

    if (valueInsideDonut && (this.activeLegend !== '' || this.tooltipProps.isVisible)) {
      const highlightedDataPoint = this.data.chartData.find(
        dataPoint =>
          dataPoint.legend === this.activeLegend ||
          (this.tooltipProps.isVisible && dataPoint.legend === this.tooltipProps.legend),
      );
      textInsideDonut = highlightedDataPoint!.yAxisCalloutData ?? highlightedDataPoint!.data.toLocaleString();
    }

    return textInsideDonut;
  }

  private _updateTextInsideDonut() {
    if (!this._textInsideDonut || !this.valueInsideDonut) {
      return;
    }

    this._textInsideDonut.textContent = this._getTextInsideDonut(this.valueInsideDonut);
    const lineHeight = this._textInsideDonut.getBoundingClientRect().height;
    wrapText(this._textInsideDonut, 2 * this.innerRadius);
    const lines = this._textInsideDonut.getElementsByTagName('tspan');
    const start = -1 * Math.trunc((lines.length - 1) / 2);
    for (let i = 0; i < lines.length; i++) {
      lines[i].setAttribute('dy', `${(start + i) * lineHeight}`);
    }
  }
}
