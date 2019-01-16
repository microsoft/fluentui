import { createFactory, createStatelessComponent, ISlottableComponentType } from '../../Foundation';
import { CollapsibleSectionTitleView as view } from './CollapsibleSectionTitle.view';
import { getStyles as styles } from './CollapsibleSectionTitle.styles';
import {
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles,
  ICollapsibleSectionTitleTokens
} from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: ISlottableComponentType<ICollapsibleSectionTitleProps> = createStatelessComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleTokens,
  ICollapsibleSectionTitleStyles
>({
  displayName: 'CollapsibleSectionTitle',
  view,
  styles
});

CollapsibleSectionTitle.create = createFactory(CollapsibleSectionTitle, { defaultProp: 'text' });
