import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { BadgeTab, Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta
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

export const WithBadge = (props: Partial<TabProps>) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2">
          <BadgeTab badge={'1'} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={'2'} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={'4'} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" vertical>
          <BadgeTab badge={'1'} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={'2'} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={'4'} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" verticalTabContent>
          <BadgeTab badge={'1'} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={'2'} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={'4'} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" vertical verticalTabContent>
          <BadgeTab badge={'1'} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={'2'} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={'4'} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
    </>
  );
};
