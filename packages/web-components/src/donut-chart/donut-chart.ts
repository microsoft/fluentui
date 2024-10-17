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

  private _selectedLegend: string = '';

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

    pie(this.data.chartData).forEach(d => {
      const path = document.createElementNS(svgNS, 'path');
      group.appendChild(path);
      path.setAttribute('d', arc(d));
      path.setAttribute('fill', d.data.color);
      path.setAttribute('data-id', d.data.legend);
      path.setAttribute('tabindex', '0');
      path.setAttribute('aria-label', `${d.data.legend}, ${d.data.data}.`);
      path.setAttribute('role', 'img');
      path.addEventListener('mouseover', event => {
        if (this._selectedLegend !== '' && this._selectedLegend !== d.data.legend) {
          return;
        }

        tooltipBody.style['borderLeft'] = `4px solid ${d.data.color}`;
        legendText.textContent = d.data.legend;
        yText.textContent = d.data.data;
        yText.style['color'] = d.data.color;
        tooltip.style['opacity'] = '1';

        const bounds = rootDiv.getBoundingClientRect();
        tooltip.style['left'] = `${event.clientX - bounds.left}px`;
        tooltip.style['top'] = `${event.clientY - bounds.top - 85}px`;
      });
      path.addEventListener('focus', event => {
        if (this._selectedLegend !== '' && this._selectedLegend !== d.data.legend) {
          return;
        }

        tooltipBody.style['borderLeft'] = `4px solid ${d.data.color}`;
        legendText.textContent = d.data.legend;
        yText.textContent = d.data.data;
        yText.style['color'] = d.data.color;
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
          if (j !== i) {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = 'transparent';

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
            legendText.style['opacity'] = '0.67';
          } else {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = legends[j].color;

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
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
          const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
          legendRect.style['backgroundColor'] = legends[j].color;

          const legendText = buttons[j].getElementsByClassName('legendText')[0];
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
          if (j !== i) {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = 'transparent';

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
            legendText.style['opacity'] = '0.67';
          } else {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = legends[j].color;

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
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
          const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
          legendRect.style['backgroundColor'] = legends[j].color;

          const legendText = buttons[j].getElementsByClassName('legendText')[0];
          legendText.style['opacity'] = '1';
        }
      });
      buttons[i].addEventListener('click', () => {
        if (this._selectedLegend === legends[i].title) {
          this._selectedLegend = '';

          for (let j = 0; j < arcs.length; j++) {
            arcs[j].style['opacity'] = '1';
          }
          for (let j = 0; j < buttons.length; j++) {
            const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
            legendRect.style['backgroundColor'] = legends[j].color;

            const legendText = buttons[j].getElementsByClassName('legendText')[0];
            legendText.style['opacity'] = '1';
          }
        } else {
          this._selectedLegend = legends[i].title;

          for (let j = 0; j < arcs.length; j++) {
            if (arcs[j].getAttribute('data-id') !== buttons[i].textContent) {
              arcs[j].style['opacity'] = '0.1';
            } else {
              arcs[j].style['opacity'] = '1';
            }
          }
          for (let j = 0; j < buttons.length; j++) {
            if (j !== i) {
              const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
              legendRect.style['backgroundColor'] = 'transparent';

              const legendText = buttons[j].getElementsByClassName('legendText')[0];
              legendText.style['opacity'] = '0.67';
            } else {
              const legendRect = buttons[j].getElementsByClassName('legendRect')[0];
              legendRect.style['backgroundColor'] = legends[j].color;

              const legendText = buttons[j].getElementsByClassName('legendText')[0];
              legendText.style['opacity'] = '1';
            }
          }
        }
      });
    }
  }
}
