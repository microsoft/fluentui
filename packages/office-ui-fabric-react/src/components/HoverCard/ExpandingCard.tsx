/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties,
  customizable,
  autobind,
  getRTL
} from '../../Utilities';
import { IExpandingCardProps, IExpandingCardStyles, ExpandingCardMode } from './ExpandingCard.Props';
import { Callout, ICallout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationClassNames, mergeStyles } from '../../Styling';

import { getStyles } from './ExpandingCard.styles';

export interface IExpandingCardState {
  firstFrameRendered: boolean;
  needsScroll: boolean;
}

@customizable(['theme'])
export class ExpandingCard extends BaseComponent<IExpandingCardProps, IExpandingCardState> {
  public static defaultProps = {
    compactCardHeight: 156,
    expandedCardHeight: 384,
    directionalHint: DirectionalHint.bottomLeftEdge,
    gapSpace: 0
  };

  private _styles: IExpandingCardStyles;
  private _callout: ICallout;
  private _expandedElem: HTMLDivElement;
  private _fullCard: HTMLDivElement;

  constructor(props: IExpandingCardProps) {
    super(props);

    this.state = {
      firstFrameRendered: false,
      needsScroll: false
    };
  }

  public componentDidMount() {
    if (this._expandedElem && this._expandedElem.scrollHeight >= (this.props.expandedCardHeight as number)) {
      this.setState({
        needsScroll: true
      });
    }
  }

  public componentWillUnmount() {
    this._async.dispose();
  }

  public render() {
    const {
      targetElement,
      id,
      theme,
      styles: customStyles,
      onRenderCompactCard,
      onRenderExpandedCard,
      compactCardHeight,
      expandedCardHeight
    } = this.props;
    this._styles = getStyles(theme!, customStyles);

    return (
      <Callout
        { ...getNativeProps(this.props, divProperties) }
        componentRef={ this._resolveRef('_callout') }
        className={ css(
          AnimationClassNames.scaleUpIn100,
          this._styles.root
        ) }
        targetElement={ targetElement }
        isBeakVisible={ false }
        directionalHint={ this.props.directionalHint }
        directionalHintFixed={ true }
        finalHeight={ compactCardHeight! + expandedCardHeight! }
        minPagePadding={ 24 }
        gapSpace={ this.props.gapSpace }
      >
        <div
          onFocusCapture={ this.props.onEnter }
          onBlurCapture={ this.props.onLeave }
          onMouseEnter={ this.props.onEnter }
          onMouseLeave={ this.props.onLeave }
          ref={ this._resolveRef('_fullCard') }
        >
          { this._onRenderCompactCard() }
          { this._onRenderExpandedCard() }
        </div>
      </Callout >
    );
  }

  public get element(): HTMLDivElement {
    return this._fullCard;
  }

  @autobind
  private _onRenderCompactCard(): JSX.Element {
    return (
      <div className={ mergeStyles(this._styles.compactCard, { height: this.props.compactCardHeight + 'px' }) as string }>
        { this.props.onRenderCompactCard!(this.props.renderData) }
      </div>
    );
  }

  @autobind
  private _onRenderExpandedCard(): JSX.Element {
    // firstFrameRendered helps in initially setting height of expanded card to 0, even if
    // mode prop is set to ExpandingCardMode.expanded on first render. This is to make sure transition animation takes place.
    this._async.requestAnimationFrame(() => {
      this.setState({
        firstFrameRendered: true
      });
    });

    return (
      <div className={ mergeStyles(
        this._styles.expandedCard,
        this.props.mode === ExpandingCardMode.expanded && this.state.firstFrameRendered && { height: this.props.expandedCardHeight + 'px' },
        this.state.needsScroll && { 'overflow-y': 'auto' }
      ) as string }
        ref={ this._resolveRef('_expandedElem') }
      >
        <div className={ this._styles.expandedCardScroll as string }>
          { this.props.onRenderExpandedCard && this.props.onRenderExpandedCard(this.props.renderData) }
        </div>
      </div>
    );
  }

  @autobind
  private _checkNeedsScroll(): void {
    if (this._expandedElem) {
      this._async.requestAnimationFrame(() => {
        if (this._expandedElem.scrollHeight >= this.props.expandedCardHeight!) {
          this.setState({
            needsScroll: true
          });
        }
      });
    }
  }
}
