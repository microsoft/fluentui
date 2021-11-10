import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta
import { CalendarMonth24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '5px',
  },
});

export const WithIcon = (props: Partial<TabProps>) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.root}>
        <TabList defaultSelectedKey="2">
          <Tab icon={<CalendarMonth24Regular />} value="1">
            First Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="2">
            Second Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="3">
            Third Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="4">
            Fourth Tab
          </Tab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="2" vertical>
          <Tab icon={<CalendarMonth24Regular />} value="1">
            First Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="2">
            Second Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="3">
            Third Tab
          </Tab>
          <Tab icon={<CalendarMonth24Regular />} value="4">
            Fourth Tab
          </Tab>
        </TabList>
      </div>
    </>
  );
};
