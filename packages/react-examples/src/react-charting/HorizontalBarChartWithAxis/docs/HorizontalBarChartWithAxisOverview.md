<div>
  <p>
    Use a horizontal bar graph to compare between different values that are hierarchically equivalent. The
    rectangular bar length is proportional to the values they represent. There will always be a maximum data
    value (color) that is used to represent the total length.
  </p>
  <p>
    The bar widths are proportional to the number of bars and space available within the charting area. The
    bar width can be changed using the <code>barWidth</code> property.
  </p>
  <h3>Implementation details</h3>
  <p>
    The chart provides an option to select a color scale based on the range of x values. Similar x values will
    end up having similar color. Use the <code>colors</code> attribute to define the color scale.
  </p>
  <p>
    Use <code>useSingleColor</code> to use a single color for all bars.
  </p>
  <p>
    See <code>onRenderCalloutPerHorizontalBar</code> prop to customize the hover callout.
  </p>
  <p>
    If the y data points are of String there are 2 modes to view them, the first to truncates yaxis labels
    using showYAxisLablesTooltip and the second enables to view the complete labels using expandYAxisLabels.
  </p>
</div>
