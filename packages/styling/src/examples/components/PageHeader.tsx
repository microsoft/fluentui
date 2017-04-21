import * as React from 'react';
import { fontStyles } from '@uifabric/styling';
import { css, CSSProperties } from 'glamor';

export interface IPageHeaderProps {
  text: string;
}

const styles: CSSProperties = {
  header: {
    ...fontStyles.xLarge,
    paddingBottom: '20px'
  }
};

export class PageHeader extends React.PureComponent<IPageHeaderProps, {}> {
  public render(): JSX.Element {
    const { text }: IPageHeaderProps = this.props;

    return (
      <div>
        <div { ...css(styles.header) }>{ text }</div>
      </div>
    );
  }
}
