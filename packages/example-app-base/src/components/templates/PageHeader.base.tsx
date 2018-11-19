import * as React from 'react';
import { BaseComponent, customizable, IClassNames } from 'office-ui-fabric-react/lib/Utilities';
import { IPageHeaderProps, IPageHeaderStyles, IPageHeaderStylesProps } from './PageHeader.props';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

@customizable('PageHeader', ['theme', 'styles'])
export class PageHeaderBase extends BaseComponent<IPageHeaderProps, {}> {
  public render(): JSX.Element {
    const { theme, children, getStyles } = this.props;
    const stylesProps: IPageHeaderStylesProps = { theme: theme! };

    const classNames = getStyles ? mergeStyleSets(getStyles(stylesProps)) : { root: '' };

    return <h2 className={classNames.root}>{children}</h2>;
  }
}
