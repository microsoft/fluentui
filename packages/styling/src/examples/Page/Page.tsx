import * as React from 'react';
import { getStyles, IPageStyles } from './Page.styles';

export interface IPageProps extends React.Props<Page> {
}

export class Page extends React.PureComponent<IPageProps, {}> {

  public render(): JSX.Element {
    const { children }: IPageProps = this.props;
    const styles: IPageStyles = getStyles();

    return (
      <div className={ styles.root as string }>
        { children }
      </div>
    );
  }
}
