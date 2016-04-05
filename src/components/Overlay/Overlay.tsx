import * as React from 'react';
import './Overlay.scss';
import { css } from '../../utilities/css';
import { assign } from '../../utilities/object';

export interface IOverlayProps extends React.HTMLProps<HTMLElement> {
  isDarkThemed?: boolean;
}

export default class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed } = this.props;

    let className = css('ms-Overlay', {
      'ms-Overlay--dark': isDarkThemed
    });

    return React.createElement(
      'div',
      assign({}, this.props, { className })
    );
  }
}
