import { createComponent } from '../../Foundation';
import { CollapsibleSectionTitleView as view } from './CollapsibleSectionTitle.view';
import { getStyles as styles } from './CollapsibleSectionTitle.styles';
import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: React.FunctionComponent<ICollapsibleSectionTitleProps> = createComponent({
  displayName: 'CollapsibleSectionTitle',
  view,
  styles,
  factoryOptions: {
    defaultProp: 'text'
  }
});
