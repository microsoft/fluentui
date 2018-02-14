import * as React from 'react';
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  enableBodyScroll,
  disableBodyScroll
} from '../../Utilities';
import {
  IOverlayProps,
  IOverlayStyleProps,
  IOverlayStyles,
} from './Overlay.types';

import { classNamesFunction } from '../../Utilities';

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>();

export class OverlayBase extends BaseComponent<IOverlayProps, {}> {

  public componentDidMount() {
    disableBodyScroll();
  }

  public componentWillUnmount() {
    enableBodyScroll();
  }

  public render() {
    const {
      isDarkThemed,
      className,
      theme,
      getStyles
    } = this.props;

    const divProps = getNativeProps(this.props, divProperties);

    const classNames = getClassNames(getStyles!, {
      theme: theme!,
      className,
      isDarkThemed,
    });

    // const modifiedClassName = css(
    //   'ms-Overlay',
    //   styles.root,
    //   className,
    //   {
    //     ['ms-Overlay--dark ' + styles.rootIsDark]: isDarkThemed,
    //   });

    return (
      <div { ...divProps } className={ classNames.root } />
    );
  }
}
