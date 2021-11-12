import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta

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

export const Size = (props: Partial<TabProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h3>small</h3>
      <TabList defaultSelectedKey="tab2" size="small">
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="small" vertical>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="small" verticalTabContent>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="small" vertical verticalTabContent>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>

      <h3>medium (default)</h3>
      <TabList defaultSelectedKey="tab2" size="medium">
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="medium" vertical>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="medium" verticalTabContent>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
      <TabList defaultSelectedKey="tab2" size="medium" vertical verticalTabContent>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};
