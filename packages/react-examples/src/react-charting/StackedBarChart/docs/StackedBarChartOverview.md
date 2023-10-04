<div>
  <p>
    StackedBarChart shows the data in a bar format. It has two variations: single stacked and multi-stacked.
    The stacked bar chart comes with a legends component built in. Below are a few points that will help you
    understand the stacked bar chart variants better:
  </p>
  <h4>Single stacked bar chart</h4>
  <ul>
    <li>Single stacked bar chart takes 'data' attribute which is of type IChartDataPoint[]</li>
    <li>
      Ratio on top of the chart is shown if it has only two data points. For the rest of cases the ratio is
      not shown
    </li>
    <li>
      A number is displayed on the top of stacked bar chart if it has only one data point. This number shown
      is the data that is passed to the chart.
    </li>
    <li>
      Stacked bar chart supports specifying a target value for the chart. The target shows up as a colored
      arrow in the chart. It can be set using the targetData prop.
    </li>
    <li>
      Stacked bar chart also supports specifying a benchmark value for the chart. The benchmark shows up as a
      colored arrow in the chart. It can be set using the benchmarkData prop.
    </li>
    <li>
      Ratio and number are not shown if <code>ignoreFixStyle </code> is set to true. They are also ignored if
      <code>hideNumberDisplay</code> is set to true.
      <code>chartDataAccessibilityData</code> prop is enabled only if ratio or numbers are enabled to be
      shown.
    </li>
    <li>
      If a datapoint is marked as <code>placeHolder</code> there will be no corresponding legend.
    </li>
    <li>
      Use <code>onRenderCalloutPerDataPoint</code> to customize the hover callout content.
    </li>
    <li>
      If <code>enabledLegendsWrapLines</code> is set, long legends will be wrapped otherwise legends will be
      showed as an overflow callout
    </li>
  </ul>
  <h4>Multi stacked bar chart</h4>
  <ul>
    <li>
      Multi-stacked bar chart takes 'data' attribute which is of type IChartDataPoint[][]. It will render the
      chart based upon the values given to this attribute.
    </li>
    <li>
      MultiStackedBarChart has an option <code>hideRatio</code> which shows/hides the ratio on top right of
      the chart. It is a boolean[], one bool for each bar group. This value is applicable only when there are
      2 datapoints in the chart. Similarly there is an option <code>hideDenominator</code> to hide the
      denominator of the ratio if it is enabled.
    </li>
    <li>
      If a datapoint is marked as <code>placeHolder</code> there will be no corresponding legend. The default
      color of placeholder data is tertiary grey.
    </li>
    <li>
      If a chart in MultiStackedBarChart shows ratio or number, legends are not displayed for that chart and
      vice-versa.
    </li>
    <li>
      A number is displayed on the top of stacked bar chart if it has only one data point. This number shown
      is the datapoint that is passed to the chart.
    </li>
  </ul>
</div>
