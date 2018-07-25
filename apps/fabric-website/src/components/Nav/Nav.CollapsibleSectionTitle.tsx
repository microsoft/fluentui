import * as React from 'react';
import { createComponent } from '@uifabric/experiments/lib/Foundation';
import { CollapsibleSectionTitleView as view } from '@uifabric/experiments/lib/components/CollapsibleSection';
import { getStyles as styles } from './Nav.CollapsibleSectionTitle.styles';
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
