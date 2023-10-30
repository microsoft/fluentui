### Layout

- The donut chart’s behavior is simple in application. The data is ordered from largest to smallest in clockwise direction and users can single out individual segments for clarity.
- For high cardinality scenarios where the slices are very small, they can be grouped together to form a bigger slice to improve readability.
- The chart is centered in the available screen space. The default chart diameter is 140px and bar width is 16px. This matches the width of bars in bar charts to achieve balanced scale. The size can be adjusted with responsive chart behavior, where the size of the chart and bar diameter grows proportionally in units of 4px.
- Always try to balance the visual weight of the bars in relationship to the rest of the app.
- Segments are separated by a 2px gap to maximize readability. Segment labels should be always displayed for easier chart comprehension.
- Minimum padding around the chart is 16px. It also applies to the version with labels to accommodate space for labels. There is a 2px space between the chart and the label. The label is centered in relationship to the slice it describes. That can be offset if an overlap happens between 2 labels.

### Content

- The donut chart consists of segments arranged clockwise from large to small. The total circle equates to 100% of the data. The segments can use custom formatting, but all values must add up to 100%. Tiny segments may be grouped and shown visually as 'Others'.
- The label string inside the donut should be concise and contain numerical information with limited or no explanation.

### Accessibility

- Users "Enter" into the graph and can use both arrowing and tabbing to navigate through.
- The first tab stop will stop on the graph and give a description of what type of graph it is.
- Each segment can define its own accessibility label to help the user understand the data better.
