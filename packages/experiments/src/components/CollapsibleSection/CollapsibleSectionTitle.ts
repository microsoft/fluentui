import { createComponent } from '../../Foundation';
import { CollapsibleSectionTitleView } from './CollapsibleSectionTitle.view';
import { getStyles as styles } from './CollapsibleSectionTitle.styles';
import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: React.FunctionComponent<ICollapsibleSectionTitleProps> = createComponent(
  CollapsibleSectionTitleView,
  {
    displayName: 'CollapsibleSectionTitle',
    styles,
    factoryOptions: {
      defaultProp: 'text'
    }
  }
);
