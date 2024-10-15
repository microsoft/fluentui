import { attr, FASTElement } from '@microsoft/fast-element';
import { arc as d3Arc, pie as d3Pie } from 'd3';
import { createTabster, getMover, getTabsterAttribute, MoverDirections } from 'tabster';
import { IChartDataPoint, IChartProps } from './donut-chart.options.js';

const tabsterCore = createTabster(window);
getMover(tabsterCore);

export class DonutChart extends FASTElement {
  public get type(): 'donut-chart' {
    return 'donut-chart';
  }

  @attr
  public height?: number = 200;

  @attr
  public width?: number = 200;

  // @attr({ attribute: 'hide-legends' })
  // public hideLegends?: boolean;

  // @attr({ attribute: 'hide-tooltip' })
  // public hideTooltip?: boolean;

  @attr
  public data: IChartProps;

  @attr({ attribute: 'inner-radius' })
  public innerRadius?: number;

  @attr({ attribute: 'value-inside-donut' })
  public valueInsideDonut?: string = '35,000';

  // @attr({ attribute: 'show-labels-in-percent' })
  // public showLabelsInPercent?: boolean;

  // @attr({ attribute: 'hide-labels' })
  // public hideLabels?: boolean;

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

    this.data = {
      chartTitle: 'Donut chart basic example',
      chartData: points,
    };
  }

  private bindEvents() {}

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render() {
    const rootDiv = document.createElement('div');
    this.shadowRoot?.appendChild(rootDiv);
    rootDiv.classList.add('root');

    const chartWrapper = document.createElement('div');
    rootDiv.appendChild(chartWrapper);
    const attributeObj = getTabsterAttribute({
      mover: { direction: MoverDirections.Horizontal, tabbable: true },
    });
    Object.keys(attributeObj).forEach(x => chartWrapper.setAttribute(x, attributeObj[x]));

    const svgNS = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(svgNS, 'svg');
    chartWrapper.appendChild(svg);
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.setAttribute('aria-label', this.data.chartTitle);
    svg.classList.add('chart');

    const group = document.createElementNS(svgNS, 'g');
    svg.appendChild(group);
    group.setAttribute('transform', 'translate(100, 100)');

    const text = document.createElementNS(svgNS, 'text');
    group.appendChild(text);
    text.classList.add('insideDonutString');
    text.setAttribute('y', '5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.textContent = this.valueInsideDonut;

    const pie = d3Pie()
      .value((d: any) => d.data)
      .padAngle(0.02);
    const arc = d3Arc().innerRadius(55).outerRadius(90);

    const tooltip = document.createElement('div');
    rootDiv.appendChild(tooltip);
    tooltip.style['position'] = 'absolute';
    tooltip.style['opacity'] = '0';

    const legendText = document.createElement('div');
    tooltip.appendChild(legendText);

    const yText = document.createElement('div');
    tooltip.appendChild(yText);

    pie(this.data.chartData).forEach(d => {
      const path = document.createElementNS(svgNS, 'path');
      group.appendChild(path);
      path.setAttribute('d', arc(d));
      path.setAttribute('fill', d.data.color);
      path.setAttribute('data-id', d.data.legend);
      path.setAttribute('tabindex', '0');
      path.setAttribute('aria-label', '.....lorem ipsum.....');
      path.setAttribute('role', 'img');
      path.addEventListener('mouseover', event => {
        legendText.textContent = d.data.legend;
        yText.textContent = d.data.data;
        tooltip.style['opacity'] = '1';
        tooltip.style['left'] = `${event.pageX - rootDiv.getBoundingClientRect().left + window.scrollX}px`;
        tooltip.style['top'] = `${event.pageY - rootDiv.getBoundingClientRect().top - window.scrollY}px`;
        // tooltip.style['pointerEvents'] = 'none';
      });
    });

    rootDiv.addEventListener('mouseleave', () => {
      tooltip.style['opacity'] = '0';
    });

    const legends = this.data.chartData?.map(d => ({ title: d.legend, color: d.color }));

    const legendContainer = document.createElement('div');
    rootDiv.appendChild(legendContainer);
    legendContainer.classList.add('legendContainer');

    legends?.forEach(d => {
      const button = document.createElement('button');
      legendContainer.appendChild(button);
      button.classList.add('legend');

      const legendRect = document.createElement('div');
      button.appendChild(legendRect);
      legendRect.classList.add('legendRect');
      legendRect.style['backgroundColor'] = d.color;
      legendRect.style['borderColor'] = d.color;

      const legendText = document.createElement('div');
      button.appendChild(legendText);
      legendText.textContent = d.title;
      legendText.classList.add('legendText');
    });

    const buttons = legendContainer.getElementsByTagName('button');
    const arcs = group.getElementsByTagName('path');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('mouseover', () => {
        for (let j = 0; j < arcs.length; j++) {
          if (arcs[j].getAttribute('data-id') !== buttons[i].textContent) {
            arcs[j].style['opacity'] = '0.1';
          }
        }
        for (let j = 0; j < buttons.length; j++) {
          if (j !== i) {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = 'transparent';

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
            legendText.style['opacity'] = '0.67';
          }
        }
      });
      buttons[i].addEventListener('mouseout', () => {
        for (let j = 0; j < arcs.length; j++) {
          arcs[j].style['opacity'] = '1';
        }
        for (let j = 0; j < buttons.length; j++) {
          const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
          legendRect.style['backgroundColor'] = legends[j].color;

          const legendText = buttons[j].getElementsByClassName('legendText')[0];
          legendText.style['opacity'] = '1';
        }
      });
    }
  }
}
