import { createComponentWithState } from '../../Foundation';
import { CollapsibleSectionView } from './CollapsibleSection.view';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { getStyles as styles } from './CollapsibleSection.styles';
import {
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponentWithState<
  ICollapsibleSectionProps,
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>(
  {
    displayName: 'CollapsibleSection',
    view: CollapsibleSectionView,
    styles
  },
  CollapsibleSectionState
);
