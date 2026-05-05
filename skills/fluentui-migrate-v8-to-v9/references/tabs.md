# Tabs Migration (Pivot → TabList)

## Architecture Change

In v8 (`Pivot`), tab labels and tab content are co-located inside `PivotItem` children.

In v9 (`TabList`), `Tab` children are the **label only**. Tab content lives **outside** `TabList` and is shown/hidden by state.

## Before / After Example

### Before

```tsx
import { Pivot, PivotItem } from '@fluentui/react';

<Pivot>
  <PivotItem headerText="First Tab">
    <p>Content for first tab</p>
  </PivotItem>
  <PivotItem headerText="Second Tab">
    <p>Content for second tab</p>
  </PivotItem>
  <PivotItem headerText="Third Tab">
    <p>Content for third tab</p>
  </PivotItem>
</Pivot>;
```

### After

```tsx
import * as React from 'react';
import { TabList, Tab } from '@fluentui/react-components';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';

const [selectedValue, setSelectedValue] = React.useState<TabValue>('tab1');

const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
  setSelectedValue(data.value);
};

<>
  <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
    <Tab value="tab1">First Tab</Tab>
    <Tab value="tab2">Second Tab</Tab>
    <Tab value="tab3">Third Tab</Tab>
  </TabList>

  <div>
    {selectedValue === 'tab1' && <p>Content for first tab</p>}
    {selectedValue === 'tab2' && <p>Content for second tab</p>}
    {selectedValue === 'tab3' && <p>Content for third tab</p>}
  </div>
</>;
```

## Tab with Icon

```tsx
// v8
<PivotItem headerText="Files" itemIcon="Folder" />;

// v9
import { FolderRegular } from '@fluentui/react-icons';
<Tab value="files" icon={<FolderRegular />}>
  Files
</Tab>;
```

## Pivot → TabList Prop Mapping

| v8 `Pivot`           | v9 `TabList`               | Notes                |
| -------------------- | -------------------------- | -------------------- |
| `componentRef`       | `ref`                      |                      |
| `className`          | `className`                |                      |
| `defaultSelectedKey` | `defaultSelectedValue`     |                      |
| `selectedKey`        | `selectedValue`            |                      |
| `onLinkClick`        | `onTabSelect`              | New event signature  |
| `linkSize`           | `size`                     |                      |
| `focusZoneProps`     | —                          | Removed              |
| `getTabId`           | —                          | Removed              |
| `headersOnly`        | —                          | Removed              |
| `linkFormat`         | —                          | Removed              |
| `overflowAriaLabel`  | —                          | Removed              |
| `overflowBehavior`   | —                          | Removed              |
| `styles`             | `className` + `makeStyles` |                      |
| `theme`              | —                          | Use `FluentProvider` |
| —                    | `appearance`               | New in v9            |
| —                    | `vertical`                 | New in v9            |

## PivotItem → Tab Prop Mapping

| v8 `PivotItem`      | v9 `Tab`     | Notes                                     |
| ------------------- | ------------ | ----------------------------------------- |
| `componentRef`      | `ref`        |                                           |
| `headerText`        | `children`   | Move text to JSX children                 |
| `itemKey`           | `value`      |                                           |
| `itemIcon`          | `icon` slot  | Pass `<IconComponent />`                  |
| `ariaLabel`         | `aria-label` |                                           |
| `linkText`          | —            | Removed                                   |
| `headerButtonProps` | —            | Removed                                   |
| `itemCount`         | —            | Removed                                   |
| `onRenderItemLink`  | —            | Removed                                   |
| `keytipProps`       | —            | Removed                                   |
| `alwaysRender`      | —            | Removed; manage rendering in content area |
