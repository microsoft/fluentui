import * as React from 'react';
import './Overlay.scss';
import { IOverlayProps } from './Overlay.props';
import { css } from '../../utilities/css';

export default class Overlay extends React.Component<IOverlayProps, {}> {
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
