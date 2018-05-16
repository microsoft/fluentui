import * as React from 'react';
import {
  BaseComponent,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { ChicletCard } from './ChicletCard';
import { extractMetaTags } from './OpenGraph';
import { IChicletProps, IChicletStyles, IChicletStyleProps, ChicletSize } from './Chiclet.types';

const getClassNames = classNamesFunction<IChicletStyleProps, IChicletStyles>();

@customizable('ChicletBase', ['theme'])
export class ChicletBase extends BaseComponent<IChicletProps, any> {
  private _classNames: { [key in keyof IChicletStyles]: string };

  constructor(props: IChicletProps) {
    super(props);

    let chicletCardProps = extractMetaTags(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public render() {
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

  public componentWillReceiveProps(nextProps: any) {
    if (this.props.url != nextProps.url) {
      this.setState({ chicletCardProps: extractMetaTags(this.props.url) });
    }
  }

  private _onClick(): void { // @todo: default click handler
  }

}
