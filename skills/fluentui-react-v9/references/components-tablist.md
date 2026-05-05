# Components/TabList

A tab list provides single selection from tabs. When a tab is selected, the application displays content associated with the selected tab and hides other content.

Each tab typically contains a text header and often includes an icon.

## Best practices

### Do

- Use on content-heavy pages that require a significant amount of scrolling to access the various sections.
- Be concise on the tab names, ideally one or two words rather than a phrase.
- When tabs have icons but not text labels, use `aria-label` to describe the tab.

### Don't

- Use a tab to open a new page or take other actions than showing content.
- Use a tab list for routed navigation in an application.

## Props

| Name                      | Type                                                         | Required | Default       | Description                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------ | -------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                      | `"div"`                                                      | No       |               |                                                                                                                                                                                                                                                                                                                                                                |
| `appearance`              | `"subtle" "transparent" "subtle-circular" "filled-circular"` | No       | 'transparent' | A tab list can supports 'transparent' and 'subtle' appearance. - 'subtle': Minimizes emphasis to blend into the background until hovered or focused. - 'transparent': No background and border styling - 'subtle-circular': Adds background and border styling - 'filled-circular': Adds background styling The appearance affects each of the contained tabs. |
| `reserveSelectedTabSpace` | `boolean`                                                    | No       | true          | Tab size may change between unselected and selected states. The default scenario is a selected tab has bold text. When true, this property requests tabs be the same size whether unselected or selected.                                                                                                                                                      |
| `defaultSelectedValue`    | `unknown`                                                    | No       |               | The value of the tab to be selected by default. Typically useful when the selectedValue is uncontrolled.                                                                                                                                                                                                                                                       |
| `disabled`                | `boolean`                                                    | No       | false         | A tab list can be set to disable interaction.                                                                                                                                                                                                                                                                                                                  |
| `onTabSelect`             | `SelectTabEventHandler`                                      | No       |               | Raised when a tab is selected.                                                                                                                                                                                                                                                                                                                                 |
| `selectTabOnFocus`        | `boolean`                                                    | No       | false         | When true, focusing a tab will select it.                                                                                                                                                                                                                                                                                                                      |
| `selectedValue`           | `unknown`                                                    | No       |               | The value of the currently selected tab.                                                                                                                                                                                                                                                                                                                       |
| `size`                    | `"small" "medium" "large"`                                   | No       | 'medium'      | A tab list can be either 'small', 'medium', or 'large' size. The size affects each of the contained tabs.                                                                                                                                                                                                                                                      |
| `vertical`                | `boolean`                                                    | No       | false         | A tab list can arrange its tabs vertically.                                                                                                                                                                                                                                                                                                                    |
| `ref`                     | `Ref<HTMLDivElement>`                                        | No       |               |                                                                                                                                                                                                                                                                                                                                                                |

## Subcomponents

### Tab

A tab provides a selectable item in a tab list.

#### Props

| Name      | Type                                                                                                                                                     | Required | Default | Description                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`      | `"button"`                                                                                                                                               | No       |         |                                                   |
| `icon`    | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }>             | null`    | No      |                                                   | Icon that renders before the content.                                                                                                          |
| `content` | `NonNullable<WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null>`   | No      |                                                   | Component children are placed in this slot Avoid using the `children` property in this slot in favour of Component children whenever possible. |
| `value`   | `unknown`                                                                                                                                                | Yes      |         | The value that identifies this tab when selected. |
| `ref`     | `Ref<HTMLButtonElement>`                                                                                                                                 | No       |         |                                                   |

## Examples

### Appearance

A tab list can have a `transparent`, `subtle`, `subtle-circular` and `filled-circular` appearance. The default is `transparent`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab disabled value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab3" appearance="transparent">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="subtle">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="subtle-circular">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="filled-circular">
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Default = (props: Partial<TabListProps>): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList {...props}>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};
```

### Disabled

A tab list can disable interaction for all its tabs. The default is `false`. Individual tabs can also be disabled.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Disabled = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" disabled>
        <Tab icon={<CalendarMonth />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
      <TabList defaultSelectedValue="tab2">
        <Tab icon={<CalendarMonth />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab2" disabled>
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab3" disabled>
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
    </div>
  );
};
```

### Horizontal

The tabs within a tab list are arranged horzontally by default.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Horizontal = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2">
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};
```

### Icon Only

Tabs can have an `icon` slot filled and no content..

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const IconOnly = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonth />} value="tab1" aria-label="First Tab" />
        <Tab icon={<CalendarMonth />} value="tab2" aria-label="Second Tab" />
        <Tab icon={<CalendarMonth />} value="tab3" aria-label="Third Tab" />
        <Tab icon={<CalendarMonth />} value="tab4" aria-label="Fourth Tab" />
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2">{renderTabs()}</TabList>
      <TabList defaultSelectedValue="tab2" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Select Tab On Focus

A tab list can select tabs whenever a tab is focused.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const SelectTabOnFocus = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" selectTabOnFocus={true}>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Size Large

A tab list can have `large` tabs.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const SizeLarge = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="large">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="large" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Size Medium

A tab list can have `medium` tabs (default).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const SizeMedium = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="medium">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="medium" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Size Small

A tab list can have `small` tabs.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const SizeSmall = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="small">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="small" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### Vertical

The tabs within a tab list can be arranged vertically. The default is false.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Vertical = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" vertical>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};
```

### With Icon

A tab has an `icon` slot to display an icon before the tab content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const WithIcon = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonth />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab4">
          Fourth Tab
        </Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2">{renderTabs()}</TabList>
      <TabList defaultSelectedValue="tab2" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};
```

### With Overflow

A tab list can support overflow by using Overflow and OverflowItem.

**Note**: when adding custom buttons to a tablist, e.g. the overflow button in this example,`role="tab"` must be manually added for screen reader accessibility.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  makeStyles,
  mergeClasses,
  tokens,
  Button,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tab,
  TabList,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Overflow,
  OverflowItem,
} from '@fluentui/react-components';
import {
  Calendar3DayRegular,
  CalendarAgendaRegular,
  CalendarChatRegular,
  CalendarDayRegular,
  CalendarMonthRegular,
  CalendarSearchRegular,
  CalendarTodayRegular,
  CalendarWeekStartRegular,
  CalendarWorkWeekRegular,
  MoreHorizontalRegular,
  Calendar3DayFilled,
  CalendarAgendaFilled,
  CalendarChatFilled,
  CalendarDayFilled,
  CalendarMonthFilled,
  CalendarSearchFilled,
  CalendarTodayFilled,
  CalendarWeekStartFilled,
  CalendarWorkWeekFilled,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const Calendar3Day = bundleIcon(Calendar3DayFilled, Calendar3DayRegular);
const CalendarAgenda = bundleIcon(CalendarAgendaFilled, CalendarAgendaRegular);
const CalendarChat = bundleIcon(CalendarChatFilled, CalendarChatRegular);
const CalendarDay = bundleIcon(CalendarDayFilled, CalendarDayRegular);
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const CalendarSearch = bundleIcon(CalendarSearchFilled, CalendarSearchRegular);
const CalendarToday = bundleIcon(CalendarTodayFilled, CalendarTodayRegular);
const CalendarWeekStart = bundleIcon(CalendarWeekStartFilled, CalendarWeekStartRegular);
const CalendarWorkWeek = bundleIcon(CalendarWorkWeekFilled, CalendarWorkWeekRegular);
const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

//----- Example Tab Data -----//

type ExampleTab = {
  id: string;
  name: string;
  icon: React.ReactElement;
};

const tabs: ExampleTab[] = [
  {
    id: 'today',
    name: 'Today',
    icon: <CalendarToday />,
  },
  {
    id: 'agenda',
    name: 'Agenda',
    icon: <CalendarAgenda />,
  },
  {
    id: 'day',
    name: 'Day',
    icon: <CalendarDay />,
  },
  {
    id: 'threeDay',
    name: 'Three Day',
    icon: <Calendar3Day />,
  },
  {
    id: 'workWeek',
    name: 'Work Week',
    icon: <CalendarWorkWeek />,
  },
  {
    id: 'week',
    name: 'Week',
    icon: <CalendarWeekStart />,
  },
  {
    id: 'month',
    name: 'Month',
    icon: <CalendarMonth />,
  },
  {
    id: 'search',
    name: 'Search',
    icon: <CalendarSearch />,
  },
  {
    id: 'chat',
    name: 'Conversations',
    icon: <CalendarChat />,
  },
];

//----- OverflowMenuItem -----//

type OverflowMenuItemProps = {
  tab: ExampleTab;

  onClick: MenuItemProps['onClick'];
};

/**
 * A menu item for an overflow menu that only displays when the tab is not visible
 */
const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { tab, onClick } = props;
  const isVisible = useIsOverflowItemVisible(tab.id);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem key={tab.id} icon={tab.icon} onClick={onClick}>
      <div>{tab.name}</div>
    </MenuItem>
  );
};

//----- OverflowMenu -----//

const useOverflowMenuStyles = makeStyles({
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  menuButton: {
    alignSelf: 'center',
  },
});

type OverflowMenuProps = {
  onTabSelect?: (tabId: string) => void;
};

/**
 * A menu for selecting tabs that have overflowed and are not visible.
 */
const OverflowMenu = (props: OverflowMenuProps) => {
  const { onTabSelect } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const styles = useOverflowMenuStyles();

  const onItemClick = (tabId: string) => {
    onTabSelect?.(tabId);
  };

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          className={styles.menuButton}
          ref={ref}
          icon={<MoreHorizontal />}
          aria-label={`${overflowCount} more tabs`}
          role="tab"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menu}>
          {tabs.map(tab => (
            <OverflowMenuItem key={tab.id} tab={tab} onClick={() => onItemClick(tab.id)} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

//----- Stories -----//

const useExampleStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
    padding: '5px',
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
  },
  horizontal: {
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '600px',
  },
  vertical: {
    height: '250px',
    minHeight: '100px',
    resize: 'vertical',
    width: 'fit-content',
    display: 'flex',
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    justifyItems: 'stretch',
  },
});

const HorizontalExample = () => {
  const styles = useExampleStyles();

  const [selectedTabId, setSelectedTabId] = React.useState<string>('today');

  const onTabSelect = (tabId: string) => {
    setSelectedTabId(tabId);
  };

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Overflow minimumVisible={2}>
        <TabList selectedValue={selectedTabId} onTabSelect={(_, d) => onTabSelect(d.value as string)}>
          {tabs.map(tab => {
            return (
              <OverflowItem key={tab.id} id={tab.id} priority={tab.id === selectedTabId ? 2 : 1}>
                <Tab value={tab.id} icon={<span>{tab.icon}</span>}>
                  {tab.name}
                </Tab>
              </OverflowItem>
            );
          })}
          <OverflowMenu onTabSelect={onTabSelect} />
        </TabList>
      </Overflow>
    </div>
  );
};

const VerticalExample = () => {
  const styles = useExampleStyles();

  const [selectedTabId, setSelectedTabId] = React.useState<string>('today');

  const onTabSelect = (tabId: string) => {
    setSelectedTabId(tabId);
  };

  return (
    <div className={mergeClasses(styles.example, styles.vertical)}>
      <Overflow minimumVisible={2} overflowAxis="vertical">
        <TabList vertical selectedValue={selectedTabId} onTabSelect={(_, d) => onTabSelect(d.value as string)}>
          {tabs.map(tab => {
            return (
              <OverflowItem key={tab.id} id={tab.id} priority={tab.id === selectedTabId ? 2 : 1}>
                <Tab value={tab.id} icon={<span>{tab.icon}</span>}>
                  {tab.name}
                </Tab>
              </OverflowItem>
            );
          })}
          <OverflowMenu onTabSelect={onTabSelect} />
        </TabList>
      </Overflow>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'auto',
    padding: '50px 20px',
    rowGap: '20px',
    minHeight: '600px', //lets the page remain at a minimum height when vertical tabs are resized
  },
});
export const WithOverflow = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <HorizontalExample />
      <VerticalExample />
    </div>
  );
};
```

### With Panels

A tab list can be used to show/hide UI when a tab is selected.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Tab, TabList } from '@fluentui/react-components';
import {
  AirplaneRegular,
  AirplaneFilled,
  AirplaneTakeOffRegular,
  AirplaneTakeOffFilled,
  TimeAndWeatherRegular,
  TimeAndWeatherFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';

const Airplane = bundleIcon(AirplaneFilled, AirplaneRegular);
const AirplaneTakeOff = bundleIcon(AirplaneTakeOffFilled, AirplaneTakeOffRegular);
const TimeAndWeather = bundleIcon(TimeAndWeatherFilled, TimeAndWeatherRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  panels: {
    padding: '0 10px',
    '& th': {
      textAlign: 'left',
      padding: '0 30px 0 0',
    },
  },
  propsTable: {
    '& td:first-child': {
      fontWeight: tokens.fontWeightSemibold,
    },
    '& td': {
      padding: '0 30px 0 0',
    },
  },
});

export const WithPanels = (): JSXElement => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = React.useState<TabValue>('conditions');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const Arrivals = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Arrivals">
      <table>
        <thead>
          <th>Origin</th>
          <th>Gate</th>
          <th>ETA</th>
        </thead>
        <tbody>
          <tr>
            <td>DEN</td>
            <td>C3</td>
            <td>12:40 PM</td>
          </tr>
          <tr>
            <td>SMF</td>
            <td>D1</td>
            <td>1:18 PM</td>
          </tr>
          <tr>
            <td>SFO</td>
            <td>E18</td>
            <td>1:42 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  const Departures = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Departures">
      <table>
        <thead>
          <th>Destination</th>
          <th>Gate</th>
          <th>ETD</th>
        </thead>
        <tbody>
          <tr>
            <td>MSP</td>
            <td>A7</td>
            <td>8:26 AM</td>
          </tr>
          <tr>
            <td>DCA</td>
            <td>N2</td>
            <td>9:03 AM</td>
          </tr>
          <tr>
            <td>LAS</td>
            <td>E15</td>
            <td>2:36 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  const Conditions = React.memo(() => (
    <div role="tabpanel" aria-labelledby="Conditions">
      <table className={styles.propsTable}>
        <tbody>
          <tr>
            <td>Time</td>
            <td>6:45 AM</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>68F / 20C</td>
          </tr>
          <tr>
            <td>Forecast</td>
            <td>Overcast</td>
          </tr>
          <tr>
            <td>Visibility</td>
            <td>0.5 miles, 1800 ft runway visual range</td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="Arrivals" icon={<Airplane />} value="arrivals">
          Arrivals
        </Tab>
        <Tab id="Departures" icon={<AirplaneTakeOff />} value="departures">
          Departures
        </Tab>
        <Tab id="Conditions" icon={<TimeAndWeather />} value="conditions">
          Conditions
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === 'arrivals' && <Arrivals />}
        {selectedValue === 'departures' && <Departures />}
        {selectedValue === 'conditions' && <Conditions />}
      </div>
    </div>
  );
};
```
