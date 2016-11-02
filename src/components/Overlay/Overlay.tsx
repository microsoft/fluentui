import * as React from 'react';
import { IOverlayProps } from './Overlay.Props';
import { css } from '../../utilities/css';
import { getNativeProps, divProperties } from '../../utilities/properties';

import './Overlay.scss';

export class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed, className } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    let modifiedClassName = css(
      'ms-Overlay',
      className,
      {
        'ms-Overlay--dark': isDarkThemed
      });

    return (
      <div { ...divProps } className={ modifiedClassName } />
    );
  }
}
