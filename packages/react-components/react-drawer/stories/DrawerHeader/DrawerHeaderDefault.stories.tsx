import * as React from 'react';
import { DrawerHeader, DrawerHeaderProps } from '@fluentui/react-drawer';
import { Title2 } from '@fluentui/react-components';

export const Default = (props: Partial<DrawerHeaderProps>) => (
  <DrawerHeader {...props}>
    <Title2>This is a header</Title2>
  </DrawerHeader>
);
