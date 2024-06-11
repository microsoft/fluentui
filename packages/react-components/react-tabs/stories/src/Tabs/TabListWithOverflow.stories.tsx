import * as React from 'react';
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
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
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
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
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
      story: [
        'A tab list can support overflow by using Overflow and OverflowItem.',
        '',
        '**Note**: when adding custom buttons to a tablist, e.g. the overflow button in this example,' +
          '`role="tab"` must be manually added for screen reader accessibility.',
      ].join('\n'),
    },
  },
};
