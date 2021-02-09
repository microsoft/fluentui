import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { TabsProps, TabsStyleProps, TabsStyles } from './Tabs.types';
import { TabsBase } from './Tabs.base';
import { getStyles } from './Tabs.styles';

/**
 * The Tabs control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Tabs allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export const Tabs: React.FunctionComponent<TabsProps> = styled<TabsProps, TabsStyleProps, TabsStyles>(
  TabsBase,
  getStyles,
  undefined,
  {
    scope: 'Tabs',
  },
);
