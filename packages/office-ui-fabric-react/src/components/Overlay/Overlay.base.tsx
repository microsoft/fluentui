import * as React from 'react';
import { BaseComponent, classNamesFunction, getNativeProps, divProperties, enableBodyScroll, disableBodyScroll } from '../../Utilities';
import { IOverlayProps, IOverlayStyleProps, IOverlayStyles } from './Overlay.types';

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>();

export class OverlayBase extends BaseComponent<IOverlayProps, {}> {
  private _allowTouchBodyScroll: boolean;

  constructor(props: IOverlayProps) {
    super(props);

    const { allowTouchBodyScroll = false } = this.props;
    this._allowTouchBodyScroll = allowTouchBodyScroll;
  }

  public componentDidMount(): void {
    !this._allowTouchBodyScroll && disableBodyScroll();
  }

  public componentWillUnmount(): void {
    !this._allowTouchBodyScroll && enableBodyScroll();
  }

  public render(): JSX.Element {
    const { isDarkThemed: isDark, className, theme, styles } = this.props;

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isDark
    });

    return <div {...divProps} className={classNames.root} />;
  }
}
