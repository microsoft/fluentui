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

export const Circular = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2" disabled>
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab1" appearance="subtle" shape="circular">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab1" appearance="filled" shape="circular">
        {renderTabs()}
      </TabList>
    </div>
  );
};

Circular.parameters = {
  docs: {
    description: {
      story:
        'A tab list can be `circular` appearance to make tabs look like pills. shape. Could be used only with `filled` or `subtle` appearance.',
    },
  },
};
