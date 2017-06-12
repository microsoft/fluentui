/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  getId,
  assign
} from '../../Utilities';
import { IHoverCardHostProps } from './HoverCardHost.Props';
import { HoverCard } from './HoverCard';
import { HoverCardDelay } from './HoverCard.Props';

import * as stylesImport from './HoverCardHost.scss';
const styles: any = stylesImport;

export interface IHoverCardHostState {
  isHoverCardVisible?: boolean;
}

export class HoverCardHost extends BaseComponent<IHoverCardHostProps, IHoverCardHostState> {
  public static defaultProps = {
    delay: HoverCardDelay.medium
  };

  // The wrapping div that gets the hover events
  private _hoverCardHost: HTMLElement;

  // Constructor
  constructor(props: IHoverCardHostProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false
    };
  }

  // Render
  public render() {
    const {
      calloutProps,
      hoverCardProps,
      content,
      children,
      directionalHint,
      delay,
      id,
      setAriaDescribedBy = true,
      hostClassName
    } = this.props;
    const { isHoverCardVisible } = this.state;
    const hoverCardId = id || getId('hoverCard');
    return (
      <div
        className={ css('ms-HoverCardHost', styles.host, hostClassName) }
        ref={ this._resolveRef('_hoverCardHost') }
        { ...{ onFocusCapture: this._onHoverCardMouseEnter } }
        { ...{ onBlurCapture: this._onHoverCardMouseLeave } }
        onMouseEnter={ this._onHoverCardMouseEnter }
        onMouseLeave={ this._onHoverCardMouseLeave }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible && content ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          content ? (
            <HoverCard
              { ...hoverCardProps }
              id={ hoverCardId }
              delay={ delay }
              content={ content }
              targetElement={ this._getTargetElement() }
              directionalHint={ directionalHint }
              calloutProps={ assign(calloutProps, { onDismiss: this._onHoverCardCallOutDismiss }) }
              { ...getNativeProps(this.props, divProperties) }
            >
            </HoverCard>
          ) : undefined }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement {
    return this._hoverCardHost;
  }

  // Show HoverCard
  @autobind
  private _onHoverCardMouseEnter(ev: any) {
    this.setState({
      isHoverCardVisible: true
    });
  }

  // Hide HoverCard
  @autobind
  private _onHoverCardMouseLeave(ev: any) {
    this.setState({
      isHoverCardVisible: false
    });
  }

  // Hide HoverCard
  @autobind
  private _onHoverCardCallOutDismiss() {
    this.setState({
      isHoverCardVisible: false
    });
  }
}
