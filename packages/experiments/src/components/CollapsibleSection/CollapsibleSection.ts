import { CollapsibleSectionView } from './CollapsibleSection.view';
import { collapsibleSectionStyles } from './CollapsibleSection.styles';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { ICollapsibleSectionProps } from './CollapsibleSection.types';
import { createComponent } from '../../Foundation';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  state: CollapsibleSectionState,
  styles: collapsibleSectionStyles
});

// TODO: This is only here for testing createComponent and should be removed before promoting to production
export const CollapsibleSectionStateless: React.StatelessComponent<ICollapsibleSectionProps> = createComponent({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  styles: collapsibleSectionStyles
});
