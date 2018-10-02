import { CollapsibleSectionView } from './CollapsibleSection.view';
import { collapsibleSectionStyles } from './CollapsibleSection.styles';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { ICollapsibleSectionProps, ICollapsibleSectionViewProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';
import { createComponent, createStatelessComponent } from '../../Foundation';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  state: CollapsibleSectionState,
  styles: collapsibleSectionStyles
});

// TODO: This is only here for testing createComponent and should be removed before promoting to production
export const CollapsibleSectionStateless: React.StatelessComponent<ICollapsibleSectionProps> = createStatelessComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionStyles
>({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  styles: collapsibleSectionStyles
});
