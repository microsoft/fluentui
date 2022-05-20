import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
// eslint-disable-next-line import/no-extraneous-dependencies
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
} from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { Overflow, OverflowItem, useIsOverflowItemVisible, useOverflowMenu } from '@fluentui/react-overflow';
import { tokens } from '@fluentui/react-theme';

import { TabList } from '../TabList';
import { Tab } from '../Tab';

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
    icon: <CalendarTodayRegular />,
  },
  {
    id: 'agenda',
    name: 'Agenda',
    icon: <CalendarAgendaRegular />,
  },
  {
    id: 'day',
    name: 'Day',
    icon: <CalendarDayRegular />,
  },
  {
    id: 'threeDay',
    name: 'Three Day',
    icon: <Calendar3DayRegular />,
  },
  {
    id: 'workWeek',
    name: 'Work Week',
    icon: <CalendarWorkWeekRegular />,
  },
  {
    id: 'week',
    name: 'Week',
    icon: <CalendarWeekStartRegular />,
  },
  {
    id: 'month',
    name: 'Month',
    icon: <CalendarMonthRegular />,
  },
  {
    id: 'search',
    name: 'Search',
    icon: <CalendarSearchRegular />,
  },
  {
    id: 'chat',
    name: 'Conversations',
    icon: <CalendarChatRegular />,
  },
];

//----- OverflowMenuItem -----//

type OverflowMenuItemProps = {
  tab: ExampleTab;
  onClick: React.MouseEventHandler<HTMLDivElement>;
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
      <MenuTrigger>
        <Button
          appearance="transparent"
          className={styles.menuButton}
          ref={ref}
          icon={<MoreHorizontalRegular />}
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
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
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
    ...shorthands.overflow('auto'),
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
    minHeight: '600px', //lets the page remain at a minimum height when vertical tabs are resized
  },
});
export const WithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <HorizontalExample />
      <VerticalExample />
    </div>
  );
};

WithOverflow.parameters = {
  docs: {
    description: {
      story:
        'A tab list can support overflow by using Overflow and OverflowItem.' +
        'NOTE: when adding custom buttons to a tablist -- e.g. the overflow button in this example --' +
        '`role="tab"` must be manually added for screen reader accessibility.',
    },
  },
};
