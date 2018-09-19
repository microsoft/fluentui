import * as React from 'react';

import { Card } from './Card';
import { classNamesFunction, createRef } from '../../Utilities';
import {
  ExpandingCardMode,
  IExpandingCardProps,
  IExpandingCardStyles,
  IExpandingCardStyleProps,
  IExpandingCard
} from './ExpandingCard.types';

const getClassNames = classNamesFunction<IExpandingCardStyleProps, IExpandingCardStyles>();

const COMPACT_CARD_HEIGHT = 156;
const EXPANDED_CARD_HEIGHT = 384;

export interface IExpandingCardState {
  firstFrameRendered: boolean;
  needsScroll: boolean;
}

export class ExpandingCardBase extends Card<
  IExpandingCard,
  IExpandingCardProps,
  IExpandingCardStyles,
  IExpandingCardStyleProps,
  IExpandingCardState
> {
  private _expandedElem = createRef<HTMLDivElement>();

  constructor(props: IExpandingCardProps) {
    super(props);

    this._directionalHintFixed = true;

    this.state = {
      firstFrameRendered: false,
      needsScroll: false
    };
  }

  public componentDidMount(): void {
    this._checkNeedsScroll();
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  protected setStyles(): void {
    const {
      styles,
      compactCardHeight = COMPACT_CARD_HEIGHT,
      expandedCardHeight = EXPANDED_CARD_HEIGHT,
      theme,
      mode,
      className
    } = this.props;
    const { needsScroll, firstFrameRendered } = this.state;

    this._finalHeight = compactCardHeight! + expandedCardHeight!;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      compactCardHeight,
      className,
      expandedCardHeight,
      needsScroll: needsScroll,
      expandedCardFirstFrameRendered: mode === ExpandingCardMode.expanded && firstFrameRendered
    });
  }

  protected renderContent(): JSX.Element {
    return (
      <div onMouseEnter={this.props.onEnter} onMouseLeave={this.props.onLeave} onKeyDown={this.onKeyDown}>
        {this._onRenderCompactCard()}
        {this._onRenderExpandedCard()}
      </div>
    );
  }

  private _onRenderCompactCard = (): JSX.Element => {
    return <div className={this._classNames.compactCard}>{this.props.onRenderCompactCard!(this.props.renderData)}</div>;
  };

  private _onRenderExpandedCard = (): JSX.Element => {
    // firstFrameRendered helps in initially setting height of expanded card to 1px, even if
    // mode prop is set to ExpandingCardMode.expanded on first render. This is to make sure transition animation takes place.
    !this.state.firstFrameRendered &&
      this._async.requestAnimationFrame(() => {
        this.setState({
          firstFrameRendered: true
        });
      });

    return (
      <div className={this._classNames.expandedCard} ref={this._expandedElem}>
        <div className={this._classNames.expandedCardScroll}>
          {this.props.onRenderExpandedCard && this.props.onRenderExpandedCard(this.props.renderData)}
        </div>
      </div>
    );
  };

  private _checkNeedsScroll = (): void => {
    const { expandedCardHeight = EXPANDED_CARD_HEIGHT } = this.props;
    if (this._expandedElem.current) {
      this._async.requestAnimationFrame(() => {
        if (this._expandedElem.current && this._expandedElem.current.scrollHeight >= expandedCardHeight!) {
          this.setState({
            needsScroll: true
          });
        }
      });
    }
  };
}
