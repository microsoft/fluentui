/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  ICalloutProps,
  ICalloutContentStyleProps,
  ICalloutContentStyles
} from './Callout.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  BaseComponent,
  IPoint,
  IRectangle,
  assign,
  elementContains,
  focusFirstChild,
  getWindow,
  getDocument,
  customizable,
  css,
  createRef
} from '../../Utilities';
import {
  positionCallout,
  ICalloutPositionedInfo,
  IPositionProps,
  getMaxHeight,
  IPosition,
  RectangleEdge
} from '../../utilities/positioning';
import { Popup } from '../../Popup';
import { classNamesFunction } from '../../Utilities';
import {
  AnimationClassNames
} from '../../Styling';

const ANIMATIONS: { [key: number]: string | undefined; } = {
  [RectangleEdge.top]: AnimationClassNames.slideUpIn10,
  [RectangleEdge.bottom]: AnimationClassNames.slideDownIn10,
  [RectangleEdge.left]: AnimationClassNames.slideLeftIn10,
  [RectangleEdge.right]: AnimationClassNames.slideRightIn10,
};

const getClassNames = classNamesFunction<ICalloutContentStyleProps, ICalloutContentStyles>();
const BORDER_WIDTH = 1;
const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
// Microsoft Edge will overwrite inline styles if there is an animation pertaining to that style.
// To help ensure that edge will respect the offscreen style opacity
// filter needs to be added as an additional way to set opacity.
const OFF_SCREEN_STYLE = { opacity: 0, filter: 'opacity(0)' };

export interface ICalloutState {
  positions?: ICalloutPositionedInfo;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
  heightOffset?: number;
}

@customizable('CalloutContent', ['theme'])
export class CalloutContentBase extends BaseComponent<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    preventDismissOnScroll: false,
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint.bottomAutoEdge
  };

  private _classNames: { [key in keyof ICalloutContentStyles]: string };
  private _didSetInitialFocus: boolean;
  private _hostElement = createRef<HTMLDivElement>();
  private _calloutElement = createRef<HTMLDivElement>();
  private _targetWindow: Window;
  private _bounds: IRectangle;
  private _positionAttempts: number;
  private _target: Element | MouseEvent | IPoint | null;
  private _setHeightOffsetTimer: number;
  private _hasListeners = false;
  private _maxHeight: number | undefined;

  constructor(props: ICalloutProps) {
    super(props);

    this._warnDeprecations({ 'beakStyle': 'beakWidth' });

    this._didSetInitialFocus = false;
    this.state = {
      positions: undefined,
      slideDirectionalClassName: undefined,
      // @TODO it looks like this is not even being used anymore.
      calloutElementRect: undefined,
      heightOffset: 0
    };
    this._positionAttempts = 0;
  }

  public componentDidUpdate() {
    this._setInitialFocus();
    if (!this.props.hidden) {
      if (!this._hasListeners) {
        this._addListeners();
      }
      this._updateAsyncPosition();
    } else {
      if (this._hasListeners) {
        this._removeListeners();
      }
    }
  }

  public componentWillMount() {
    this._setTargetWindowAndElement(this._getTarget());
  }

  public componentWillUpdate(newProps: ICalloutProps) {
    // If the target element changed, find the new one. If we are tracking target with class name, always find element because we do not know if fabric has rendered a new element and disposed the old element.
    const newTarget = this._getTarget(newProps);
    const oldTarget = this._getTarget();
    if (newTarget !== oldTarget || typeof (newTarget) === 'string' || newTarget instanceof String) {
      this._maxHeight = undefined;
      this._setTargetWindowAndElement(newTarget!);
    }
    if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
      this._maxHeight = undefined;
    }

    if (newProps.finalHeight !== this.props.finalHeight) {
      this._setHeightOffsetEveryFrame();
    }

    // if the callout becomes hidden, then remove any positions that were placed on it.
    if (newProps.hidden && newProps.hidden !== this.props.hidden) {
      this.setState({
        positions: undefined
      });
    }

  }

  public componentDidMount() {
    if (!this.props.hidden) {
      this._onComponentDidMount();
    }
  }

  public render() {
    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!this._targetWindow) {
      return null;
    }
    let {
      target
    } = this.props;
    const {
      getStyles,
      role,
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      className,
      isBeakVisible,
      beakStyle,
      children,
      beakWidth,
      calloutWidth,
      finalHeight,
      backgroundColor,
      calloutMaxHeight,
      onScroll,
    } = this.props;
    target = this._getTarget();
    const { positions } = this.state;

    const getContentMaxHeight: number | undefined = this._getMaxHeight() ? this._getMaxHeight()! + this.state.heightOffset! : undefined;
    const contentMaxHeight: number | undefined = calloutMaxHeight! && getContentMaxHeight && (calloutMaxHeight! < getContentMaxHeight) ? calloutMaxHeight! : getContentMaxHeight!;
    const overflowYHidden = !!finalHeight;

    const beakVisible = isBeakVisible && (!!target);
    this._classNames = getClassNames(
      getStyles!,
      {
        theme: this.props.theme!,
        className,
        overflowYHidden: overflowYHidden,
        calloutWidth,
        positions,
        beakWidth,
        backgroundColor,
        beakStyle
      }
    );

    const overflowStyle: React.CSSProperties = overflowYHidden ? { overflowY: 'hidden', maxHeight: contentMaxHeight } : { maxHeight: contentMaxHeight };
    const visibilityStyle: React.CSSProperties | undefined = this.props.hidden ? { visibility: 'hidden' } : undefined;
    // React.CSSProperties does not understand IRawStyle, so the inline animations will need to be cast as any for now.
    const content = (
      <div
        ref={ this._hostElement }
        className={ this._classNames.container }
        style={ visibilityStyle }
      >
        <div
          className={ css(this._classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge!]) }
          style={ positions ? positions.elementPosition : OFF_SCREEN_STYLE }
          tabIndex={ -1 } // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          ref={ this._calloutElement }
        >

          { beakVisible && (
            <div
              className={ this._classNames.beak }
              style={ this._getBeakPosition() }
            />) }
          { beakVisible &&
            (<div className={ this._classNames.beakCurtain } />) }
          { !this.props.hidden && <Popup
            role={ role }
            ariaLabel={ ariaLabel }
            ariaDescribedBy={ ariaDescribedBy }
            ariaLabelledBy={ ariaLabelledBy }
            className={ this._classNames.calloutMain }
            onDismiss={ this.dismiss }
            onScroll={ onScroll }
            shouldRestoreFocus={ true }
            style={ overflowStyle }
          >
            { children }
          </Popup>
          }
        </div>
      </div >
    );

    return content;
  }

  public dismiss = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev);
    }
  }

  protected _dismissOnScroll(ev: Event) {
    const { preventDismissOnScroll } = this.props;
    if (this.state.positions && !preventDismissOnScroll) {
      this._dismissOnLostFocus(ev);
    }
  }

  protected _dismissOnLostFocus(ev: Event) {
    const target = ev.target as HTMLElement;
    const clickedOutsideCallout = this._hostElement.value && !elementContains(this._hostElement.value, target);

    if (
      (!this._target && clickedOutsideCallout) ||
      ev.target !== this._targetWindow &&
      clickedOutsideCallout &&
      ((this._target as MouseEvent).stopPropagation ||
        (!this._target || (target !== this._target && !elementContains(this._target as HTMLElement, target))))) {
      this.dismiss(ev);
    }
  }

  protected _setInitialFocus = (): void => {
    if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions && this._calloutElement.value) {
      this._didSetInitialFocus = true;
      this._async.requestAnimationFrame(() => focusFirstChild(this._calloutElement.value!));
    }
  }

  protected _onComponentDidMount = (): void => {

    this._addListeners();

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updateAsyncPosition();
    this._setHeightOffsetEveryFrame();
  }

  private _addListeners() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the callout.
    this._async.setTimeout(() => {
      this._events.on(this._targetWindow, 'scroll', this._dismissOnScroll, true);
      this._events.on(this._targetWindow, 'resize', this.dismiss, true);
      this._events.on(this._targetWindow.document.body, 'focus', this._dismissOnLostFocus, true);
      this._events.on(this._targetWindow.document.body, 'click', this._dismissOnLostFocus, true);
      this._hasListeners = true;
    }, 0);
  }

  private _removeListeners() {
    this._events.off(this._targetWindow, 'scroll', this._dismissOnScroll, true);
    this._events.off(this._targetWindow, 'resize', this.dismiss, true);
    this._events.off(this._targetWindow.document.body, 'focus', this._dismissOnLostFocus, true);
    this._events.off(this._targetWindow.document.body, 'click', this._dismissOnLostFocus, true);
    this._hasListeners = false;
  }

  private _updateAsyncPosition() {
    this._async.requestAnimationFrame(() => this._updatePosition());
  }

  private _getBeakPosition(): React.CSSProperties {
    const { positions } = this.state;
    const beakPostionStyle: React.CSSProperties = {
      ...(positions && positions.beakPosition ? positions.beakPosition.elementPosition : null),
    };

    if (!beakPostionStyle.top && !beakPostionStyle.bottom && !beakPostionStyle.left && !beakPostionStyle.right) {
      beakPostionStyle.left = BEAK_ORIGIN_POSITION.left;
      beakPostionStyle.top = BEAK_ORIGIN_POSITION.top;
    }

    return beakPostionStyle;
  }

  private _updatePosition() {
    const { positions } = this.state;
    const hostElement: HTMLElement | null = this._hostElement.value;
    const calloutElement: HTMLElement | null = this._calloutElement.value;

    if (hostElement && calloutElement) {
      let currentProps: IPositionProps | undefined;
      currentProps = assign(currentProps, this.props);
      currentProps!.bounds = this._getBounds();
      currentProps!.target = this._target!;
      const newPositions: ICalloutPositionedInfo = positionCallout(currentProps!, hostElement, calloutElement, positions);

      // Set the new position only when the positions are not exists or one of the new callout positions are different.
      // The position should not change if the position is within 2 decimal places.
      if ((!positions && newPositions) ||
        (positions && newPositions && !this._arePositionsEqual(positions, newPositions)
          && this._positionAttempts < 5)) {
        // We should not reposition the callout more than a few times, if it is then the content is likely resizing
        // and we should stop trying to reposition to prevent a stack overflow.
        this._positionAttempts++;
        this.setState({
          positions: newPositions
        });
      } else {
        this._positionAttempts = 0;
        if (this.props.onPositioned) {
          this.props.onPositioned(this.state.positions);
        }
      }
    }
  }

  private _getBounds(): IRectangle {
    if (!this._bounds) {
      let currentBounds = this.props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + this.props.minPagePadding!,
          left: 0 + this.props.minPagePadding!,
          right: this._targetWindow.innerWidth - this.props.minPagePadding!,
          bottom: this._targetWindow.innerHeight - this.props.minPagePadding!,
          width: this._targetWindow.innerWidth - this.props.minPagePadding! * 2,
          height: this._targetWindow.innerHeight - this.props.minPagePadding! * 2
        };
      }
      this._bounds = currentBounds;
    }
    return this._bounds;
  }

  // Max height should remain as synchronous as possible, which is why it is not done using set state.
  // It needs to be synchronous since it will impact the ultimate position of the callout.
  private _getMaxHeight(): number | undefined {
    if (!this._maxHeight) {
      if (this.props.directionalHintFixed && this._target) {
        const beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
        const gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
        // Since the callout cannot measure it's border size it must be taken into account here. Otherwise it will
        // overlap with the target.
        const totalGap = gapSpace + beakWidth! + BORDER_WIDTH * 2;
        this._async.requestAnimationFrame(() => {
          if (this._target) {
            this._maxHeight = getMaxHeight(this._target, this.props.directionalHint!, totalGap, this._getBounds());
            this.forceUpdate();
          }
        });
      } else {
        this._maxHeight = this._getBounds().height! - BORDER_WIDTH * 2;
      }
    }
    return this._maxHeight!;
  }

  private _arePositionsEqual(positions: ICalloutPositionedInfo, newPosition: ICalloutPositionedInfo) {
    return this._comparePositions(positions.elementPosition, newPosition.elementPosition) &&
      this._comparePositions(positions.beakPosition.elementPosition, newPosition.beakPosition.elementPosition);
  }

  private _comparePositions(oldPositions: IPosition, newPositions: IPosition) {
    for (const key in newPositions) {
      // This needs to be checked here and below because there is a linting error if for in does not immediately have an if statement
      if (newPositions.hasOwnProperty(key)) {
        const oldPositionEdge = oldPositions[key];
        const newPositionEdge = newPositions[key];

        if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
          if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  private _setTargetWindowAndElement(target: Element | string | MouseEvent | IPoint | null): void {
    if (target) {
      if (typeof target === 'string') {
        const currentDoc: Document = getDocument()!;
        this._target = currentDoc ? currentDoc.querySelector(target) as Element : null;
        this._targetWindow = getWindow()!;
      } else if ((target as MouseEvent).stopPropagation) {
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement)!;
        this._target = target;
      } else if ((target as Element).getBoundingClientRect) {
        const targetElement: Element = target as Element;
        this._targetWindow = getWindow(targetElement)!;
        this._target = target;
        // HTMLImgElements can have x and y values. The check for it being a point must go last.
      } else {
        this._targetWindow = getWindow()!;
        this._target = target;
      }
    } else {
      this._targetWindow = getWindow()!;
    }
  }

  private _setHeightOffsetEveryFrame(): void {
    if (this._calloutElement.value && this.props.finalHeight) {
      this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
        const calloutMainElem = this._calloutElement.value && this._calloutElement.value.lastChild as HTMLElement;

        if (!calloutMainElem) {
          return;
        }

        const cardScrollHeight: number = calloutMainElem.scrollHeight;
        const cardCurrHeight: number = calloutMainElem.offsetHeight;
        const scrollDiff: number = cardScrollHeight - cardCurrHeight;

        this.setState({
          heightOffset: this.state.heightOffset! + scrollDiff
        });

        if (calloutMainElem.offsetHeight < this.props.finalHeight!) {
          this._setHeightOffsetEveryFrame();
        } else {
          this._async.cancelAnimationFrame(this._setHeightOffsetTimer);
        }
      });
    }
  }

  private _getTarget(props: ICalloutProps = this.props): Element | string | MouseEvent | IPoint | null {
    const { useTargetPoint, targetPoint, target } = props;
    return useTargetPoint ? targetPoint! : target!;
  }
}
