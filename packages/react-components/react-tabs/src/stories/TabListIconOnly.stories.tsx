import { makeStyles, shorthands } from '@griffel/react';
import * as React from 'react';
import { Tab, TabList } from '../index';
import { CalendarMonthRegular } from '@fluentui/react-icons';

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

export const IconOnly = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonthRegular />} value="tab1" aria-label="First Tab" />
        <Tab icon={<CalendarMonthRegular />} value="tab2" aria-label="Second Tab" />
        <Tab icon={<CalendarMonthRegular />} value="tab3" aria-label="Third Tab" />
        <Tab icon={<CalendarMonthRegular />} value="tab4" aria-label="Fourth Tab" />
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

IconOnly.parameters = {
  docs: {
    description: {
      story: 'Tabs can have an `icon` slot filled and no content..',
    },
  },
};
