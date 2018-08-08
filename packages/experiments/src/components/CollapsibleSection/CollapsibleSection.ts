import { CollapsibleSectionView } from './CollapsibleSection.view';
import { getStyles as styles } from './CollapsibleSection.styles';
import { createComponent } from '../../Foundation';
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
    styles
  },
  CollapsibleSectionState
);
