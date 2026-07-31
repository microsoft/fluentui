import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';

import styles from './TabListHorizontal.module.css';

export const Horizontal = (): JSXElement => {
  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2">
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};

Horizontal.parameters = {
  docs: {
    description: {
      story: 'The tabs within a tab list are arranged horzontally by default.',
    },
  },
};
