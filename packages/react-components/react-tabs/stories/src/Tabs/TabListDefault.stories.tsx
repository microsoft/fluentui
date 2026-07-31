import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';

import styles from './TabListDefault.module.css';

export const Default = (props: Partial<TabListProps>): JSXElement => {
  return (
    <div className={styles.root}>
      <TabList {...props}>
        <Tab value="tab1">First Tab</Tab>
        <Tab value="tab2">Second Tab</Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </TabList>
    </div>
  );
};
