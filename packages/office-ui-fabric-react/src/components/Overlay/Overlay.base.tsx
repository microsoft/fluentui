import * as React from 'react';
import {
  BaseComponent,
  customizable,
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

@customizable('Overlay', ['theme'])
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

    return (
      <div { ...divProps } className={ classNames.root } />
    );
  }
}
