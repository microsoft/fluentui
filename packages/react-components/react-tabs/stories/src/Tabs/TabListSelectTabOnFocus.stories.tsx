import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';

import styles from './TabListSelectTabOnFocus.module.css';

export const SelectTabOnFocus = (): JSXElement => {
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
