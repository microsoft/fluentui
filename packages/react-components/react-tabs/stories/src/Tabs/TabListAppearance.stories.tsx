import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const Appearance = (): JSXElement => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab disabled value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab3" appearance="transparent">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="subtle">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="subtle-circular">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab3" appearance="filled-circular">
        {renderTabs()}
      </TabList>
    </div>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A tab list can have a `transparent`, `subtle`, `subtle-circular` and `filled-circular` appearance. The default is `transparent`.',
    },
  },
};
