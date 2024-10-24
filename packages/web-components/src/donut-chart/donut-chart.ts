import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { arc as d3Arc, pie as d3Pie, PieArcDatum } from 'd3-shape';
import { createTabster, getMover, getTabsterAttribute, MoverDirections, TABSTER_ATTRIBUTE_NAME } from 'tabster';
import {
  getColorFromToken,
  getDataConverter,
  getNextColor,
  SVG_NAMESPACE_URI,
  wrapText,
} from '../utils/chart-helpers.js';
import { ChartDataPoint, ChartProps } from './donut-chart.options.js';

const tabsterCore = createTabster(window);
getMover(tabsterCore);

export class DonutChart extends FASTElement {
  @attr({ converter: nullableNumberConverter })
  public height: number = 200;

  @attr({ converter: nullableNumberConverter })
  public width: number = 200;

  @attr({ attribute: 'hide-legends', mode: 'boolean' })
  public hideLegends?: boolean;

  @attr({ attribute: 'hide-tooltip', mode: 'boolean' })
  public hideTooltip?: boolean;

  @attr({ converter: getDataConverter('donut-chart') })
  public data!: ChartProps;

  @attr({ attribute: 'inner-radius', converter: nullableNumberConverter })
  public innerRadius: number = 1;

  @attr({ attribute: 'value-inside-donut' })
  public valueInsideDonut?: string;

  private _selectedLegend: string = '';

  constructor() {
    super();
  }

  private bindEvents() {}

  connectedCallback() {
    super.connectedCallback();

    this.data.chartData?.forEach((dataPoint, index) => {
      if (dataPoint.color) {
        dataPoint.color = getColorFromToken(dataPoint.color);
      } else {
        dataPoint.color = getNextColor(index);
      }
    });

    this.render();
  }

  render() {
    const rootDiv = document.createElement('div');
    this.shadowRoot?.appendChild(rootDiv);
    rootDiv.classList.add('root');

    const chartWrapper = document.createElement('div');
    rootDiv.appendChild(chartWrapper);

    const tabsterAttribute = getTabsterAttribute({
      mover: { direction: MoverDirections.Horizontal, tabbable: true },
    });
    if (tabsterAttribute[TABSTER_ATTRIBUTE_NAME]) {
      chartWrapper.setAttribute(TABSTER_ATTRIBUTE_NAME, tabsterAttribute[TABSTER_ATTRIBUTE_NAME]);
    }

    const svg = document.createElementNS(SVG_NAMESPACE_URI, 'svg');
    chartWrapper.appendChild(svg);
    svg.setAttribute('width', `${this.width}`);
    svg.setAttribute('height', `${this.height}`);
    this.data.chartTitle && svg.setAttribute('aria-label', this.data.chartTitle);
    svg.classList.add('chart');

    const group = document.createElementNS(SVG_NAMESPACE_URI, 'g');
    svg.appendChild(group);
    group.setAttribute('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const pie = d3Pie<ChartDataPoint>()
      .value(d => d.data!)
      .padAngle(0.02);
    const arc = d3Arc<PieArcDatum<ChartDataPoint>>()
      .innerRadius(this.innerRadius)
      .outerRadius((Math.min(this.height, this.width) - 20) / 2);

    const tooltip = document.createElement('div');
    rootDiv.appendChild(tooltip);
    tooltip.classList.add('calloutContentRoot');

    const tooltipBody = document.createElement('div');
    tooltip.appendChild(tooltipBody);
    tooltipBody.classList.add('calloutBlockContainer');

    const legendText = document.createElement('div');
    tooltipBody.appendChild(legendText);
    legendText.classList.add('calloutLegendText');

    const yText = document.createElement('div');
    tooltipBody.appendChild(yText);
    yText.classList.add('calloutContentY');

    this.data.chartData &&
      pie(this.data.chartData).forEach(arcDatum => {
        const arcGroup = document.createElementNS(SVG_NAMESPACE_URI, 'g');
        group.appendChild(arcGroup);

        const pathOutline = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        arcGroup.appendChild(pathOutline);
        pathOutline.classList.add('focusOutline');
        pathOutline.setAttribute('d', arc(arcDatum)!);

        const path = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        arcGroup.appendChild(path);
        path.classList.add('arc');
        path.setAttribute('d', arc(arcDatum)!);
        path.setAttribute('fill', arcDatum.data.color!);
        path.setAttribute('data-id', arcDatum.data.legend!);
        path.setAttribute('tabindex', '0');
        path.setAttribute('aria-label', `${arcDatum.data.legend}, ${arcDatum.data.data}.`);
        path.setAttribute('role', 'img');

        path.addEventListener('mouseover', event => {
          if (this._selectedLegend !== '' && this._selectedLegend !== arcDatum.data.legend) {
            return;
          }

          tooltipBody.style['borderColor'] = arcDatum.data.color!;
          legendText.textContent = arcDatum.data.legend!;
          yText.textContent = `${arcDatum.data.data}`;
          yText.style['color'] = arcDatum.data.color!;
          tooltip.style['opacity'] = '1';

          const bounds = rootDiv.getBoundingClientRect();
          tooltip.style['left'] = `${event.clientX - bounds.left}px`;
          tooltip.style['top'] = `${event.clientY - bounds.top - 85}px`;
        });
        path.addEventListener('focus', event => {
          if (this._selectedLegend !== '' && this._selectedLegend !== arcDatum.data.legend) {
            return;
          }

          tooltipBody.style['borderColor'] = arcDatum.data.color!;
          legendText.textContent = arcDatum.data.legend!;
          yText.textContent = `${arcDatum.data.data}`;
          yText.style['color'] = arcDatum.data.color!;
          tooltip.style['opacity'] = '1';

          const rootBounds = rootDiv.getBoundingClientRect();
          const arcBounds = path.getBoundingClientRect();
          tooltip.style['left'] = `${arcBounds.left + arcBounds.width / 2 - rootBounds.left}px`;
          tooltip.style['top'] = `${arcBounds.top - rootBounds.top - 85}px`;
        });
        path.addEventListener('blur', event => {
          tooltip.style['opacity'] = '0';
        });
      });

    rootDiv.addEventListener('mouseleave', () => {
      tooltip.style['opacity'] = '0';
    });

    if (this.valueInsideDonut) {
      const text = document.createElementNS(SVG_NAMESPACE_URI, 'text');
      group.appendChild(text);
      text.classList.add('insideDonutString');
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

    const legends = this.data.chartData?.map(dataPoint => ({ title: dataPoint.legend!, color: dataPoint.color! }));

    const legendContainer = document.createElement('div');
    rootDiv.appendChild(legendContainer);
    legendContainer.classList.add('legendContainer');
    legendContainer.setAttribute('role', 'listbox');
    legendContainer.setAttribute('aria-label', 'Legends');

    legends?.forEach((legendItem, index) => {
      const button = document.createElement('button');
      legendContainer.appendChild(button);
      button.classList.add('legend');
      button.setAttribute('role', 'option');
      button.setAttribute('aria-setsize', `${legends.length}`);
      button.setAttribute('aria-posinset', `${index + 1}`);
      // button.setAttribute('aria-selected', `${this._selectedLegend === legendItem.title}`);

      const legendRect = document.createElement('div');
      button.appendChild(legendRect);
      legendRect.classList.add('legendRect');
      legendRect.style['backgroundColor'] = legendItem.color;
      legendRect.style['borderColor'] = legendItem.color;

      const legendText = document.createElement('div');
      button.appendChild(legendText);
      legendText.textContent = legendItem.title;
      legendText.classList.add('legendText');
    });

    const buttons = legendContainer.getElementsByClassName('legend') as HTMLCollectionOf<HTMLButtonElement>;
    const arcs = group.getElementsByClassName('arc') as HTMLCollectionOf<SVGPathElement>;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('mouseover', () => {
        if (this._selectedLegend !== '') {
          return;
        }

        for (let j = 0; j < arcs.length; j++) {
          if (arcs[j].getAttribute('data-id') !== buttons[i].textContent) {
            arcs[j].style['opacity'] = '0.1';
          } else {
            arcs[j].style['opacity'] = '1';
          }
        }
        for (let j = 0; j < buttons.length; j++) {
          const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
          const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];

          if (j !== i) {
            legendRect.style['backgroundColor'] = 'transparent';
            legendText.style['opacity'] = '0.67';
          } else {
            legendRect.style['backgroundColor'] = legends![j].color;
            legendText.style['opacity'] = '1';
          }
        }
      });
      buttons[i].addEventListener('mouseout', () => {
        if (this._selectedLegend !== '') {
          return;
        }

        for (let j = 0; j < arcs.length; j++) {
          arcs[j].style['opacity'] = '1';
        }
        for (let j = 0; j < buttons.length; j++) {
          const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
          legendRect.style['backgroundColor'] = legends![j].color;

          const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];
          legendText.style['opacity'] = '1';
        }
      });
      buttons[i].addEventListener('focus', () => {
        if (this._selectedLegend !== '') {
          return;
        }

        for (let j = 0; j < arcs.length; j++) {
          if (arcs[j].getAttribute('data-id') !== buttons[i].textContent) {
            arcs[j].style['opacity'] = '0.1';
          } else {
            arcs[j].style['opacity'] = '1';
          }
        }
        for (let j = 0; j < buttons.length; j++) {
          const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
          const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];

          if (j !== i) {
            legendRect.style['backgroundColor'] = 'transparent';
            legendText.style['opacity'] = '0.67';
          } else {
            legendRect.style['backgroundColor'] = legends![j].color;
            legendText.style['opacity'] = '1';
          }
        }
      });
      buttons[i].addEventListener('blur', () => {
        if (this._selectedLegend !== '') {
          return;
        }

        for (let j = 0; j < arcs.length; j++) {
          arcs[j].style['opacity'] = '1';
        }
        for (let j = 0; j < buttons.length; j++) {
          const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
          legendRect.style['backgroundColor'] = legends![j].color;

          const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];
          legendText.style['opacity'] = '1';
        }
      });
      buttons[i].addEventListener('click', () => {
        if (this._selectedLegend === legends![i].title) {
          this._selectedLegend = '';

          for (let j = 0; j < arcs.length; j++) {
            arcs[j].style['opacity'] = '1';
          }
          for (let j = 0; j < buttons.length; j++) {
            const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
            legendRect.style['backgroundColor'] = legends![j].color;

            const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];
            legendText.style['opacity'] = '1';
          }
        } else {
          this._selectedLegend = legends![i].title;

          for (let j = 0; j < arcs.length; j++) {
            if (arcs[j].getAttribute('data-id') !== buttons[i].textContent) {
              arcs[j].style['opacity'] = '0.1';
            } else {
              arcs[j].style['opacity'] = '1';
            }
          }
          for (let j = 0; j < buttons.length; j++) {
            const legendRect = (buttons[j].getElementsByClassName('legendRect') as HTMLCollectionOf<HTMLDivElement>)[0];
            const legendText = (buttons[j].getElementsByClassName('legendText') as HTMLCollectionOf<HTMLDivElement>)[0];

            if (j !== i) {
              legendRect.style['backgroundColor'] = 'transparent';
              legendText.style['opacity'] = '0.67';
            } else {
              legendRect.style['backgroundColor'] = legends![j].color;
              legendText.style['opacity'] = '1';
            }
          }
        }
      });
    }
  }
}
