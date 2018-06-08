// Utilities
import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef, IRectangle, KeyCodes, shallowCompare } from '../../Utilities';
import { DefaultPalette } from '../../Styling';
import { IPositionedData, RectangleEdge, getOppositeEdge } from 'office-ui-fabric-react/lib/utilities/positioning';

// Component Dependencies
import { PositioningContainer, IPositioningContainer } from './PositioningContainer/index';
import { Beak, BEAK_HEIGHT, BEAK_WIDTH } from './Beak/Beak';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import { FocusZone } from '../../FocusZone';

// Coachmark
import { ICoachmarkTypes } from './Coachmark.types';
import {
  COACHMARK_HEIGHT,
  COACHMARK_WIDTH,
  getStyles,
  ICoachmarkStyles,
  ICoachmarkStyleProps
} from './Coachmark.styles';

const getClassNames = classNamesFunction<ICoachmarkStyleProps, ICoachmarkStyles>();

export const COACHMARK_ATTRIBUTE_NAME = 'data-coachmarkid';

/**
 * An interface for the cached dimensions of entity inner host.
 */
export interface IEntityRect {
  width: number;
  height: number;
}

export interface ICoachmarkState {
  /**
   * Is the Coachmark currently collapsed into
   * a tear drop shape
   */
  isCollapsed: boolean;

  /**
   * Enables/Disables the beacon that radiates
   * from the center of the coachmark.
   */
  isBeaconAnimating: boolean;

  /**
   * Is the teaching bubble currently retreiving the
   * original dimensions of the hosted entity.
   */
  isMeasuring: boolean;

  /**
   * Cached width and height of _entityInnerHostElement
   */
  entityInnerHostRect: IEntityRect;

  /**
   * Is the mouse in proximity of the default target element
   */
  isMouseInProximity: boolean;

  /**
   * The left position of the beak
   */
  beakLeft?: string;

  /**
   * The right position of the beak
   */
  beakTop?: string;

  /**
   * The right position of the beak
   */
  beakRight?: string;

  /**
   * The bottom position of the beak
   */
  beakBottom?: string;

  /**
   * Alignment edge of callout in relation to target
   */
  targetAlignment?: RectangleEdge;

  /**
   * Position of Coachmark/TeachingBubble in relation to target
   */
  targetPosition?: RectangleEdge;

  /**
   * Transform origin of teaching bubble callout
   */
  transformOrigin?: string;
}

export class Coachmark extends BaseComponent<ICoachmarkTypes, ICoachmarkState> {
  public static defaultProps: Partial<ICoachmarkTypes> = {
    isCollapsed: true,
    mouseProximityOffset: 10,
    delayBeforeMouseOpen: 3600, // The approximate time the coachmark shows up
    color: DefaultPalette.themePrimary,
    isPositionForced: true,
    positioningContainerProps: {
      directionalHint: DirectionalHint.bottomAutoEdge
    }
  };

  /**
   * The cached HTMLElement reference to the Entity Inner Host
   * element.
   */
  private _entityInnerHostElement = createRef<HTMLDivElement>();
  private _translateAnimationContainer = createRef<HTMLDivElement>();
  private _ariaAlertContainer = createRef<HTMLDivElement>();
  private _positioningContainer = createRef<IPositioningContainer>();

  /**
   * The target element the mouse would be in
   * proximity to
   */
  private _targetElementRect: ClientRect;

  constructor(props: ICoachmarkTypes) {
    super(props);

    // Set defaults for state
    this.state = {
      isCollapsed: props.isCollapsed!,
      isBeaconAnimating: true,
      isMeasuring: true,
      entityInnerHostRect: {
        width: 0,
        height: 0
      },
      isMouseInProximity: false
    };
  }

  private get _beakDirection(): RectangleEdge {
    const { targetPosition } = this.state;
    if (targetPosition === undefined) {
      return RectangleEdge.bottom;
    }

    return getOppositeEdge(targetPosition);
  }

  public render(): JSX.Element {
    const {
      children,
      target,
      color,
      positioningContainerProps,
      ariaDescribedBy,
      ariaDescribedByText,
      ariaLabelledBy,
      ariaLabelledByText
    } = this.props;

    const {
      beakLeft,
      beakTop,
      beakRight,
      beakBottom,
      isCollapsed,
      isBeaconAnimating,
      isMeasuring,
      entityInnerHostRect,
      transformOrigin
    } = this.state;

    const classNames = getClassNames(getStyles, {
      isCollapsed: isCollapsed,
      isBeaconAnimating: isBeaconAnimating,
      isMeasuring: isMeasuring,
      entityHostHeight: `${entityInnerHostRect.height}px`,
      entityHostWidth: `${entityInnerHostRect.width}px`,
      width: `${COACHMARK_WIDTH}px`,
      height: `${COACHMARK_HEIGHT}px`,
      color: color,
      transformOrigin: transformOrigin
    });

    const finalHeight: number = isCollapsed ? COACHMARK_HEIGHT : entityInnerHostRect.height;

    return (
      <PositioningContainer
        target={target}
        offsetFromTarget={BEAK_HEIGHT}
        componentRef={this._positioningContainer}
        finalHeight={finalHeight}
        onPositioned={this._onPositioned}
        bounds={this._getBounds()}
        {...positioningContainerProps}
      >
        <div className={classNames.root}>
          <div
            className={classNames.ariaContainer}
            aria-live="assertive"
            ref={this._ariaAlertContainer}
            aria-hidden={!isCollapsed}
          />
          <div className={classNames.pulsingBeacon} />
          <div className={classNames.translateAnimationContainer} ref={this._translateAnimationContainer}>
            <div className={classNames.scaleAnimationLayer}>
              <div className={classNames.rotateAnimationLayer}>
                {this._positioningContainer.current && (
                  <Beak
                    left={beakLeft}
                    top={beakTop}
                    right={beakRight}
                    bottom={beakBottom}
                    direction={this._beakDirection}
                    color={color}
                  />
                )}
                <FocusZone>
                  <div
                    className={classNames.entityHost}
                    tabIndex={-1}
                    data-is-focusable={true}
                    onClick={this._onFocusHandler}
                    role="dialog"
                    aria-labelledby={ariaLabelledBy}
                    aria-describedby={ariaDescribedBy}
                  >
                    {isCollapsed && (
                      <h1 id={ariaLabelledBy} className={classNames.ariaContainer}>
                        {ariaLabelledByText}
                      </h1>
                    )}
                    {isCollapsed && (
                      <p id={ariaDescribedBy} className={classNames.ariaContainer}>
                        {ariaDescribedByText}
                      </p>
                    )}
                    <div
                      className={classNames.entityInnerHost}
                      ref={this._entityInnerHostElement}
                      aria-hidden={isCollapsed}
                    >
                      {children}
                    </div>
                  </div>
                </FocusZone>
              </div>
            </div>
          </div>
        </div>
      </PositioningContainer>
    );
  }

  public componentWillReceiveProps(newProps: ICoachmarkTypes): void {
    if (this.props.isCollapsed && !newProps.isCollapsed) {
      // The coachmark is about to open
      this._openCoachmark();
    }
  }

  public shouldComponentUpdate(newProps: ICoachmarkTypes, newState: ICoachmarkState): boolean {
    return !shallowCompare(newProps, this.props) || !shallowCompare(newState, this.state);
  }

  public componentDidUpdate(prevProps: ICoachmarkTypes, prevState: ICoachmarkState): void {
    if (
      prevState.targetAlignment !== this.state.targetAlignment ||
      prevState.targetPosition !== this.state.targetPosition
    ) {
      this._setBeakPosition();
    }
  }

  public componentDidMount(): void {
    this._async.requestAnimationFrame(
      (): void => {
        if (
          this._entityInnerHostElement.current &&
          this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width === 0
        ) {
          this.setState({
            isMeasuring: false,
            entityInnerHostRect: {
              width: this._entityInnerHostElement.current.offsetWidth,
              height: this._entityInnerHostElement.current.offsetHeight
            }
          });
          this._setBeakPosition();
          this.forceUpdate();
        }

        document.addEventListener('keydown', this._onKeyDown, true);

        // We dont want to the user to immediatley trigger the coachmark when it's opened
        this._async.setTimeout(() => {
          this._addProximityHandler(this.props.mouseProximityOffset);
        }, this.props.delayBeforeMouseOpen!);

        // SetTimeout is hacky solution.  ARIA text doesn't read aloud unless it is appended or changed after the component
        // is mounted
        if (this.props.ariaAlertText) {
          this._async.setTimeout(() => {
            if (this._ariaAlertContainer.current && this.props.ariaAlertText) {
              this._ariaAlertContainer.current.innerText = this.props.ariaAlertText;
            }
          }, 2000);
        }
      }
    );
  }

  public componentWillUnmount(): void {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  private _onKeyDown = (e: KeyboardEvent): void => {
    // Open coachmark if user presses ALT + C (arbitrary keypress for now, will change later)
    if (e.altKey && e.which === KeyCodes.c) {
      this._onFocusHandler();
    }
  };

  private _onFocusHandler = (): void => {
    if (this.state.isCollapsed) {
      this._openCoachmark();
    }
  };

  private _onPositioned = (positionData: IPositionedData): void => {
    this._async.requestAnimationFrame(
      (): void => {
        this.setState({
          targetAlignment: positionData.alignmentEdge,
          targetPosition: positionData.targetEdge
        });
      }
    );
  };

  private _getBounds(): IRectangle | undefined {
    const { isPositionForced, positioningContainerProps } = this.props;
    if (isPositionForced) {
      // If directionalHint direction is the top or bottom auto edge, then we want to set the left/right bounds
      // to the window x-axis to have auto positioning work correctly.
      if (
        positioningContainerProps &&
        (positioningContainerProps.directionalHint === DirectionalHint.topAutoEdge ||
          positioningContainerProps.directionalHint === DirectionalHint.bottomAutoEdge)
      ) {
        return {
          left: 0,
          top: -Infinity,
          bottom: Infinity,
          right: window.innerWidth,
          width: window.innerWidth,
          height: Infinity
        };
      } else {
        return {
          left: -Infinity,
          top: -Infinity,
          bottom: Infinity,
          right: Infinity,
          width: Infinity,
          height: Infinity
        };
      }
    } else {
      return undefined;
    }
  }

  private _setBeakPosition = (): void => {
    let beakLeft;
    let beakTop;
    let beakRight;
    let beakBottom;
    let transformOriginX;
    let transformOriginY;

    const { targetAlignment } = this.state;
    const distanceAdjustment = '3px'; // Adjustment distance for Beak to shift towards Coachmark bubble.

    switch (this._beakDirection) {
      // If Beak is pointing Up or Down
      case RectangleEdge.top:
      case RectangleEdge.bottom:
        // If there is no target alignment, then beak is X-axis centered in callout
        if (!targetAlignment) {
          beakLeft = `calc(50% - ${BEAK_WIDTH / 2}px)`;
          transformOriginX = 'center';
        } else {
          // Beak is aligned to the left of target
          if (targetAlignment === RectangleEdge.left) {
            beakLeft = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
            transformOriginX = 'left';
          } else {
            // Beak is aligned to the right of target
            beakRight = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
            transformOriginX = 'right';
          }
        }

        if (this._beakDirection === RectangleEdge.top) {
          beakTop = distanceAdjustment;
          transformOriginY = 'top';
        } else {
          beakBottom = distanceAdjustment;
          transformOriginY = 'bottom';
        }
        break;
      // If Beak is pointing Left or Right
      case RectangleEdge.left:
      case RectangleEdge.right:
        // If there is no target alignment, then beak is Y-axis centered in callout
        if (!targetAlignment) {
          beakTop = `calc(50% - ${BEAK_WIDTH / 2}px)`;
          transformOriginY = `center`;
        } else {
          // Beak is aligned to the top of target
          if (targetAlignment === RectangleEdge.top) {
            beakTop = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
            transformOriginY = `top`;
          } else {
            // Beak is aligned to the bottom of target
            beakBottom = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
            transformOriginY = `bottom`;
          }
        }

        if (this._beakDirection === RectangleEdge.left) {
          beakLeft = distanceAdjustment;
          transformOriginX = 'left';
        } else {
          beakRight = distanceAdjustment;
          transformOriginX = 'right';
        }
        break;
    }

    this.setState({
      beakLeft: beakLeft,
      beakRight: beakRight,
      beakBottom: beakBottom,
      beakTop: beakTop,
      transformOrigin: `${transformOriginX} ${transformOriginY}`
    });
  };

  private _openCoachmark = (): void => {
    this.setState({
      isCollapsed: false
    });

    if (this.props.onAnimationOpenStart) {
      this.props.onAnimationOpenStart();
    }

    this._entityInnerHostElement.current &&
      this._entityInnerHostElement.current.addEventListener(
        'transitionend',
        (): void => {
          // Need setTimeout to trigger narrator
          this._async.setTimeout(() => {
            if (this.props.teachingBubbleRef && this.props.teachingBubbleRef.current) {
              this.props.teachingBubbleRef.current.focus();
            }
          }, 500);

          if (this.props.onAnimationOpenEnd) {
            this.props.onAnimationOpenEnd();
          }
        }
      );
  };

  private _addProximityHandler(mouseProximityOffset: number = 0): void {
    /**
     * An array of cached ids returned when setTimeout runs during
     * the window resize event trigger.
     */
    const timeoutIds: number[] = [];

    // Take the initial measure out of the initial render to prevent
    // an unnecessary render.
    this._async.setTimeout(() => {
      this._setTargetElementRect();

      // When the window resizes we want to async
      // get the bounding client rectangle.
      // Every time the event is triggered we want to
      // setTimeout and then clear any previous instances
      // of setTimeout.
      this._events.on(
        window,
        'resize',
        (): void => {
          timeoutIds.forEach(
            (value: number): void => {
              clearInterval(value);
            }
          );

          timeoutIds.push(
            this._async.setTimeout((): void => {
              this._setTargetElementRect();
            }, 100)
          );
        }
      );
    }, 10);

    // Every time the document's mouse move is triggered
    // we want to check if inside of an element and
    // set the state with the result.
    this._events.on(document, 'mousemove', (e: MouseEvent) => {
      if (this.state.isCollapsed) {
        const mouseY = e.pageY;
        const mouseX = e.pageX;
        this._setTargetElementRect();
        const isMouseInProximity = this._isInsideElement(mouseX, mouseY, mouseProximityOffset);

        if (isMouseInProximity !== this.state.isMouseInProximity) {
          this._openCoachmark();
        }
      }

      if (this.props.onMouseMove) {
        this.props.onMouseMove(e);
      }
    });
  }

  private _setTargetElementRect(): void {
    if (this._translateAnimationContainer && this._translateAnimationContainer.current) {
      this._targetElementRect = this._translateAnimationContainer!.current!.getBoundingClientRect();
    }
  }

  private _isInsideElement(mouseX: number, mouseY: number, mouseProximityOffset: number = 0): boolean {
    return (
      mouseX > this._targetElementRect.left - mouseProximityOffset &&
      mouseX < this._targetElementRect.left + this._targetElementRect.width + mouseProximityOffset &&
      mouseY > this._targetElementRect.top - mouseProximityOffset &&
      mouseY < this._targetElementRect.top + this._targetElementRect.height + mouseProximityOffset
    );
  }
}
