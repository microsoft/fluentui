import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { arc as d3Arc, pie as d3Pie, PieArcDatum } from 'd3-shape';
import { createTabster, getMover, getTabsterAttribute, MoverDirections, TABSTER_ATTRIBUTE_NAME } from 'tabster';
import {
  getColorFromToken,
  getNextColor,
  jsonConverter,
  SVG_NAMESPACE_URI,
  validateChartProps,
  wrapText,
} from '../utils/chart-helpers.js';
import { ChartDataPoint, ChartProps, Legend } from './donut-chart.options.js';

const tabsterCore = createTabster(window);
getMover(tabsterCore);

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

  @observable
  public legends: Legend[] = [];

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
  public chartWrapper!: HTMLDivElement;
  public group!: SVGGElement;

  private _arcs: SVGPathElement[] = [];

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

    this.legends = this.getLegends();

    this._render();
  }

  private _render = () => {
    const tabsterAttribute = getTabsterAttribute({
      mover: { direction: MoverDirections.Horizontal, tabbable: true },
    });
    if (tabsterAttribute[TABSTER_ATTRIBUTE_NAME]) {
      this.chartWrapper.setAttribute(TABSTER_ATTRIBUTE_NAME, tabsterAttribute[TABSTER_ATTRIBUTE_NAME]);
    }

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

        const bounds = this.rootDiv.getBoundingClientRect();

        this.tooltipProps = {
          isVisible: true,
          legend: arcDatum.data.legend,
          yValue: `${arcDatum.data.data}`,
          color: arcDatum.data.color!,
          xPos: event.clientX - bounds.left,
          yPos: event.clientY - bounds.top - 85,
        };
      });
      path.addEventListener('focus', event => {
        if (this.activeLegend !== '' && this.activeLegend !== arcDatum.data.legend) {
          return;
        }

        const rootBounds = this.rootDiv.getBoundingClientRect();
        const arcBounds = path.getBoundingClientRect();

        this.tooltipProps = {
          isVisible: true,
          legend: arcDatum.data.legend,
          yValue: `${arcDatum.data.data}`,
          color: arcDatum.data.color!,
          xPos: arcBounds.left + arcBounds.width / 2 - rootBounds.left,
          yPos: arcBounds.top - rootBounds.top - 85,
        };
      });
      path.addEventListener('blur', event => {
        this.tooltipProps = { isVisible: false, legend: '', yValue: '', color: '', xPos: 0, yPos: 0 };
      });
    });

    this.rootDiv.addEventListener('mouseleave', () => {
      this.tooltipProps = { isVisible: false, legend: '', yValue: '', color: '', xPos: 0, yPos: 0 };
    });

    if (this.valueInsideDonut) {
      const text = document.createElementNS(SVG_NAMESPACE_URI, 'text');
      this.group.appendChild(text);
      text.classList.add('text-inside-donut');
      text.setAttribute('x', '0');
      text.setAttribute('y', '0');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = this.valueInsideDonut;
      const lineHeight = text.getBoundingClientRect().height;
      wrapText(text, 2 * this.innerRadius);
      const lines = text.getElementsByTagName('tspan');
      const start = -Math.trunc((lines.length - 1) / 2);
      for (let i = 0; i < lines.length; i++) {
        lines[i].setAttribute('dy', `${(start + i) * lineHeight}`);
      }
    }
  };

  public getLegends = (): Legend[] => {
    return this.data.chartData.map((d, index) => ({
      title: d.legend,
      color: d.color!,
    }));
  };

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
  };
}
