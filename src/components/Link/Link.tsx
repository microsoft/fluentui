import * as React from 'react';
import {
  anchorProperties,
  autobind,
  buttonProperties,
  css,
  getNativeProps
} from '../../Utilities';
import { ILinkProps } from './Link.Props';
import './Link.scss';

interface IMyScreen extends Screen {
  left: number;
  top: number;
}

declare var screen: IMyScreen;

export class Link extends React.Component<ILinkProps, any> {

  public render() {
    let { disabled, children, className, href } = this.props;

    return (
      href ? (
        <a
          role='link'
          { ...getNativeProps(this.props, anchorProperties) }
          className={ css('ms-Link', className, {
            'is-disabled': disabled
          }) }
          onClick={ this._onClick }>
          { children }
        </a>
      ) : (
          <button
            role='button'
            { ...getNativeProps(this.props, buttonProperties) }
            className={ css('ms-Link', className, {
              'is-disabled': disabled
            }) }
            onClick={ this._onClick } >
            { children }
          </button>
        ));
  }

  @autobind
  private _onClick(ev: React.MouseEvent) {
    let { onClick } = this.props;

    if (onClick) {
      onClick(ev);
    }
  }
}
