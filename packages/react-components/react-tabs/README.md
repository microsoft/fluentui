# @fluentui/react-tabs

**React Tabs components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

- A `TabList` provides single selection from a list of tabs.
- When a `Tab` is selected, the content associated with the selected tab is displayed and other content is hidden.
- A `TabList` has options to control how tabs are displayed:
  - horizontal or vertical
  - transparent or subtle appearance
  - small or medium size tabs
- Each `Tab` typically contains a text header and often includes an icon.

## Usage

To display tabs, declare a `TabList` with a list of `Tab` components as children.

Text is typically used within each tab, but you can place any content you like.
You can add an icon to a tab through the `icon` property.

Each `Tab` requires a unique `value`.
The value is passed as part of the data parameter when a tab is clicked and the `onTabSelect` event is raised.
The `selectedValue` property allows you to control the selected tab.

```tsx
import { SelectTabData, SelectTabEvent, TabList, Tab } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const TabExample = () => {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>('conditions');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    console.log(`The ${data.value} tab was selected`);
    setSelectedValue(data.value);
  };

  return (
    <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
      <Tab value="tab1">First Tab</Tab>
      <Tab value="tab2" icon={<CalendarMonthRegular />}>
        Second Tab
      </Tab>
      <Tab value="tab3">Third Tab</Tab>
      <Tab value="tab4">Fourth Tab</Tab>
    </TabList>
  );
};
```

### More information

See [SPEC.md](./Spec.md) to learn more specifics how the `TabList` and `Tab` were built.
