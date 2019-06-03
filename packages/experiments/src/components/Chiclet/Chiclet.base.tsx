import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { ChicletXsmall } from './ChicletXsmall';
import { getOpenGraphProperties } from './OpenGraph';
import { IChicletProps, ChicletSize } from './Chiclet.types';
import { PropertiesTable } from '../../../../example-app-base/lib';
import { IChicletCardProps } from './ChicletCard.types';
import { IChicletXsmallProps } from './ChicletXsmall.types';

export interface IChicletState {
  chicletCardProps?: IChicletCardProps;
  chicletXsmallProps?: IChicletXsmallProps;
}

export class ChicletBase extends BaseComponent<IChicletProps, IChicletState> {
  constructor(props: IChicletProps) {
    super(props);

    const chicletCardProps = getOpenGraphProperties(this.props.url);
    const chicletXsmallProps = getOpenGraphProperties(this.props.url);
    switch (this.props.size) {
      case ChicletSize.medium:
        this.state = { chicletCardProps: chicletCardProps };
        break;
      default:
        this.state = { chicletXsmallProps: chicletXsmallProps };
    }
  }

  public componentDidUpdate(prevProps: IChicletProps): void {
    if (this.props.url !== prevProps.url) {
      const chicletCardProps = getOpenGraphProperties(this.props.url);
      this.setState({ chicletCardProps: chicletCardProps });
    }
  }

  public render(): JSX.Element {
    const { size, footer, description } = this.props;
    const { chicletCardProps } = this.state;
    const { chicletXsmallProps } = this.StaticRange;

    switch (size) {
      case ChicletSize.medium:
        return <ChicletCard {...chicletCardProps} onClick={this._onClick} footer={footer} description={description} />;
      // @todo: handle other types of chiclets
      case ChicletSize.xSmall:
        return <ChicletXsmall title="sample" />;
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
