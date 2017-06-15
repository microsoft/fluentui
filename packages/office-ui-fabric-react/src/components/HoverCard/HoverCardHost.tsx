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
import { IHoverCard } from './HoverCard.Props';
import { DirectionalHint } from '../../common/DirectionalHint';

import { getStyles } from './HoverCardHost.styles';

export interface IHoverCardHostState {
  isHoverCardVisible?: boolean;
}

export class HoverCardHost extends BaseComponent<IHoverCardHostProps, IHoverCardHostState> {
  public static defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100
  };

  // The wrapping div that gets the hover events
  private _hoverCardHost: HTMLElement;
  private _hoverCard: IHoverCard;
  private _dismissTimerId: number;
  private _openTimerId: number;

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
        { ...{ onFocusCapture: this._cardOpen } }
        { ...{ onBlurCapture: this._cardDismiss } }
        onMouseEnter={ this._cardOpen }
        onMouseLeave={ this._cardDismiss }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <HoverCard
            componentRef={ h => this._hoverCard = h }
            { ...hoverCardProps }
            id={ hoverCardId }
            targetElement={ this._getTargetElement() }
            onEnter={ this._cardOpen }
            onDismiss={ this._cardDismiss }
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
  private _cardOpen(ev: any) {
    this._async.clearTimeout(this._dismissTimerId);

    this._openTimerId = this._async.setTimeout(() => {
      this.setState({
        isHoverCardVisible: true
      });
    }, this.props.cardOpenDelay);
  }

  // Hide HoverCard
  @autobind
  private _cardDismiss(ev) {
    this._async.clearTimeout(this._openTimerId);

    this._dismissTimerId = this._async.setTimeout(() => {
      this.setState({
        isHoverCardVisible: false
      });
    }, this.props.cardDismissDelay);
  }
}
