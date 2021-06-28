### Accessibility

By default, `Breadcrumb` uses arrow keys to cycle through each item. If you would like to add the ability to tab through each
item, simply pass `focusZoneProps={{ handleTabKey: 1 }}` as prop. Using tab for links and buttons is an expected interaction so we recommend passing this prop; however, it's currently not the default behavior for legacy support.
