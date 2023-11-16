### Layout

The library recommends a few size width and height options for charts. Product teams must consider the complexity of the data to decide what size should be used in implementation. There are 6 size options for the gauge, ranging from very small to very large. The default size is medium, with a diameter of 140px and default bar width of 16px. All have a margin of 16px on all sides.

### Content

- **Bar** This is the arc representing the semi-circle.
- **Min and max values** Used to represent minimum and maximum values for the data being measured. These can either be an absolute value or a percentage.
- **Data segment** This represents the current value as a part of the whole scale. For rating meter, it shows the relative scale of each segment.
- **Current value indicator / needle** Used to show user’s position on the semi-circular graph.
- **Chart value** This can be a number out of another (part to whole) or represented as a percentage.

### Accessibility

- Users 'Enter' into the graph and can use both arrowing and tabbing to navigate through.
- The first tab stop will stop on the graph and give a description of what type of graph it is.
- Each section of the graph is readable via a screen reader.

### Customizing the chart

- The diameter of the gauge depends upon the `width` and `height` props passed to the chart. If the props are omitted, a default diameter of `140px` will be used.
- To render a title above the gauge, set the `chartTitle` prop.
- The needle position depends upon the required `chartValue` prop.
- Use the required `segments` prop to divide the gauge into colored sections. These sections can have fixed sizes, or the users can choose to create a sweeping effect by varying the segment size with the `chartValue`.
- Set the `minValue` prop if the minimum value of the gauge is different than 0. A placeholder segment will be rendered if the `maxValue` prop is greater than the total size of the segments.
- To render an additional text below the `chartValue`, set the `sublabel` prop.
- To hide the minimum and maximum values of the gauge, set the `hideMinMax` prop.
- The `chartValue` prop is rendered as a percentage by default. Set the `chartVaueFormat` prop to `fraction` or a formatter function.
