import * as React from 'react';
import {
  BaseComponent,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { getOpenGraphProperties } from './OpenGraph';
import { IChicletProps, IChicletStyles, IChicletStyleProps, ChicletSize } from './Chiclet.types';

const getClassNames = classNamesFunction<IChicletStyleProps, IChicletStyles>();

@customizable('ChicletBase', ['theme'])
export class ChicletBase extends BaseComponent<IChicletProps, {}> {
  private _classNames: { [key in keyof IChicletStyles]: string };

  constructor(props: IChicletProps) {
    super(props);

    const chicletCardProps = getOpenGraphProperties(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public render(): JSX.Element {
    const { size, footer, getStyles, theme, description } = this.props;
    const { chicletCardProps } = this.state;

    this._classNames = getClassNames(getStyles, { theme: theme! });

    switch (size) {
      case ChicletSize.medium:
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

  public componentWillReceiveProps(nextProps: IChicletProps): void {
    if (this.props.url !== nextProps.url) {
      this.setState({ chicletCardProps: getOpenGraphProperties(this.props.url) });
    }
  }

  private _onClick(): void { // @todo: default click handler
  }

}
