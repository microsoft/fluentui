import * as React from 'react';
import './Overlay.scss';
import { css } from '../../utilities/css';

export interface IOverlayProps extends React.Props<Overlay> {
  isDarkThemed?: boolean;
}

export default class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed } = this.props;

    return (
      <div className={ css('ms-Overlay', {
        'ms-Overlay--dark': isDarkThemed
      }) } />
    );
  }
}
