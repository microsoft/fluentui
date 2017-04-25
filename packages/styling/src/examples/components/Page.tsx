import * as React from 'react';
import { fontStyles } from '@uifabric/styling';
import { css, CSSProperties } from 'glamor';

export interface IPageProps extends React.Props<Page> {
}

const styles: CSSProperties = {
  root: {
    ...fontStyles.medium,
    padding: '20px'
  }
};

export class Page extends React.PureComponent<IPageProps, {}> {
  public render(): JSX.Element {
    const { children }: IPageProps = this.props;

    return (
      <div { ...css(styles.root) }>{ children }</div>
    );
  }
}
