import * as React from 'react';
import { css } from '../../utilities/css';
import './Link.scss';
import { ILinkProps, IPopupWindowProps, PopupWindowPosition } from './Link.Props';

interface IMyScreen extends Screen {
  left: number;
  top: number;
}

declare var screen: IMyScreen;

export class Link extends React.Component<ILinkProps, any> {

  constructor(props: ILinkProps) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._popupWindow = this._popupWindow.bind(this);
  }

  public render() {
    let { children, className, href } = this.props;

    return (
      href ? (
      <a
        role='link'
        { ...this.props as any }
        className={ css('ms-Link', className) }
        onClick={ this._onClick }>
        { children }
      </a>
      ) : (
      <button
        role='button'
        { ...this.props as any }
        className={ css('ms-Link', className) }
        onClick={ this._onClick } >
        { children }
      </button>
      ));
  }

  private _onClick(ev: React.MouseEvent) {
    let { popupWindowProps, onClick } = this.props;

    if (popupWindowProps) {
      this._popupWindow(popupWindowProps);
      ev.preventDefault();
      ev.stopPropagation();
    }

    if (onClick) {
      onClick(ev);
    }
  }

  private _popupWindow(popupWindowProps: IPopupWindowProps) {
      const dualScreenLeft: number = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      const dualScreenTop: number = window.screenTop !== undefined ? window.screenTop : screen.top;

      const width: number = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ?
          document.documentElement.clientWidth : screen.width;
      const height: number = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ?
          document.documentElement.clientHeight : screen.height;

      let left: number = 0;
      let top: number = 0;
      switch (popupWindowProps.positionWindowPosition) {
        case PopupWindowPosition.center:
          left = ((width / 2) - (popupWindowProps.width / 2)) + dualScreenLeft;
          top = ((height / 2) - (popupWindowProps.height / 2)) + dualScreenTop;
          break;
        case PopupWindowPosition.leftBottom:
          left = dualScreenLeft;
          top = (height - popupWindowProps.height) + dualScreenTop;
          break;
        case PopupWindowPosition.leftTop:
          left =  dualScreenLeft;
          top = dualScreenTop;
          break;
        case PopupWindowPosition.rightBottom:
          left = (width - popupWindowProps.width) + dualScreenLeft;
          top = (height - popupWindowProps.height) + dualScreenTop;
          break;
        case PopupWindowPosition.rightTop:
          left = (width - popupWindowProps.width) + dualScreenLeft;
          top = dualScreenTop;
          break;
        default:
          break;
      }

      const newWindow = window.open(this.props.href, popupWindowProps.title, 'scrollbars=yes, width='
          + popupWindowProps.width + ', height=' + popupWindowProps.height + ', top=' + top + ', left=' + left);
      // Puts focus on the newWindow
      if (window.focus && newWindow) {
          newWindow.focus();
      }
  }
}
