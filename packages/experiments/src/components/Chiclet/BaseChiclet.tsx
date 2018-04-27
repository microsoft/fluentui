import * as React from 'react';
import {
  BaseComponent
} from '../../Utilities';
import { Chiclet } from './Chiclet';
import { ChicletSize } from './Chiclet.types';
import { OpenGraphUtilities } from './OpenGraph';
import { IBaseChicletProps } from './BaseChiclet.types';

export class BaseChiclet extends BaseComponent<IBaseChicletProps, any> {
  constructor(props: IBaseChicletProps) {
    super(props);

    let chicletCardProps = OpenGraphUtilities.extractMetaTags(this.props.url);
    this.state = { chicletCardProps: chicletCardProps };
  }

  public render() {
    const { size, actions } = this.props;
    const { chicletCardProps } = this.state;

    return (
      <Chiclet chicletCardProps={ chicletCardProps } size={ size ? size : ChicletSize.medium } actions={ actions } />
    );
  }

  public componentWillReceiveProps(nextProps: any) {
    if (this.props.url != nextProps.url) {
      this.setState({ chicletCardProps: OpenGraphUtilities.extractMetaTags(this.props.url) });
    }
  }
}
