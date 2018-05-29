import { createComponent } from './utilities/createComponent';
import { CollapsibleSectionView as view } from './CollapsibleSection.view';
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
    view,
    styles
  });
