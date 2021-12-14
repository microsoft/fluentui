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
    rowGap: '20px',
  },
});

export const WithIcon = (props: Partial<TabProps>) => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonth24Regular />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab4">
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

WithIcon.parameters = {
  docs: {
    description: {
      story: 'A tab has an `icon` slot to display an icon before the tab content.',
    },
  },
};
