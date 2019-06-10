import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { ChicletXsmall } from './ChicletXsmall';
import { getOpenGraphPropertiesCard, getOpenGraphPropertiesXsmall } from './OpenGraph';
import { IChicletProps, ChicletSize } from './Chiclet.types';
// import { PropertiesTable } from '../../../../example-app-base/lib';
import { IChicletCardProps } from './ChicletCard.types';
import { IChicletXsmallProps } from './ChicletXsmall.types';
// import { FooterComponent } from './examples/Chiclet.Footer.Example';
// import { IButtonProps } from 'office-ui-fabric-react';

function getSize() {
  return this.props.size;
}

export interface IChicletState {
  chicletCardProps?: IChicletCardProps;
}

export class ChicletBase extends BaseComponent<IChicletProps, IChicletState> {
  constructor(props: IChicletProps) {
    super(props);
    const chicletCardProps = getOpenGraphPropertiesCard(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public componentDidUpdate(prevProps: IChicletProps): void {
    if (this.props.url !== prevProps.url) {
      const chicletCardProps = getOpenGraphPropertiesCard(this.props.url);
      this.setState({ chicletCardProps: chicletCardProps });
    }
  }

  public render(): JSX.Element {
    const { footer, description } = this.props;
    const { chicletCardProps } = this.state;

    switch (getSize()) {
      case ChicletSize.medium:
        return <ChicletCard {...chicletCardProps} onClick={this._onClick} footer={footer} description={description} />;
      // @todo: handle other types of chiclets
      case ChicletSize.xSmall:
        return <ChicletXsmall {...chicletCardProps} onClick={this._onClick} footer={footer} />;
      default:
        return <ChicletCard {...chicletCardProps} onClick={this._onClick} footer={footer} description={description} />;
    }
  }

  public componentWillReceiveProps(nextProps: IChicletProps): void {
    if (this.props.url !== nextProps.url) {
      this.setState({ chicletCardProps: getOpenGraphPropertiesCard(this.props.url) });
    }
  }

  private _onClick(): void {
    // @todo: default click handler
  }
}
