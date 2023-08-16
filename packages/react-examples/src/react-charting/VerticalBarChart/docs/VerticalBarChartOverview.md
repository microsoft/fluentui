<div>
  <p>
    A vertical bar chart is used to show comparisons between categories of data, usually over a period of
    time. Categories and time are typically shown along the horizontal axis, while the data values are shown
    along the vertical axis.
  </p>
  <p>
    The bar widths are proportional to the number of bars and space available within the charting area. The
    bar width can be changed using the <code>barWidth</code> property.
  </p>
  <br />
  <h3>Implementation details</h3>
  <p>
    The current vertical bar charts implementation is in the cartesian coordinate system. The cartesian
    coordinate system is represented by Cartesian Chart which serves as the base class for vertical bar charts
  </p>
  <p>
    The chart provides an option to select a color scale based on the range of y values. Similar y values will
    end up having similar color. Use the <code>colors</code> attribute to define the color scale.
  </p>
  <p>
    Use <code>useSingleColor</code> to use a single color for all bars.
  </p>
  <p>
    Use <code>lineLegendText and lineLegendColor</code> to specify the text and color for legends of lines in
    the chart.
  </p>
  <p>
    The bar labels are shown by default. Set the <code>hideLabels</code> prop to hide them.
  </p>
</div>
