import { CollapsibleSectionView } from './CollapsibleSection.view';
import { useCollapsibleSectionState } from './CollapsibleSection.state';
import { collapsibleSectionStyles } from './CollapsibleSection.styles';
import { ICollapsibleSectionProps } from './CollapsibleSection.types';
import { createComponent } from '../../Foundation';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  state: useCollapsibleSectionState,
  styles: collapsibleSectionStyles
});

// TODO: This is only here for testing createComponent and should be removed before promoting to production
export const CollapsibleSectionStateless: React.StatelessComponent<ICollapsibleSectionProps> = createComponent({
  displayName: 'CollapsibleSection',
  view: CollapsibleSectionView,
  styles: collapsibleSectionStyles
});
