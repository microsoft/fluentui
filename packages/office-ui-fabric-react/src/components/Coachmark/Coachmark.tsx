// Utilities
import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef } from '../../Utilities';
import { DefaultPalette } from '../../Styling';

import {
  IPositionedData,
  RectangleEdge
} from 'office-ui-fabric-react/lib/utilities/positioning';

// Component Dependencies
import { PositioningContainer, IPositioningContainer } from './PositioningContainer/index';
import { Beak, BEAK_HEIGHT, BEAK_WIDTH } from './Beak/Beak';
import { BeakDirection } from './Beak/Beak.types';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';

// Coachmark
import { ICoachmarkTypes } from './Coachmark.types';
import { COACHMARK_HEIGHT, COACHMARK_WIDTH, getStyles, ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';
import { FocusZone } from '../../FocusZone';

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
  collapsed: boolean;

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
   * Transform origin of teaching bubble callout
   */
  transformOrigin?: string;
}

export class Coachmark extends BaseComponent<ICoachmarkTypes, ICoachmarkState> {
  public static defaultProps: Partial<ICoachmarkTypes> = {
    collapsed: true,
    mouseProximityOffset: 100,
    delayBeforeMouseOpen: 3600, // The approximate time the coachmark shows up
    color: DefaultPalette.themePrimary,
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
  private _positioningContainer = createRef<IPositioningContainer>();
  private _targetAlignment: RectangleEdge | undefined;

  constructor(props: ICoachmarkTypes) {
    super(props);

    // Set defaults for state
    this.state = {
      collapsed: props.collapsed!,
      isBeaconAnimating: true,
      isMeasuring: true,
      entityInnerHostRect: {
        width: 0,
        height: 0
      },
      isMouseInProximity: false
    };
  }

  private get _beakDirection(): BeakDirection {
    const { positioningContainerProps } = this.props;
    if (!positioningContainerProps || positioningContainerProps!.directionalHint === undefined) {
      return BeakDirection.Top;
    }

    switch (positioningContainerProps.directionalHint) {
      case DirectionalHint.topLeftEdge:
      case DirectionalHint.topCenter:
      case DirectionalHint.topRightEdge:
      case DirectionalHint.topAutoEdge:
        return BeakDirection.Bottom;
      case DirectionalHint.leftTopEdge:
      case DirectionalHint.leftCenter:
      case DirectionalHint.leftBottomEdge:
        return BeakDirection.Right;
      case DirectionalHint.rightTopEdge:
      case DirectionalHint.rightCenter:
      case DirectionalHint.rightBottomEdge:
        return BeakDirection.Left;
      case DirectionalHint.bottomLeftEdge:
      case DirectionalHint.bottomCenter:
      case DirectionalHint.bottomRightEdge:
      case DirectionalHint.bottomAutoEdge:
      default:
        return BeakDirection.Top;
    }
  }

  public render(): JSX.Element {
    const {
      children,
      target,
      color,
      positioningContainerProps
    } = this.props;

    const { beakLeft, beakTop, beakRight, beakBottom } = this.state;

    const classNames = getClassNames(getStyles, {
      collapsed: this.state.collapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: this.state.entityInnerHostRect.height + 'px',
      entityHostWidth: this.state.entityInnerHostRect.width + 'px',
      width: COACHMARK_WIDTH + 'px',
      height: COACHMARK_HEIGHT + 'px',
      color: color,
      transformOrigin: this.state.transformOrigin
    });

    const finalHeight = (this._entityInnerHostElement && this._entityInnerHostElement.current) ?
      this._entityInnerHostElement.current.offsetHeight :
      0;

    return (
      <PositioningContainer
        target={ target }
        offsetFromTarget={ BEAK_HEIGHT }
        componentRef={ this._positioningContainer }
        doNotLayer={ true }
        finalHeight={ finalHeight }
        onPositioned={ this._onPositioned }
        { ...positioningContainerProps }
      >
        <div className={ classNames.root }>
          <div className={ classNames.pulsingBeacon } />
          <div
            className={ classNames.translateAnimationContainer }
            ref={ this._translateAnimationContainer }
          >
            <div className={ classNames.scaleAnimationLayer }>
              <div className={ classNames.rotateAnimationLayer }>
                {
                  this._positioningContainer.current && <Beak
                    left={ beakLeft }
                    top={ beakTop }
                    right={ beakRight }
                    bottom={ beakBottom }
                    direction={ this._beakDirection }
                  />
                }
                <FocusZone>
                  <div
                    className={ classNames.entityHost }
                    data-is-focusable={ true }
                    onFocus={ this._onFocusHandler }
                  >
                    <div
                      className={ classNames.entityInnerHost }
                      ref={ this._entityInnerHostElement }
                    >
                      { children }
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
    if (this.props.collapsed && !newProps.collapsed) {
      // The coachmark is about to open
      this._openCoachmark();
    }
  }

  public componentDidMount(): void {
    this._async.requestAnimationFrame(((): void => {
      if (this._entityInnerHostElement.current && (this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width) === 0) {
        let beakLeft;
        let beakTop;
        let beakRight;
        let beakBottom;
        let transformOriginX;
        let transformOriginY;

        const distanceAdjustment = '3px';

        switch (this._beakDirection) {
          // If Beak is pointing Up or Down
          case BeakDirection.Top:
          case BeakDirection.Bottom:
            // If there is no target alignment, then beak is X-axis centered in callout
            if (!this._targetAlignment) {
              beakLeft = `calc(50% - ${BEAK_WIDTH / 2}px)`
              transformOriginX = 'center';
            } else {
              // Beak is aligned to the left of target
              if (this._targetAlignment === RectangleEdge.left) {
                beakLeft = `calc(${COACHMARK_WIDTH / 2}px - ${BEAK_WIDTH / 2}px)`;
                transformOriginX = 'left';
              }
              // Beak is aligned to the right of target
              else {
                beakRight = `calc(${COACHMARK_WIDTH / 2}px - ${BEAK_WIDTH / 2}px)`;
                transformOriginX = 'right';
              }
            }

            if (this._beakDirection === BeakDirection.Top) {
              beakTop = distanceAdjustment;
              transformOriginY = 'top';
            } else {
              beakBottom = distanceAdjustment;
              transformOriginY = 'bottom';
            }
            break;
          // If Beak is pointing Left or Right
          case BeakDirection.Left:
          case BeakDirection.Right:
            // If there is no target alignment, then beak is Y-axis centered in callout
            if (!this._targetAlignment) {
              beakTop = `calc(50% - ${BEAK_WIDTH / 2}px)`
              transformOriginY = `center`;
            } else {
              // Beak is aligned to the top of target
              if (this._targetAlignment === RectangleEdge.top) {
                beakTop = `calc(${COACHMARK_WIDTH / 2}px - ${BEAK_WIDTH / 2}px)`;
                transformOriginY = `top`;
              }
              // Beak is aligned to the bottom of target
              else {
                beakBottom = `calc(${COACHMARK_WIDTH / 2}px - ${BEAK_WIDTH / 2}px)`;
                transformOriginY = `bottom`;
              }
            }

            if (this._beakDirection === BeakDirection.Left) {
              beakLeft = distanceAdjustment;
              transformOriginX = 'left';
            } else {
              beakRight = distanceAdjustment;
              transformOriginX = 'right';
            }
            break;
        }

        this.setState({
          isMeasuring: false,
          entityInnerHostRect: {
            width: this._entityInnerHostElement.current.offsetWidth,
            height: this._entityInnerHostElement.current.offsetHeight
          },
          beakLeft: beakLeft,
          beakRight: beakRight,
          beakBottom: beakBottom,
          beakTop: beakTop,
          transformOrigin: `${transformOriginX} ${transformOriginY}`
        });

        this.forceUpdate();
      }

      // We dont want to the user to immediatley trigger the coachmark when it's opened
      this._async.setTimeout(() => {
        this._addProximityHandler(100);
      }, this.props.delayBeforeMouseOpen!);
    }));
  }

  private _onFocusHandler = (): void => {
    this._openCoachmark();
  }

  private _onPositioned = (positionData: IPositionedData): void => {
    this._targetAlignment = positionData.alignmentEdge;
  }

  private _openCoachmark = (): void => {
    this.setState({
      collapsed: false
    });

    this._translateAnimationContainer.current && this._translateAnimationContainer.current.addEventListener('animationstart', (): void => {
      if (this.props.onAnimationOpenStart) {
        this.props.onAnimationOpenStart();
      }
    });

    this._translateAnimationContainer.current && this._translateAnimationContainer.current.addEventListener('animationend', (): void => {
      if (this.props.onAnimationOpenEnd) {
        this.props.onAnimationOpenEnd();
      }
    });
  }

  private _addProximityHandler(mouseProximityOffset: number = 0): void {
    /**
     * An array of cached ids returned when setTimeout runs during
     * the window resize event trigger.
     */
    const timeoutIds: number[] = [];

    /**
     * The target element the mouse would be in
     * proximity to
     */
    let targetElementRect: ClientRect;

    // Take the initial measure out of the initial render to prevent
    // an unnecessary render.
    this._async.setTimeout(() => {
      if (this._entityInnerHostElement.current) {
        targetElementRect = this._entityInnerHostElement.current.getBoundingClientRect();
      }

      // When the window resizes we want to async
      // get the bounding client rectangle.
      // Every time the event is triggered we want to
      // setTimeout and then clear any previous instances
      // of setTimeout.
      this._events.on(window, 'resize', (): void => {
        timeoutIds.forEach((value: number): void => {
          clearInterval(value);
        });

        timeoutIds.push(this._async.setTimeout((): void => {
          if (this._entityInnerHostElement.current) {
            targetElementRect = this._entityInnerHostElement.current.getBoundingClientRect();
          }
        }, 100));
      });
    }, 10);

    // Every time the document's mouse move is triggered
    // we want to check if inside of an element and
    // set the state with the result.
    this._events.on(document, 'mousemove', (e: MouseEvent) => {
      const mouseY = e.pageY;
      const mouseX = e.pageX;
      const isMouseInProximity = this._isInsideElement(mouseX, mouseY, targetElementRect, mouseProximityOffset);

      if (isMouseInProximity !== this.state.isMouseInProximity) {
        // We don't want to update the isMouseInProximtiy state because
        // The coachmark only opens and does not collapse.
        // Setting isMouseInProximity here will cause the coachmark to open and close
        this.setState({
          // collapsed: !isMouseInProximity
        });
      }

      if (this.props.onMouseMove) {
        this.props.onMouseMove(e);
      }
    });
  }

  private _isInsideElement(mouseX: number, mouseY: number, elementRect: ClientRect, mouseProximityOffset: number = 0): boolean {
    return mouseX > (elementRect.left - mouseProximityOffset) &&
      mouseX < ((elementRect.left + elementRect.width) + mouseProximityOffset) &&
      mouseY > (elementRect.top - mouseProximityOffset) &&
      mouseY < ((elementRect.top + elementRect.height) + mouseProximityOffset);
  }
}