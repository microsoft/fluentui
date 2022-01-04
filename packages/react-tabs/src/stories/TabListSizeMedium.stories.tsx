import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { makeStyles, shorthands } from '@fluentui/react-make-styles';
import * as React from 'react';
import { Tab, TabList, TabProps } from '../index';

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

export const SizeMedium = (props: Partial<TabProps>) => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="medium">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="medium" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};

SizeMedium.parameters = {
  docs: {
    description: {
      story: 'A tab list can have `medium` tabs. The default size is `medium`.',
    },
  },
};
