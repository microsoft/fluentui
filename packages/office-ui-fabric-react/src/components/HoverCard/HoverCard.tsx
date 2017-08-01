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
import { IHoverCardProps, IHoverCardStyles } from './HoverCard.Props';
import { ExpandingCard } from './ExpandingCard';
import { ExpandingCardMode } from './ExpandingCard.Props';

import { getStyles } from './HoverCard.styles';

export interface IHoverCardState {
  isHoverCardVisible: boolean;
  mode: ExpandingCardMode;
}

export class HoverCard extends BaseComponent<IHoverCardProps, IHoverCardState> {
  public static defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100,
    expandedCardOpenDelay: 1500,
    instantOpenOnClick: false
  };

  // The wrapping div that gets the hover events
  private _hoverCard: HTMLElement;
  private _dismissTimerId: number;
  private _openTimerId: number;

  private _styles: IHoverCardStyles;

  // Constructor
  constructor(props: IHoverCardProps) {
    super(props);

    this.state = {
      isHoverCardVisible: false,
      mode: ExpandingCardMode.compact
    };
  }

  public componentWillUpdate(newProps: IHoverCardProps, newState: IHoverCardState) {
    if (newState.isHoverCardVisible !== this.state.isHoverCardVisible) {
      if (newState.isHoverCardVisible) {
        this._async.setTimeout(() => {
          this.setState({
            mode: ExpandingCardMode.expanded
          });
        }, this.props.expandedCardOpenDelay!);
      } else {
        this.setState({
          mode: ExpandingCardMode.compact
        });
      }
    }
  }

  // Render
  public render() {
    const {
      expandingCardProps,
      children,
      id,
      instantOpenOnClick,
      setAriaDescribedBy = true,
      styles: customStyles
    } = this.props;
    const { isHoverCardVisible, mode } = this.state;
    const hoverCardId = id || getId('hoverCard');

    this._styles = getStyles(customStyles);

    let onClick;
    if (instantOpenOnClick) {
      onClick = this._instantOpenExpanded;
    }
    return (
      <div
        className={ css(this._styles.host) }
        ref={ this._resolveRef('_hoverCard') }
        onFocusCapture={ this._cardOpen }
        onBlurCapture={ this._cardDismiss }
        onMouseEnter={ this._cardOpen }
        onMouseLeave={ this._cardDismiss }
        onClick={ onClick }
        aria-describedby={ setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined }
      >
        { children }
        { isHoverCardVisible &&
          <ExpandingCard
            { ...getNativeProps(this.props, divProperties) }
            id={ hoverCardId }
            targetElement={ this._getTargetElement() }
            onEnter={ this._cardOpen }
            onLeave={ this._cardDismiss }
            mode={ mode }
            { ...expandingCardProps }
          />
        }
      </div>
    );
  }

  private _getTargetElement(): HTMLElement {
    return this._hoverCard;
  }

  // Show HoverCard
  @autobind
  private _cardOpen(ev: any) {
    this._async.clearTimeout(this._dismissTimerId);

    this._openTimerId = this._async.setTimeout(() => {
      if (!this.state.isHoverCardVisible) {
        this.setState({
          isHoverCardVisible: true,
          mode: ExpandingCardMode.compact
        });
      }
    }, this.props.cardOpenDelay!);
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
          mode: ExpandingCardMode.compact
        });
      }
    }, this.props.cardDismissDelay!);
  }

  // Instant Open the card in Expanded mode
  @autobind
  private _instantOpenExpanded(ev: React.MouseEvent<HTMLDivElement>) {
    this.setState({
      isHoverCardVisible: true,
      mode: ExpandingCardMode.expanded
    });
  }
}
