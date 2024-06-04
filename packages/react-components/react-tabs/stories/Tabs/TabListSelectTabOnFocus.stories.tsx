import * as React from 'react';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';

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

export const SelectTabOnFocus = () => {
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
