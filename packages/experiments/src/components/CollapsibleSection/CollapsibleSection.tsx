// TODO: figure out how to centralize this for use throughout OUFR
import { createComponent } from '../../Foundation';
import { CollapsibleSectionView } from './CollapsibleSection.view';
import { CollapsibleSectionState } from './CollapsibleSection.state';
import { getStyles as styles } from './CollapsibleSection.styles';
import { ICollapsibleSectionProps, ICollapsibleSectionStyles } from './CollapsibleSection.types';

export const CollapsibleSection: React.StatelessComponent<ICollapsibleSectionProps> = createComponent<
  ICollapsibleSectionProps,
  ICollapsibleSectionStyles
>({
  scope: 'CollapsibleSection',
  view: CollapsibleSectionView,
  state: CollapsibleSectionState,
  styles
});
