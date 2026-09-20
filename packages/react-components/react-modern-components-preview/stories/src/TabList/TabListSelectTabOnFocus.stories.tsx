import * as React from 'react';

import { makeStyles } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-modern-components-preview/tab-list';

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

export const SelectTabOnFocus = (): React.ReactNode => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" selectTabOnFocus={true}>
        {renderTabs()}
      </TabList>
    </div>
  );
};

SelectTabOnFocus.parameters = {
  docs: {
    description: {
      story: 'A tab list can select tabs whenever a tab is focused.',
    },
  },
};
