import { createComponent } from '../../utilities/createComponent';
import { CollapsibleSectionView } from './CollapsibleSection.view';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { getStyles as styles } from './CollapsibleSection.styles';
import {
  ICollapsibleSectionProps,
  ICollapsibleSectionStyles
} from './CollapsibleSection.types';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionStyles
  >({
    scope: 'CollapsibleSection',
    view: CollapsibleSectionView,
    state: CollapsibleSectionState,
    styles
  });
