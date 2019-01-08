import { createFactory, createStatelessComponent, IFactoryComponent } from '../../Foundation';
import { CollapsibleSectionTitleView as view } from './CollapsibleSectionTitle.view';
import { getStyles as styles } from './CollapsibleSectionTitle.styles';
import { ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStyles } from './CollapsibleSectionTitle.types';

export const CollapsibleSectionTitle: IFactoryComponent<ICollapsibleSectionTitleProps> = createStatelessComponent<
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStyles
>({
  displayName: 'CollapsibleSectionTitle',
  view,
  styles
});

// TODO: add factories for all experimental createComponents
CollapsibleSectionTitle.create = createFactory(CollapsibleSectionTitle, { defaultProp: 'text' });
