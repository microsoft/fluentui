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

export const Vertical = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" vertical>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};

Vertical.parameters = {
  docs: {
    description: {
      story: 'The tabs within a tab list can be arranged vertically. The default is false.',
    },
  },
};
