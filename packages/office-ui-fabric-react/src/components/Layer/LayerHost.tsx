import * as React from 'react';
import {
  BaseComponent,
  css
} from '../../Utilities';
import {
  Layer
} from './Layer';
import { ILayerHostProps } from './LayerHost.Props';

export class LayerHost extends BaseComponent<ILayerHostProps, {}> {

  public shouldComponentUpdate() {
    return false;
  }

  public componentDidMount() {
    Layer.notifyHostChanged(this.props.id!);
  }

  public componentWillUnmount() {
    Layer.notifyHostChanged(this.props.id!);
  }

  public render() {
    return (
      <div { ...this.props } className={ css('ms-LayerHost', this.props.className) } />
    );
  }
}