// Utilities
import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  elementContains,
  focusFirstChild,
  getDocument,
  IRectangle,
  KeyCodes,
  shallowCompare
} from '../../Utilities';
import { DefaultPalette } from '../../Styling';
import { IPositionedData, RectangleEdge, getOppositeEdge } from '../../utilities/positioning';

// Component Dependencies
import { PositioningContainer, IPositioningContainer } from './PositioningContainer/index';
import { Beak, BEAK_HEIGHT, BEAK_WIDTH } from './Beak/Beak';
import { DirectionalHint } from '../../common/DirectionalHint';

// Coachmark
import { ICoachmark, ICoachmarkProps, ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.types';
import { COACHMARK_HEIGHT, COACHMARK_WIDTH } from './Coachmark.styles';
import { FocusTrapZone } from '../../FocusTrapZone';

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
   * Is the Coachmark done measuring the hosted entity
   */
  isMeasured: boolean;

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

  /**
   * ARIA alert text to read aloud with Narrator once the Coachmark is mounted
   */
  alertText?: string;
}

export class CoachmarkBase extends BaseComponent<ICoachmarkProps, ICoachmarkState> implements ICoachmark {
  public static defaultProps: Partial<ICoachmarkProps> = {
    isCollapsed: true,
    mouseProximityOffset: 10,
    delayBeforeMouseOpen: 3600, // The approximate time the coachmark shows up
    delayBeforeCoachmarkAnimation: 0,
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
  private _entityHost = React.createRef<HTMLDivElement>();
  private _entityInnerHostElement = React.createRef<HTMLDivElement>();
  private _translateAnimationContainer = React.createRef<HTMLDivElement>();
  private _ariaAlertContainer = React.createRef<HTMLDivElement>();
  private _childrenContainer = React.createRef<HTMLDivElement>();
  private _positioningContainer = React.createRef<IPositioningContainer>();

  /**
   * The target element the mouse would be in
   * proximity to
   */
  private _targetElementRect: ClientRect;

  constructor(props: ICoachmarkProps) {
    super(props);

    this._warnDeprecations({
      teachingBubbleRef: undefined,
      collapsed: 'isCollapsed',
      beakWidth: undefined,
      beakHeight: undefined,
      width: undefined,
      height: undefined
    });

    // Set defaults for state
    this.state = {
      isCollapsed: props.isCollapsed!,
      isBeaconAnimating: true,
      isMeasuring: true,
      entityInnerHostRect: {
        width: 0,
        height: 0
      },
      isMouseInProximity: false,
      isMeasured: false
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
      ariaLabelledByText,
      ariaAlertText,
      delayBeforeCoachmarkAnimation,
      styles,
      theme,
      className
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
      transformOrigin,
      alertText,
      isMeasured
    } = this.state;

    const classNames = getClassNames(styles, {
      theme,
      className,
      isCollapsed,
      isBeaconAnimating,
      isMeasuring,
      color,
      transformOrigin,
      isMeasured,
      entityHostHeight: `${entityInnerHostRect.height}px`,
      entityHostWidth: `${entityInnerHostRect.width}px`,
      width: `${COACHMARK_WIDTH}px`,
      height: `${COACHMARK_HEIGHT}px`,
      delayBeforeCoachmarkAnimation: `${delayBeforeCoachmarkAnimation}ms`
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
          {ariaAlertText && (
            <div className={classNames.ariaContainer} role="alert" ref={this._ariaAlertContainer} aria-hidden={!isCollapsed}>
              {alertText}
            </div>
          )}
          <div className={classNames.pulsingBeacon} />
          <div className={classNames.translateAnimationContainer} ref={this._translateAnimationContainer}>
            <div className={classNames.scaleAnimationLayer}>
              <div className={classNames.rotateAnimationLayer}>
                {this._positioningContainer.current && isCollapsed && (
                  <Beak left={beakLeft} top={beakTop} right={beakRight} bottom={beakBottom} direction={this._beakDirection} color={color} />
                )}
                <div
                  className={classNames.entityHost}
                  ref={this._entityHost}
                  tabIndex={-1}
                  data-is-focusable={true}
                  role="dialog"
                  aria-labelledby={ariaLabelledBy}
                  aria-describedby={ariaDescribedBy}
                >
                  {isCollapsed && [
                    ariaLabelledBy && (
                      <p id={ariaLabelledBy} key={0} className={classNames.ariaContainer}>
                        {ariaLabelledByText}
                      </p>
                    ),
                    ariaDescribedBy && (
                      <p id={ariaDescribedBy} key={1} className={classNames.ariaContainer}>
                        {ariaDescribedByText}
                      </p>
                    )
                  ]}
                  <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                    <div className={classNames.entityInnerHost} ref={this._entityInnerHostElement}>
                      <div className={classNames.childrenContainer} ref={this._childrenContainer} aria-hidden={isCollapsed}>
                        {children}
                      </div>
                    </div>
                  </FocusTrapZone>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PositioningContainer>
    );
  }

  public componentWillReceiveProps(newProps: ICoachmarkProps): void {
    if (this.props.isCollapsed && !newProps.isCollapsed) {
      // The coachmark is about to open
      this._openCoachmark();
    }
  }

  public shouldComponentUpdate(newProps: ICoachmarkProps, newState: ICoachmarkState): boolean {
    return !shallowCompare(newProps, this.props) || !shallowCompare(newState, this.state);
  }

  public componentDidUpdate(prevProps: ICoachmarkProps, prevState: ICoachmarkState): void {
    if (prevState.targetAlignment !== this.state.targetAlignment || prevState.targetPosition !== this.state.targetPosition) {
      this._setBeakPosition();
    }
    if (prevProps.preventDismissOnLostFocus !== this.props.preventDismissOnLostFocus) {
      this._addListeners();
    }
  }

  public componentDidMount(): void {
    this._async.requestAnimationFrame(
      (): void => {
        if (this._entityInnerHostElement.current && this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width === 0) {
          this.setState({
            isMeasuring: false,
            entityInnerHostRect: {
              width: this._entityInnerHostElement.current.offsetWidth,
              height: this._entityInnerHostElement.current.offsetHeight
            },
            isMeasured: true
          });
          this._setBeakPosition();
          this.forceUpdate();
        }

        this._addListeners();

        // We don't want to the user to immediately trigger the Coachmark when it's opened
        this._async.setTimeout(() => {
          this._addProximityHandler(this.props.mouseProximityOffset);
        }, this.props.delayBeforeMouseOpen!);

        // Need to add setTimeout to have narrator read change in alert container
        if (this.props.ariaAlertText) {
          this._async.setTimeout(() => {
            if (this.props.ariaAlertText && this._ariaAlertContainer.current) {
              this.setState({
                alertText: this.props.ariaAlertText
              });
            }
          }, 0);
        }

        if (!this.props.preventFocusOnMount) {
          this._async.setTimeout(() => {
            if (this._entityHost.current) {
              this._entityHost.current.focus();
            }
          }, 1000);
        }
      }
    );
  }

  public dismiss = (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss(ev);
    }
  };

  private _addListeners(): void {
    const { preventDismissOnLostFocus } = this.props;
    const currentDoc: Document = getDocument()!;

    this._events.off();

    if (currentDoc) {
      this._events.on(currentDoc, 'keydown', this._onKeyDown, true);

      if (!preventDismissOnLostFocus) {
        this._events.on(currentDoc, 'click', this._dismissOnLostFocus, true);
        this._events.on(currentDoc, 'focus', this._dismissOnLostFocus, true);
      }
    }
  }

  private _dismissOnLostFocus(ev: Event) {
    const clickTarget = ev.target as HTMLElement;
    const clickedOutsideCallout =
      this._translateAnimationContainer.current && !elementContains(this._translateAnimationContainer.current, clickTarget);
    const { target } = this.props;

    if (clickedOutsideCallout && clickTarget !== target && !elementContains(target as HTMLElement, clickTarget)) {
      this.dismiss(ev);
    }
  }

  private _onKeyDown = (e: any): void => {
    // Open coachmark if user presses ALT + C (arbitrary keypress for now)
    if (
      (e.altKey && e.which === KeyCodes.c) ||
      (e.which === KeyCodes.enter &&
        this._translateAnimationContainer.current &&
        this._translateAnimationContainer.current.contains(e.target))
    ) {
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
            if (this._entityInnerHostElement.current) {
              focusFirstChild(this._entityInnerHostElement.current);
            }
          }, 1000);

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
        const mouseY = e.clientY;
        const mouseX = e.clientX;
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
