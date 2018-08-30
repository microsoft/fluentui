import { CollapsibleSectionView } from './CollapsibleSection.view';
import { collapsibleSectionStyles } from './CollapsibleSection.styles';
import { createComponent, createStatelessComponent } from '../../Foundation';
import { CollapsibleSectionState } from './CollapsibleSection.state';

import {
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>(
  {
    displayName: 'CollapsibleSection',
    view: CollapsibleSectionView,
    styles: collapsibleSectionStyles
  },
  CollapsibleSectionState
);

// TODO: This is only here for testing createComponent and should be removed before promoting to production
export const CollapsibleSectionStateless: React.StatelessComponent<ICollapsibleSectionProps> = createStatelessComponent<
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  styles: collapsibleSectionStyles
});
