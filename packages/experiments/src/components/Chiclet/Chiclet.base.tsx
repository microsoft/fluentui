import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { getOpenGraphProperties } from './OpenGraph';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { IChicletCardProps } from './ChicletCard.types';

export interface IChicletState {
  chicletCardProps?: IChicletCardProps;
}

export class ChicletBase extends BaseComponent<IChicletProps, IChicletState> {
  constructor(props: IChicletProps) {
    super(props);

    const chicletCardProps = getOpenGraphProperties(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public render(): JSX.Element {
    const { size, footer, description } = this.props;
    const { chicletCardProps } = this.state;

    switch (size) {
      case ChicletSize.medium:
        return <ChicletCard {...chicletCardProps} onClick={this._onClick} footer={footer} description={description} />;
      // @todo: handle other types of chiclets
      default:
        return <ChicletCard {...chicletCardProps} onClick={this._onClick} footer={footer} description={description} />;
    }
  }

  public componentWillReceiveProps(nextProps: IChicletProps): void {
    if (this.props.url !== nextProps.url) {
      this.setState({ chicletCardProps: getOpenGraphProperties(this.props.url) });
    }
  }

  private _onClick(): void {
    // @todo: default click handler
  }
}
