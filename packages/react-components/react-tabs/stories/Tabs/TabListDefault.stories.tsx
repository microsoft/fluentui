import * as React from 'react';
import { makeStyles, shorthands, Tab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';

export const Default = (props: Partial<TabListProps>) => {
  return (
    <TabList {...props}>
      <Tab value="tab1">First Tab</Tab>
      <Tab value="tab2">Second Tab</Tab>
      <Tab value="tab3">Third Tab</Tab>
      <Tab value="tab4">Fourth Tab</Tab>
    </TabList>
  );
};
