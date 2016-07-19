import * as React from 'react';
import { IOverlayProps } from './Overlay.Props';
import { css } from '../../utilities/css';
import './Overlay.scss';

export class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed, className } = this.props;
    let modifiedClassName = css(
      'ms-Overlay',
      className,
      {
        'ms-Overlay--dark': isDarkThemed
      });

    return (
      <div { ...this.props } className={ modifiedClassName } />
    );
  }
}
