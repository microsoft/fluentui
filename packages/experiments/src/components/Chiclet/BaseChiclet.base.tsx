import * as React from 'react';
import {
  BaseComponent,
  customizable,
  classNamesFunction
} from '../../Utilities';
import { Chiclet } from './Chiclet';
import { ChicletSize } from './Chiclet.types';
import { extractMetaTags } from './OpenGraph';
import { IBaseChicletProps, IBaseChicletStyles, IBaseChicletStyleProps } from './BaseChiclet.types';

const getClassNames = classNamesFunction<IBaseChicletStyleProps, IBaseChicletStyles>();

@customizable('BaseChicletBase', ['theme'])
export class BaseChicletBase extends BaseComponent<IBaseChicletProps, any> {
  private _classNames: { [key in keyof IBaseChicletStyles]: string };

  constructor(props: IBaseChicletProps) {
    super(props);

    let chicletCardProps = extractMetaTags(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public render() {
    const { size, footer, getStyles, theme } = this.props;
    const { chicletCardProps } = this.state;

    this._classNames = getClassNames(getStyles, { theme: theme! });

    return (
      <Chiclet chicletCardProps={ chicletCardProps } size={ size ? size : ChicletSize.medium } footer={ footer } />
    );
  }

  public componentWillReceiveProps(nextProps: any) {
    if (this.props.url != nextProps.url) {
      this.setState({ chicletCardProps: extractMetaTags(this.props.url) });
    }
  }
}
