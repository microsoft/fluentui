import { CalendarMonthRegular } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@griffel/react';
import * as React from 'react';
import { Tab, TabList } from '../index';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" disabled>
        <Tab icon={<CalendarMonthRegular />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
      <TabList defaultSelectedValue="tab2">
        <Tab icon={<CalendarMonthRegular />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab2" disabled>
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab3" disabled>
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story:
        'A tab list can disable interaction for all its tabs. The default is `false`.' +
        ' Individual tabs can also be disabled.',
    },
  },
};
