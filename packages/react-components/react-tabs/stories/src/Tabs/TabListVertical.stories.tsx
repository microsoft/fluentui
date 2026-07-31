import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';

import styles from './TabListVertical.module.css';

export const Vertical = (): JSXElement => {
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
