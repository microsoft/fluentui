import * as React from 'react';
import './Overlay.scss';
import { IOverlayProps } from './Overlay.props';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';

export default class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed } = this.props;

    let className = css(
      'ms-Overlay',
      this.props.className,
      {
      'ms-Overlay--dark': isDarkThemed
    });

    return React.createElement(
      'div',
      assign({}, this.props, { className })
    );
  }
}
