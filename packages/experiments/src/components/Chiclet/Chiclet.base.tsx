import * as React from 'react';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps } from './ChicletCard.types';
import { ChicletCard } from './ChicletCard';

export class ChicletBase extends React.Component<IChicletProps, IChicletCardProps> {
  public render() {
    const { chicletCardProps, size, footer } = this.props;

    switch (size) {
      case ChicletSize.medium:
        return (
          <ChicletCard { ...chicletCardProps } onClick={ this._onClick } footer={ footer } />
        );
      // @todo: handle other types of chiclets
      default:
        return (
          <ChicletCard { ...chicletCardProps } onClick={ this._onClick } footer={ footer } />
        );
    }
  }

  private _onClick(): void { // @todo: default click handler
    console.log("You clicked the Chiclet");
  }
}