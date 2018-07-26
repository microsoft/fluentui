import * as React from 'react';
import { createComponent } from '@uifabric/experiments';
import { CollapsibleSectionTitleView as view } from '@uifabric/experiments';
import { getStyles as styles } from './Nav.styles';
import {
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
} from '@uifabric/experiments/src/CollapsibleSection';

export const CollapsibleSectionTitle: React.StatelessComponent = createComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
>({
  scope: 'CollapsibleSectionTitle',
  view,
  styles
});
