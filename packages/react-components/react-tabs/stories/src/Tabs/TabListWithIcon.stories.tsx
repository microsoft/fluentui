import * as React from 'react';
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

export const WithIcon = () => {
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

WithIcon.parameters = {
  docs: {
    description: {
      story: 'A tab has an `icon` slot to display an icon before the tab content.',
    },
  },
};
