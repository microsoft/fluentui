import * as React from 'react';
import { createComponent } from './../../../../../packages/experiments/src/Foundation';
import { CollapsibleSectionTitleView as view } from './../../../../../packages/experiments/lib/components/CollapsibleSection/CollapsibleSectionTitle.view';
import { getStyles as styles } from './Nav.CollapsibleSectionTitle.styles';
import { ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles } from './../../../../../packages/experiments/lib/components/CollapsibleSection/CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: React.StatelessComponent = createComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
>({
  scope: 'CollapsibleSectionTitle',
  view,
  styles
});