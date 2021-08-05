import * as React from 'react';
import { ILabelStyles, IStyleSet, Label } from '@fluentui/react';
import { Tabs, TabItem } from '@fluentui/react-tabs';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const TabsBasicExample: React.FunctionComponent = () => {
  return (
    <Tabs aria-label="Basic Tabs Example">
      <TabItem
        headerText="My Files"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'My Files Title',
        }}
      >
        <Label styles={labelStyles}>Tab #1</Label>
      </TabItem>
      <TabItem headerText="Recent">
        <Label styles={labelStyles}>Tab #2</Label>
      </TabItem>
      <TabItem headerText="Shared with me">
        <Label styles={labelStyles}>Tab #3</Label>
      </TabItem>
    </Tabs>
  );
};
