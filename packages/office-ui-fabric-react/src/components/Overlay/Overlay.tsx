import * as React from 'react';
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  enableBodyScroll,
  disableBodyScroll
} from '../../Utilities';
import { IOverlayProps } from './Overlay.Props';

import stylesImport from './Overlay.scss';
const styles: any = stylesImport;

export class Overlay extends BaseComponent<IOverlayProps, {}> {

  public componentDidMount() {
    disableBodyScroll();
  }

  public componentWillUnmount() {
    enableBodyScroll();
  }

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
