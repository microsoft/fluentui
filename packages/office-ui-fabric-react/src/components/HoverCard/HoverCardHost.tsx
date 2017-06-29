/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  autobind,
  css,
  divProperties,
  getNativeProps,
  getId
} from '../../Utilities';
import { IHoverCardHostProps, IHoverCardHostStyles } from './HoverCardHost.Props';
import { HoverCard } from './HoverCard';

import { getStyles } from './HoverCardHost.styles';

export interface IHoverCardHostState {
  isHoverCardVisible?: boolean;
  openExpanded?: boolean;
}

export class HoverCardHost extends BaseComponent<IHoverCardHostProps, IHoverCardHostState> {
  public static defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100
  };

  // The wrapping div that gets the hover events
  private _hoverCardHost: HTMLElement;
  private _dismissTimerId: number;
  private _openTimerId: number;

  private _styles: IHoverCardHostStyles;

  // Constructor
  constructor(props: IHoverCardHostProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false,
      openExpanded: false
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
        onClick={ this._instantOpenExpanded }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <HoverCard
            { ...hoverCardProps }
            id={ hoverCardId }
            targetElement={ this._getTargetElement() }
            onEnter={ this._cardOpen }
            onDismiss={ this._cardDismiss }
            { ...getNativeProps(this.props, divProperties) }
            openExpanded={ this.state.openExpanded }
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
  private _cardDismiss(ev: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) {
    const eventType = ev.type;
    this._async.clearTimeout(this._openTimerId);

    this._dismissTimerId = this._async.setTimeout(() => {
      if (!(this.props.sticky && eventType === 'mouseleave')) {
        this.setState({
          isHoverCardVisible: false,
          openExpanded: false
        });
      }
    }, this.props.cardDismissDelay);
  }

  // Instant Open the card in Expanded mode
  @autobind
  private _instantOpenExpanded(ev) {
    this.setState({
      isHoverCardVisible: true,
      openExpanded: true
    });
  }
}
