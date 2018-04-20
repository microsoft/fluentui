import * as React from 'react';
import {
  BaseComponent,
  getNativeProps,
  divProperties,
  customizable,
  KeyCodes,
  createRef
} from '../../Utilities';
import { IExpandingCardProps, IExpandingCardStyles, ExpandingCardMode } from './ExpandingCard.types';
import { Callout, ICallout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { AnimationStyles, mergeStyles } from '../../Styling';
import { FocusTrapZone } from '../../FocusTrapZone';
import { getStyles } from './ExpandingCard.styles';

export interface IExpandingCardState {
  firstFrameRendered: boolean;
  needsScroll: boolean;
}

@customizable('ExpandingCard', ['theme'])
export class ExpandingCard extends BaseComponent<IExpandingCardProps, IExpandingCardState> {
  public static defaultProps = {
    compactCardHeight: 156,
    expandedCardHeight: 384,
    directionalHint: DirectionalHint.bottomLeftEdge,
    directionalHintFixed: true,
    gapSpace: 0
  };

  private _styles: IExpandingCardStyles;
  // tslint:disable-next-line:no-unused-variable
  private _callout = createRef<ICallout>();
  private _expandedElem = createRef<HTMLDivElement>();

  constructor(props: IExpandingCardProps) {
    super(props);

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

  public render(): JSX.Element {
    const {
      targetElement,
      theme,
      styles: customStyles,
      compactCardHeight,
      directionalHintFixed,
      firstFocus,
      expandedCardHeight
    } = this.props;
    this._styles = getStyles(theme!, customStyles);

    const content = (
      <div
        onMouseEnter={ this.props.onEnter }
        onMouseLeave={ this.props.onLeave }
        onKeyDown={ this._onKeyDown }
      >
        { this._onRenderCompactCard() }
        { this._onRenderExpandedCard() }
      </div>
    );

    return (
      <Callout
        { ...getNativeProps(this.props, divProperties) }
        componentRef={ this._callout }
        className={ mergeStyles(
          AnimationStyles.scaleUpIn100,
          this._styles.root
        ) }
        target={ targetElement }
        isBeakVisible={ false }
        directionalHint={ this.props.directionalHint }
        directionalHintFixed={ directionalHintFixed }
        finalHeight={ compactCardHeight! + expandedCardHeight! }
        minPagePadding={ 24 }
        onDismiss={ this.props.onLeave }
        gapSpace={ this.props.gapSpace }
      >
        { this.props.trapFocus ?
          <FocusTrapZone forceFocusInsideTrap={ false } isClickableOutsideFocusTrap={ true } disableFirstFocus={ !firstFocus }>
            { content }
          </FocusTrapZone> :
          content
        }
      </Callout >
    );
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which === KeyCodes.escape) {
      this.props.onLeave && this.props.onLeave(ev);
    }
  }

  private _onRenderCompactCard = (): JSX.Element => {
    return (
      <div className={ mergeStyles(this._styles.compactCard, { height: this.props.compactCardHeight + 'px' }) as string }>
        { this.props.onRenderCompactCard!(this.props.renderData) }
      </div>
    );
  }

  private _onRenderExpandedCard = (): JSX.Element => {
    // firstFrameRendered helps in initially setting height of expanded card to 1px, even if
    // mode prop is set to ExpandingCardMode.expanded on first render. This is to make sure transition animation takes place.
    !this.state.firstFrameRendered && this._async.requestAnimationFrame(() => {
      this.setState({
        firstFrameRendered: true
      });
    });

    return (
      <div
        className={ mergeStyles(
          this._styles.expandedCard,
          this.props.mode === ExpandingCardMode.expanded && this.state.firstFrameRendered && { height: this.props.expandedCardHeight + 'px' }
        ) }
        ref={ this._expandedElem }
      >
        <div className={ mergeStyles(this.state.needsScroll && this._styles.expandedCardScroll) }>
          { this.props.onRenderExpandedCard && this.props.onRenderExpandedCard(this.props.renderData) }
        </div>
      </div>
    );
  }

  private _checkNeedsScroll = (): void => {
    if (this._expandedElem.current) {
      this._async.requestAnimationFrame(() => {
        if (this._expandedElem.current && this._expandedElem.current.scrollHeight >= this.props.expandedCardHeight!) {
          this.setState({
            needsScroll: true
          });
        }
      });
    }
  }
}
