import { FASTElement } from '@microsoft/fast-element';
import * as d3 from 'd3';

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

  constructor() {
    super();
  }

  private bindEvents() {}

  connectedCallback() {
    this.render();
  }

  render() {
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
}
