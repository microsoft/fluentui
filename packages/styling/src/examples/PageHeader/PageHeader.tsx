import * as React from 'react';
import { IPageHeaderStyles, getStyles } from './PageHeader.styles';

export interface IPageHeaderProps {
  text: string;
}

export class PageHeader extends React.PureComponent<IPageHeaderProps, {}> {
  public render(): JSX.Element {
    const { text }: IPageHeaderProps = this.props;
    const styles: IPageHeaderStyles = getStyles();

    return (
      <div>
        <div className={ styles.root as string }>{ text }</div>
      </div>
    );
  }
}
