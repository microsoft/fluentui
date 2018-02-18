import * as React from 'react';
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  enableBodyScroll,
  disableBodyScroll
} from '../../Utilities';
import { IOverlayProps } from './Overlay.types';

import * as stylesImport from './Overlay.scss';
const styles: any = stylesImport;

export class Overlay extends BaseComponent<IOverlayProps, {}> {

  public componentDidMount() {
    disableBodyScroll();
  }

  public componentWillUnmount() {
    enableBodyScroll();
  }

  public render() {
    const { isDarkThemed, className } = this.props;
    const divProps = getNativeProps(this.props, divProperties);

    const modifiedClassName = css(
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
