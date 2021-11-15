import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { BadgeTab, Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta
import { CalendarMonth24Regular, MailInbox24Regular } from '@fluentui/react-icons';

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

export const WithBadgeTab = (props: Partial<TabProps>) => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="home">Home</Tab>
        <BadgeTab badge={'25'} icon={<MailInbox24Regular />} value="inbox">
          Inbox
        </BadgeTab>
        <Tab icon={<CalendarMonth24Regular />} value="calendar">
          Calendar
        </Tab>
        <BadgeTab badge={'4'} value="todo">
          To Do
        </BadgeTab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedKey="inbox">{renderTabs()}</TabList>
      <TabList defaultSelectedKey="inbox" vertical>
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedKey="inbox" verticalTabContent>
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedKey="inbox" vertical verticalTabContent>
        {renderTabs()}
      </TabList>
    </div>
  );
};

WithBadgeTab.parameters = {
  docs: {
    description: {
      story: 'A tab in a tab list can display a badge by using the `BadgeTab` component.',
    },
  },
};
