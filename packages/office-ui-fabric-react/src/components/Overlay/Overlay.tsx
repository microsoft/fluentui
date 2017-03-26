import * as React from 'react';
import {
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { IOverlayProps } from './Overlay.Props';

const styles: any = require('./Overlay.scss');

export class Overlay extends React.Component<IOverlayProps, {}> {
  public render() {
    let { isDarkThemed, className } = this.props;
    let divProps = getNativeProps(this.props, divProperties);

    let modifiedClassName = css(
      'ms-Overlay',
      styles.root,
      className,
      {
        ['ms-Overlay--dark ' + styles.rootIsDark]: isDarkThemed,
      });

    return (
      <div { ...divProps } className={ modifiedClassName } />
    );
  }
}
