import * as React from 'react';
import { ChicletCard } from './ChicletCard';
import { ChicletXsmall } from './ChicletXsmall';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps } from './ChicletCard.types';

export class ChicletBase extends React.Component<IChicletProps, {}> {
  public render(): JSX.Element {
    const props: IChicletCardProps = this.props;
    switch (this.props.size) {
      case ChicletSize.medium:
        return <ChicletCard onClick={this._onClick} {...props} />;
      // @todo: handle other types of chiclets
      case ChicletSize.xSmall:
        return <ChicletXsmall onClick={this._onClick} {...props} />;
      default:
        return <ChicletCard onClick={this._onClick} {...props} />;
    }
  }

  private _onClick(): void {
    // @todo: default click handler
  }
}
