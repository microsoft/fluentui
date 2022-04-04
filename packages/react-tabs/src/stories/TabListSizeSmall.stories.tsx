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

export const SizeSmall = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonthRegular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="small">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="small" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};

SizeSmall.parameters = {
  docs: {
    description: {
      story: 'A tab list can have `small` tabs. The default size is `medium`.',
    },
  },
};
