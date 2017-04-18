import * as React from 'react';
import { fonts } from '../../styles/fonts';
import { css, CSSProperties } from 'glamor';

export interface IPageProps extends React.Props<Page> {
}

const styles: CSSProperties = {
  root: {
    ...fonts.medium,
    padding: '20px'
  }
};

export class Page extends React.PureComponent<IPageProps, {}> {
  public render(): JSX.Element {
    let { children }: IPageProps = this.props;

    return (
      <div { ...css(styles.root) }>{ children }</div>
    );
  }
}
