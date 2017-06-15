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
  assign,
  memoize
} from '../../Utilities';
import {
  mergeStyles
} from '../../Styling';
import { IHoverCardHostProps, IHoverCardHostStyles } from './HoverCardHost.Props';
import { HoverCard } from './HoverCard';
import { HoverCardDelay, IHoverCard } from './HoverCard.Props';
import { DirectionalHint } from '../../common/DirectionalHint';

import { getStyles } from './HoverCardHost.styles';

export interface IHoverCardHostState {
  isHoverCardVisible?: boolean;
}

export class HoverCardHost extends BaseComponent<IHoverCardHostProps, IHoverCardHostState> {
  public static defaultProps = {
    delay: HoverCardDelay.medium
  };

  // The wrapping div that gets the hover events
  private _hoverCardHost: HTMLElement;
  private _hoverCard: IHoverCard;

  private _styles: IHoverCardHostStyles;

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
      hoverCardProps,
      children,
      delay,
      id,
      setAriaDescribedBy = true,
      styles: customStyles
    } = this.props;
    const { isHoverCardVisible } = this.state;
    const hoverCardId = id || getId('hoverCard');

    this._styles = getStyles(customStyles);

    return (
      <div
        className={ css(this._styles.host) }
        ref={ this._resolveRef('_hoverCardHost') }
        { ...{ onFocusCapture: this._onHoverCardMouseEnter } }
        { ...{ onBlurCapture: this._onHoverCardMouseLeave } }
        onMouseEnter={ this._onHoverCardMouseEnter }
        onMouseLeave={ this._onHoverCardMouseLeave }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <HoverCard
            componentRef={ h => this._hoverCard = h }
            { ...hoverCardProps }
            id={ hoverCardId }
            targetElement={ this._getTargetElement() }
            calloutProps={ assign(hoverCardProps.calloutProps, { onDismiss: this._onHoverCardCallOutDismiss, isBeakVisible: false, directionalHint: DirectionalHint.bottomLeftEdge }) }
            { ...getNativeProps(this.props, divProperties) }
          />
        }
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
    if (!this._hoverCard.isExpanded) {
      this.setState({
        isHoverCardVisible: false
      });
    }
  }

  // Hide HoverCard
  @autobind
  private _onHoverCardCallOutDismiss() {
    this.setState({
      isHoverCardVisible: false
    });
  }
}
