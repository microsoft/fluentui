/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  BaseComponent,
  IRectangle,
  assign,
  autobind,
  css,
  elementContains,
  focusFirstChild,
  getWindow,
  getDocument
} from '../../Utilities';
import { getRelativePositions, IPositionInfo, IPositionProps, getMaxHeight } from '../../utilities/positioning';
import { Popup } from '../../Popup';
import * as stylesImport from './Callout.scss';
import { AnimationClassNames, mergeStyles } from '../../Styling';
import {
  CommandButton
} from '../../Button';

const styles: any = stylesImport;

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_STYLE = { opacity: 0 };
const BORDER_WIDTH: number = 1;

export interface ICalloutState {
  positions?: IPositionInfo;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
  heightOffset?: number;
}

export class CalloutContent extends BaseComponent<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    preventDismissOnScroll: false,
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint.bottomAutoEdge
  };

  private _didSetInitialFocus: boolean;
  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;
  private _targetWindow: Window;
  private _bounds: IRectangle;
  private _maxHeight: number | undefined;
  private _positionAttempts: number;
  private _target: HTMLElement | MouseEvent | null;
  private _setHeightOffsetTimer: number;

  constructor(props: ICalloutProps) {
    super(props);

    this._warnDeprecations({ 'beakStyle': 'beakWidth' });

    this._didSetInitialFocus = false;
    this.state = {
      positions: undefined,
      slideDirectionalClassName: undefined,
      calloutElementRect: undefined,
      heightOffset: 0
    };
    this._positionAttempts = 0;
  }

  public componentDidUpdate() {
    this._setInitialFocus();
    this._updateAsyncPosition();
  }

  public componentWillMount() {
    let target = this.props.targetElement ? this.props.targetElement : this.props.target;
    this._setTargetWindowAndElement(target!);
  }

  public componentWillUpdate(newProps: ICalloutProps) {
    // If the target element changed, find the new one. If we are tracking target with class name, always find element because we do not know if fabric has rendered a new element and disposed the old element.
    if (newProps.targetElement !== this.props.targetElement || newProps.target !== this.props.target || typeof (newProps.target) === 'string' || newProps.target instanceof String) {
      let newTarget = newProps.targetElement ? newProps.targetElement : newProps.target;
      this._maxHeight = undefined;
      this._setTargetWindowAndElement(newTarget!);
    }
    if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
      this._maxHeight = undefined;
    }

    if (newProps.finalHeight !== this.props.finalHeight) {
      this._setHeightOffsetEveryFrame();
    }
  }

  public componentDidMount() {
    this._onComponentDidMount();
  }

  public render() {
    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!this._targetWindow) {
      return null;
    }
    let {
      role,
      ariaLabel,
      ariaDescribedBy,
      ariaLabelledBy,
      className,
      target,
      targetElement,
      isBeakVisible,
      beakStyle,
      children,
      beakWidth,
      calloutWidth,
      finalHeight,
      backgroundColor,
      calloutButton } = this.props;
    let { positions } = this.state;
    let beakStyleWidth = beakWidth;

    // This is here to support the old way of setting the beak size until version 1.0.0.
    // beakStyle is now deprecated and will be be removed at version 1.0.0
    if (beakStyle === 'ms-Callout-smallbeak') {
      beakStyleWidth = 16;
    }

    let beakReactStyle: React.CSSProperties = {
      top: positions && positions.beakPosition ? positions.beakPosition.top : BEAK_ORIGIN_POSITION.top,
      left: positions && positions.beakPosition ? positions.beakPosition.left : BEAK_ORIGIN_POSITION.left,
      height: beakStyleWidth,
      width: beakStyleWidth,
      backgroundColor: backgroundColor,
    };

    let directionalClassName = (positions && positions.directionalClassName)
      ? (AnimationClassNames as any)[positions.directionalClassName]
      : '';

    let contentMaxHeight: number = this._getMaxHeight() + this.state.heightOffset!;
    let beakVisible = isBeakVisible && (!!targetElement || !!target);

    let content = (
      <div
        ref={ this._resolveRef('_hostElement') }
        className={ css('ms-Callout-container', styles.container) }
      >
        <div
          className={
            mergeStyles(
              'ms-Callout',
              styles.root,
              className,
              directionalClassName,
              calloutWidth && { width: calloutWidth }
            ) as string }
          style={ positions ? positions.calloutPosition : OFF_SCREEN_STYLE }
          tabIndex={ -1 } // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          ref={ this._resolveRef('_calloutElement') }
        >

          { beakVisible && (
            <div
              className={ css('ms-Callout-beak', styles.beak) }
              style={ beakReactStyle }
            />) }

          { beakVisible &&
            (<div className={ css('ms-Callout-beakCurtain', styles.beakCurtain) } />) }
          <Popup
            role={ role }
            ariaLabel={ ariaLabel }
            ariaDescribedBy={ ariaDescribedBy }
            ariaLabelledBy={ ariaLabelledBy }
            className={ css('ms-Callout-main', styles.main, {
              [styles.overFlowYHidden]: !!finalHeight
            }) }
            onDismiss={ this.dismiss }
            shouldRestoreFocus={ true }
            style={ { maxHeight: contentMaxHeight, backgroundColor: backgroundColor } }
          >
            { children }
          </Popup>
          { calloutButton && (
            <CommandButton
              className={ css('ms-Callout-button', styles.calloutButton) }
              styles={ calloutButton.styles }
              onClick={ calloutButton.onSelected }
              role='button'
              ariaLabel={ calloutButton.text }
            >
              {
                <span> { calloutButton.text }</span>
              }
            </CommandButton>
          ) }
        </div>
      </div>
    );

    return content;
  }

  @autobind
  public dismiss(ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
    let { onDismiss } = this.props;

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
    let target = ev.target as HTMLElement;
    let clickedOutsideCallout = this._hostElement && !elementContains(this._hostElement, target);

    if (
      (!this._target && clickedOutsideCallout) ||
      ev.target !== this._targetWindow &&
      clickedOutsideCallout &&
      ((this._target as MouseEvent).stopPropagation ||
        (!this._target || (target !== this._target && !elementContains(this._target as HTMLElement, target))))) {
      this.dismiss(ev);
    }
  }

  @autobind
  protected _setInitialFocus() {
    if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
      this._didSetInitialFocus = true;
      focusFirstChild(this._calloutElement);
    }
  }

  @autobind
  protected _onComponentDidMount() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the callout.
    this._async.setTimeout(() => {
      this._events.on(this._targetWindow, 'scroll', this._dismissOnScroll, true);
      this._events.on(this._targetWindow, 'resize', this.dismiss, true);
      this._events.on(this._targetWindow.document.body, 'focus', this._dismissOnLostFocus, true);
      this._events.on(this._targetWindow.document.body, 'click', this._dismissOnLostFocus, true);
    }, 0);

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updateAsyncPosition();
    this._setHeightOffsetEveryFrame();
  }
  private _updateAsyncPosition() {
    this._async.requestAnimationFrame(() => this._updatePosition());
  }
  private _updatePosition() {
    let { positions } = this.state;
    let hostElement: HTMLElement = this._hostElement;
    let calloutElement: HTMLElement = this._calloutElement;

    if (hostElement && calloutElement) {
      let currentProps: IPositionProps | undefined;
      currentProps = assign(currentProps, this.props);
      currentProps!.bounds = this._getBounds();
      // Temporary to be removed when targetElement is removed. Currently deprecated.
      if (this.props.targetElement) {
        currentProps!.targetElement = this._target as HTMLElement;
      } else {
        currentProps!.target = this._target!;
      }
      let newPositions: IPositionInfo = getRelativePositions(currentProps!, hostElement, calloutElement);

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
          this.props.onPositioned();
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

  private _getMaxHeight(): number {
    if (!this._maxHeight) {
      if (this.props.directionalHintFixed && this._target) {
        let beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
        let gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
        this._maxHeight = getMaxHeight(this._target, this.props.directionalHint!, beakWidth! + gapSpace, this._getBounds());
      } else {
        this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
      }
    }
    return this._maxHeight;
  }

  private _arePositionsEqual(positions: IPositionInfo, newPosition: IPositionInfo) {
    if (positions.calloutPosition.top.toFixed(2) !== newPosition.calloutPosition.top.toFixed(2)) {
      return false;
    }
    if (positions.calloutPosition.left.toFixed(2) !== newPosition.calloutPosition.left.toFixed(2)) {
      return false;
    }
    if (positions.beakPosition.top.toFixed(2) !== newPosition.beakPosition.top.toFixed(2)) {
      return false;
    }
    if (positions.beakPosition.left.toFixed(2) !== newPosition.beakPosition.left.toFixed(2)) {
      return false;
    }

    return true;

  }

  private _setTargetWindowAndElement(target: HTMLElement | string | MouseEvent): void {
    if (target) {
      if (typeof target === 'string') {
        let currentDoc: Document = getDocument()!;
        this._target = currentDoc ? currentDoc.querySelector(target) as HTMLElement : null;
        this._targetWindow = getWindow()!;
      } else if ((target as MouseEvent).stopPropagation) {
        this._target = target;
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement)!;
      } else {
        let targetElement: HTMLElement = target as HTMLElement;
        this._target = target;
        this._targetWindow = getWindow(targetElement)!;
      }
    } else {
      this._targetWindow = getWindow()!;
    }
  }

  private _setHeightOffsetEveryFrame(): void {
    if (this._calloutElement && this.props.finalHeight) {
      this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
        const calloutMainElem = this._calloutElement.lastChild as HTMLElement;
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
}
