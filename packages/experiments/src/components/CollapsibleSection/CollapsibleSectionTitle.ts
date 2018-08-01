import { createComponent } from '../../Foundation';
import { CollapsibleSectionTitleView as view } from './CollapsibleSectionTitle.view';
import { getStyles as styles } from './CollapsibleSectionTitle.styles';
import { ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: React.StatelessComponent = createComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
>({
  displayName: 'CollapsibleSectionTitle',
  view,
  styles
});
