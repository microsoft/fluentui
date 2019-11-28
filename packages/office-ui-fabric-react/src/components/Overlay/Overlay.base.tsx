import * as React from 'react';
import { BaseComponent, classNamesFunction, getNativeProps, divProperties, enableBodyScroll, disableBodyScroll } from '../../Utilities';
import { IOverlayProps, IOverlayStyleProps, IOverlayStyles } from './Overlay.types';

const getClassNames = classNamesFunction<IOverlayStyleProps, IOverlayStyles>();

export class OverlayBase extends BaseComponent<IOverlayProps, {}> {
  private _allowIosBodyScroll: boolean;

  constructor(props: IOverlayProps) {
    super(props);

    const { allowIosBodyScroll = false } = this.props;
    this._allowIosBodyScroll = allowIosBodyScroll;
  }

  public componentDidMount(): void {
    !this._allowIosBodyScroll && disableBodyScroll();
  }

  public componentWillUnmount(): void {
    !this._allowIosBodyScroll && enableBodyScroll();
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
