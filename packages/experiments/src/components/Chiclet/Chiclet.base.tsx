import * as React from 'react';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps } from './ChicletCard.types';
import { ChicletCard } from './ChicletCard';

export class ChicletBase extends React.Component<IChicletProps, IChicletCardProps> {
  public render() {
    const { chicletCardProps, size, footer, description } = this.props;

    switch (size) {
      case ChicletSize.Medium:
        return (
          <ChicletCard { ...chicletCardProps } onClick={ this._onClick } footer={ footer } description={ description } />
        );
      // @todo: handle other types of chiclets
      default:
        return (
          <ChicletCard { ...chicletCardProps } onClick={ this._onClick } footer={ footer } description={ description } />
        );
    }
  }

  private _onClick(): void { // @todo: default click handler
  }
}