import { select as d3Select } from 'd3-selection';

/**
 * This method displays a tooltip to the x axis lables(tick values)
 * when prop 'showXAxisLablesTooltip' enables to the respected chart.
 * On hover of the truncated word(at x axis labels tick), a tooltip will be appeared.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tooltipOfXAxislabels(xAxistooltipProps: any): any {
  const { xAxis, div } = xAxistooltipProps;
  const xAxisSelection = d3Select(xAxis);
  const ticks = xAxisSelection.selectAll('.tick');
  const originalDataArray: string[] = [];
  ticks.each(function () {
    const tick = d3Select(this);
    const tspanElements = tick.selectAll('tspan');
    tspanElements.each(function () {
      const tspan = d3Select(this);
      const originalData = tspan.attr('data-');
      if (originalData) {
        originalDataArray.push(originalData);
      }
    });
  });

  // Add tooltip functionality
  ticks.each(function (d, i) {
    const tick = d3Select(this);
    tick
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on('mouseover', (event: any) => {
        d3Select(div).style('opacity', 0.9);
        d3Select(div)
          .html(originalDataArray[i])
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        d3Select(div).style('opacity', 0);
      });
  });
}
