<div>
  <p>
    StackedBarChart shows the data in a bar format. It has two variations: single stacked and multi-stacked.
    Below are a few points that will help you understand the multi stacked bar chart better:
  </p>
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
    <li>
      The bar labels are shown by default in the absolute-scale variant. Set the <code>hideLabels</code> prop
      to hide them.
    </li>
  </ul>
</div>
