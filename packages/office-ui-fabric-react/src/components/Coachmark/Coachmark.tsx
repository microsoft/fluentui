// Utilities
import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef } from '../../Utilities';
import { DefaultPalette } from '../../Styling';

// Component Dependencies
import { PositioningContainer, IPositioningContainer } from './PositioningContainer/index';
import { Beak } from './Beak/Beak';

// Coachmark
import { ICoachmarkTypes } from './Coachmark.types';
import { getStyles, ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';
import { FocusZone } from '../../FocusZone';

const getClassNames = classNamesFunction<ICoachmarkStyleProps, ICoachmarkStyles>();

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
  beakLeft?: string | null;

  /**
   * The right position of the beak
   */
  beakTop?: string | null;
}

export class Coachmark extends BaseComponent<ICoachmarkTypes, ICoachmarkState> {
  public static defaultProps: Partial<ICoachmarkTypes> = {
    collapsed: true,
    mouseProximityOffset: 100,
    beakWidth: 26,
    beakHeight: 12,
    delayBeforeMouseOpen: 3600, // The approximate time the coachmark shows up
    width: 36,
    height: 36,
    color: DefaultPalette.themePrimary
  };

  /**
   * The cached HTMLElement reference to the Entity Inner Host
   * element.
   */
  private _entityInnerHostElement = createRef<HTMLDivElement>();
  private _translateAnimationContainer = createRef<HTMLDivElement>();
  private _positioningContainer = createRef<IPositioningContainer>();

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

  public render(): JSX.Element {
    const {
      children,
      beakWidth,
      beakHeight,
      target,
      width,
      height,
      color
    } = this.props;

    const classNames = getClassNames(getStyles, {
      collapsed: this.state.collapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: this.state.entityInnerHostRect.height + 'px',
      entityHostWidth: this.state.entityInnerHostRect.width + 'px',
      width: width + 'px',
      height: height + 'px',
      color: color
    });

    return (
      <PositioningContainer
        target={ target }
        offsetFromTarget={ beakHeight }
        componentRef={ this._positioningContainer }
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
                    width={ beakWidth }
                    height={ beakHeight }
                    left={ this.state.beakLeft }
                    top={ this.state.beakTop }
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

        // @TODO Eventually we need to add the various directions
        const beakLeft = (this.props.width! / 2) - (this.props.beakWidth! / 2);
        const beakTop = 0;

        this.setState({
          isMeasuring: false,
          entityInnerHostRect: {
            width: this._entityInnerHostElement.current.offsetWidth,
            height: this._entityInnerHostElement.current.offsetHeight
          },
          beakLeft: beakLeft + 'px',
          beakTop: beakTop + 'px'
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
          collapsed: !isMouseInProximity
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