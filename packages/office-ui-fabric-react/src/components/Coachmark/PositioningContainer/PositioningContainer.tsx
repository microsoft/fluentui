import * as React from 'react';
import { IPositioningContainerProps } from './PositioningContainer.types';
import { getClassNames } from './PositioningContainer.styles';
import { Layer } from '../../../Layer';

// Utilites/Helpers
import { DirectionalHint } from '../../../common/DirectionalHint';
import {
  BaseComponent,
  IPoint,
  IRectangle,
  assign,
  css,
  elementContains,
  focusFirstChild,
  getWindow,
  getDocument
} from '../../../Utilities';

import { getMaxHeight, positionElement, IPositionedData, IPositionProps, IPosition, RectangleEdge } from '../../../utilities/positioning';

import { AnimationClassNames, mergeStyles } from '../../../Styling';

const OFF_SCREEN_STYLE = { opacity: 0 };

// In order for some of the max height logic to work
// properly we need to set the border.
// The value is abitrary.
const BORDER_WIDTH = 1;
const SLIDE_ANIMATIONS: { [key: number]: string } = {
  [RectangleEdge.top]: 'slideUpIn20',
  [RectangleEdge.bottom]: 'slideDownIn20',
  [RectangleEdge.left]: 'slideLeftIn20',
  [RectangleEdge.right]: 'slideRightIn20'
};

export interface IPositioningContainerState {
  /**
   * Current set of calcualted positions for the outermost parent container.
   */
  positions?: IPositionedData;

  /**
   * Tracks the current height offset and updates during
   * the height animation when props.finalHeight is specified.
   */
  heightOffset?: number;
}

export class PositioningContainer extends BaseComponent<IPositioningContainerProps, IPositioningContainerState>
  implements PositioningContainer {
  public static defaultProps: IPositioningContainerProps = {
    preventDismissOnScroll: false,
    offsetFromTarget: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint.bottomAutoEdge
  };

  private _didSetInitialFocus: boolean;

  /**
   * The primary positioned div.
   */
  private _positionedHost = React.createRef<HTMLDivElement>();

  // @TODO rename to reflect the name of this class
  private _contentHost = React.createRef<HTMLDivElement>();

  /**
   * Stores an instance of Window, used to check
   * for server side rendering and if focus was lost.
   */
  private _targetWindow: Window;

  /**
   * The bounds used when determing if and where the
   * PositioningContainer should be placed.
   */
  private _positioningBounds: IRectangle;

  /**
   * The maximum height the PositioningContainer can grow to
   * without going being the window or target bounds
   */
  private _maxHeight: number | undefined;
  private _positionAttempts: number;
  private _target: HTMLElement | MouseEvent | IPoint | null;
  private _setHeightOffsetTimer: number;

  constructor(props: IPositioningContainerProps) {
    super(props);
    this._didSetInitialFocus = false;
    this.state = {
      positions: undefined,
      heightOffset: 0
    };
    this._positionAttempts = 0;
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillMount(): void {
    this._setTargetWindowAndElement(this._getTarget());
  }

  public componentDidMount(): void {
    this._onComponentDidMount();
  }

  public componentDidUpdate(): void {
    this._setInitialFocus();
    this._updateAsyncPosition();
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillUpdate(newProps: IPositioningContainerProps): void {
    // If the target element changed, find the new one. If we are tracking
    // target with class name, always find element because we do not know if
    // fabric has rendered a new element and disposed the old element.
    const newTarget = this._getTarget(newProps);
    const oldTarget = this._getTarget();
    if (newTarget !== oldTarget || typeof newTarget === 'string' || newTarget instanceof String) {
      this._maxHeight = undefined;
      this._setTargetWindowAndElement(newTarget!);
    }

    if (newProps.offsetFromTarget !== this.props.offsetFromTarget) {
      this._maxHeight = undefined;
    }

    if (newProps.finalHeight !== this.props.finalHeight) {
      this._setHeightOffsetEveryFrame();
    }
  }

  public render(): JSX.Element | null {
    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!this._targetWindow) {
      return null;
    }

    const { className, positioningContainerWidth, positioningContainerMaxHeight, children } = this.props;
    const { positions } = this.state;

    const styles = getClassNames();

    const directionalClassName =
      positions && positions.targetEdge ? (AnimationClassNames as any)[SLIDE_ANIMATIONS[positions.targetEdge]] : '';

    const getContentMaxHeight: number = this._getMaxHeight() + this.state.heightOffset!;
    const contentMaxHeight: number =
      positioningContainerMaxHeight! && positioningContainerMaxHeight! > getContentMaxHeight
        ? getContentMaxHeight
        : positioningContainerMaxHeight!;
    const content = (
      <div ref={this._positionedHost} className={css('ms-PositioningContainer', styles.container)}>
        <div
          className={mergeStyles(
            'ms-PositioningContainer-layerHost',
            styles.root,
            className,
            directionalClassName,
            !!positioningContainerWidth && { width: positioningContainerWidth }
          )}
          // tslint:disable-next-line:jsx-ban-props
          style={positions ? positions.elementPosition : OFF_SCREEN_STYLE}
          tabIndex={-1} // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          ref={this._contentHost}
        >
          {children}
          {
            // @TODO apply to the content container
            contentMaxHeight
          }
        </div>
      </div>
    );

    return this.props.doNotLayer ? content : <Layer>{content}</Layer>;
  }

  /**
   * Deprecated, use `onResize` instead.
   * @deprecated Use `onResize` instead.
   */
  public dismiss = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    this.onResize(ev);
  };

  public onResize = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss(ev);
    } else {
      this._updateAsyncPosition();
    }
  };

  protected _dismissOnScroll(ev: Event): void {
    const { preventDismissOnScroll } = this.props;
    if (this.state.positions && !preventDismissOnScroll) {
      this._dismissOnLostFocus(ev);
    }
  }

  protected _dismissOnLostFocus(ev: Event): void {
    const target = ev.target as HTMLElement;
    const clickedOutsideCallout = this._positionedHost.current && !elementContains(this._positionedHost.current, target);

    if (
      (!this._target && clickedOutsideCallout) ||
      (ev.target !== this._targetWindow &&
        clickedOutsideCallout &&
        ((this._target as MouseEvent).stopPropagation ||
          (!this._target || (target !== this._target && !elementContains(this._target as HTMLElement, target)))))
    ) {
      this.onResize(ev);
    }
  }

  protected _setInitialFocus = (): void => {
    if (this._contentHost.current && this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
      this._didSetInitialFocus = true;
      focusFirstChild(this._contentHost.current);
    }
  };

  protected _onComponentDidMount = (): void => {
    // This is added so the positioningContainer will dismiss when the window is scrolled
    // but not when something inside the positioningContainer is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the positioningContainer.
    this._async.setTimeout(() => {
      this._events.on(this._targetWindow, 'scroll', this._async.throttle(this._dismissOnScroll, 10), true);
      this._events.on(this._targetWindow, 'resize', this._async.throttle(this.onResize, 10), true);
      this._events.on(this._targetWindow.document.body, 'focus', this._dismissOnLostFocus, true);
      this._events.on(this._targetWindow.document.body, 'click', this._dismissOnLostFocus, true);
    }, 0);

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updateAsyncPosition();
    this._setHeightOffsetEveryFrame();
  };

  private _updateAsyncPosition(): void {
    this._async.requestAnimationFrame(() => this._updatePosition());
  }

  private _updatePosition(): void {
    const { positions } = this.state;
    const { offsetFromTarget, onPositioned } = this.props;

    const hostElement = this._positionedHost.current;
    const positioningContainerElement = this._contentHost.current;

    if (hostElement && positioningContainerElement) {
      let currentProps: IPositionProps | undefined;
      currentProps = assign(currentProps, this.props);
      currentProps!.bounds = this._getBounds();
      currentProps!.target = this._target!;
      if (document.body.contains(currentProps!.target as Node)) {
        currentProps!.gapSpace = offsetFromTarget;
        const newPositions: IPositionedData = positionElement(currentProps!, hostElement, positioningContainerElement);
        // Set the new position only when the positions are not exists or one of the new positioningContainer positions are different.
        // The position should not change if the position is within 2 decimal places.
        if (
          (!positions && newPositions) ||
          (positions && newPositions && !this._arePositionsEqual(positions, newPositions) && this._positionAttempts < 5)
        ) {
          // We should not reposition the positioningContainer more than a few times, if it is then the content is likely resizing
          // and we should stop trying to reposition to prevent a stack overflow.
          this._positionAttempts++;
          this.setState(
            {
              positions: newPositions
            },
            () => {
              if (onPositioned) {
                onPositioned(newPositions);
              }
            }
          );
        } else {
          this._positionAttempts = 0;
          if (onPositioned) {
            onPositioned(newPositions);
          }
        }
      } else if (positions !== undefined) {
        this.setState({
          positions: undefined
        });
      }
    }
  }

  private _getBounds(): IRectangle {
    if (!this._positioningBounds) {
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
      this._positioningBounds = currentBounds;
    }
    return this._positioningBounds;
  }

  /**
   * Return the maximum height the container can grow to
   * without going out of the specified bounds
   */
  private _getMaxHeight(): number {
    const { directionalHintFixed, offsetFromTarget, directionalHint } = this.props;

    if (!this._maxHeight) {
      if (directionalHintFixed && this._target) {
        const gapSpace = offsetFromTarget ? offsetFromTarget : 0;
        this._maxHeight = getMaxHeight(this._target, directionalHint!, gapSpace, this._getBounds());
      } else {
        this._maxHeight = this._getBounds().height! - BORDER_WIDTH * 2;
      }
    }
    return this._maxHeight!;
  }

  private _arePositionsEqual(positions: IPositionedData, newPosition: IPositionedData): boolean {
    return this._comparePositions(positions.elementPosition, newPosition.elementPosition);
  }

  private _comparePositions(oldPositions: IPosition, newPositions: IPosition): boolean {
    for (const key in newPositions) {
      // This needs to be checked here and below because there is a linting error if for in does not immediately have an if statement
      if (newPositions.hasOwnProperty(key)) {
        const oldPositionEdge = oldPositions[key];
        const newPositionEdge = newPositions[key];

        if (oldPositionEdge && newPositionEdge) {
          if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private _setTargetWindowAndElement(target: HTMLElement | string | MouseEvent | IPoint | null): void {
    const currentElement = this._positionedHost.current;

    if (target) {
      if (typeof target === 'string') {
        const currentDoc: Document = getDocument()!;
        this._target = currentDoc ? (currentDoc.querySelector(target) as HTMLElement) : null;
        this._targetWindow = getWindow(currentElement)!;
      } else if ((target as MouseEvent).stopPropagation) {
        this._targetWindow = getWindow((target as MouseEvent).toElement as HTMLElement)!;
        this._target = target;
      } else if ((target as IPoint).x !== undefined && (target as IPoint).y !== undefined) {
        this._targetWindow = getWindow(currentElement)!;
        this._target = target;
      } else {
        const targetElement: HTMLElement = target as HTMLElement;
        this._targetWindow = getWindow(targetElement)!;
        this._target = target;
      }
    } else {
      this._targetWindow = getWindow(currentElement)!;
    }
  }

  /**
   * Animates the height if finalHeight was given.
   */
  private _setHeightOffsetEveryFrame(): void {
    if (this._contentHost && this.props.finalHeight) {
      this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
        if (!this._contentHost.current) {
          return;
        }

        const positioningContainerMainElem = this._contentHost.current.lastChild as HTMLElement;
        const cardScrollHeight: number = positioningContainerMainElem.scrollHeight;
        const cardCurrHeight: number = positioningContainerMainElem.offsetHeight;
        const scrollDiff: number = cardScrollHeight - cardCurrHeight;

        this.setState({
          heightOffset: this.state.heightOffset! + scrollDiff
        });

        if (positioningContainerMainElem.offsetHeight < this.props.finalHeight!) {
          this._setHeightOffsetEveryFrame();
        } else {
          this._async.cancelAnimationFrame(this._setHeightOffsetTimer);
        }
      });
    }
  }

  private _getTarget(props: IPositioningContainerProps = this.props): HTMLElement | string | MouseEvent | IPoint | null {
    const { target } = props;
    return target!;
  }
}
