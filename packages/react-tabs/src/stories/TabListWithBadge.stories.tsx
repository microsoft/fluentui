import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { BadgeTab, Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Badge } from '@fluentui/react-badge';

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
          <BadgeTab badge={<Badge>1</Badge>} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={<Badge>2</Badge>} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={<Badge>4</Badge>} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" vertical>
          <BadgeTab badge={<Badge>1</Badge>} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={<Badge>2</Badge>} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={<Badge>4</Badge>} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" verticalTabContent>
          <BadgeTab badge={<Badge>1</Badge>} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={<Badge>2</Badge>} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={<Badge>4</Badge>} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
      <div className={styles.root}>
        <TabList defaultSelectedKey="tab2" vertical verticalTabContent>
          <BadgeTab badge={<Badge>1</Badge>} value="tab1">
            First Tab
          </BadgeTab>
          <BadgeTab badge={<Badge>2</Badge>} icon={<CalendarMonth24Regular />} value="tab2">
            Second Tab
          </BadgeTab>
          <Tab value="tab3">Third Tab</Tab>
          <BadgeTab badge={<Badge>4</Badge>} value="tab4">
            Fourth Tab
          </BadgeTab>
        </TabList>
      </div>
    </>
  );
};
