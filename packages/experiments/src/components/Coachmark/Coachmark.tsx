// Utilities
import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';

// Component Dependencies
import { PositioningContainer } from '../PositioningContainer/PositioningContainer';

// Coachmark
import { ICoachmarkProps } from './Coachmark.types';
import { getStyles, ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';

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
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {
  public static defaultProps: Partial<ICoachmarkProps> = {
    collapsed: true,
    mouseProximityOffset: 100
  };

  /**
   * The cached HTMLElement reference to the Entity Inner Host
   * element.
   */
  private _entityInnerHostElement: HTMLElement;
  private _translateAnimationContainer: HTMLElement;

  constructor(props: ICoachmarkProps) {
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
      isMouseInProximity: true
    };
  }

  public render(): JSX.Element {
    let {
      children
    } = this.props;

    const classNames = getClassNames(getStyles, {
      collapsed: this.state.collapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: this.state.entityInnerHostRect.height + 'px',
      entityHostWidth: this.state.entityInnerHostRect.width + 'px'
    });

    return (
      <PositioningContainer
        target={ this.props.target }
      >
        <div
          className={ classNames.root }
        >
          <div className={ classNames.pulsingBeacon } />
          <div
            className={ classNames.translateAnimationContainer }
            ref={ this._resolveRef('_translateAnimationContainer') }
          >
            <div
              className={ classNames.scaleAnimationLayer }
              ref={ this._resolveRef('_scaleAnimationContainer') }
            >
              <div
                className={ classNames.rotateAnimationLayer }
                ref={ this._resolveRef('_rotateAnimationContainer') }
              >
                <div
                  className={ classNames.entityHost }
                  ref={ this._resolveRef('_entityHost') }
                >
                  <div
                    className={ classNames.entityInnerHost }
                    ref={ this._resolveRef('_entityInnerHostElement') }
                  >
                    { children }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PositioningContainer>
    );
  }

  public componentWillReceiveProps(newProps: ICoachmarkProps): void {
    if (this.props.collapsed && !newProps.collapsed) {
      // The coachmark is about to open
      this._openCoachmark();
    }
  }

  public componentDidMount(): void {
    // If we have already accessed the width and height
    // We do not wan't to do it again.
    if (this.state.isMeasuring) {
      this._async.setTimeout((): void => {
        if ((this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width) === 0) {
          this.setState({
            isMeasuring: false,
            entityInnerHostRect: {
              width: this._entityInnerHostElement.offsetWidth,
              height: this._entityInnerHostElement.offsetHeight
            }
          });

          this.forceUpdate();
        }

        // Initialize element in proximity now that initial
        // measurements have been taken
        this._isElementInProximity(this._entityInnerHostElement);
      }, 10);
    }
  }

  private _openCoachmark(): void {
    this.setState({
      collapsed: false
    });

    this._translateAnimationContainer.addEventListener('animationstart', (): void => {
      if (this.props.onAnimationOpenStart) {
        this.props.onAnimationOpenStart();
      }
    });

    this._translateAnimationContainer.addEventListener('animationend', (): void => {
      if (this.props.onAnimationOpenEnd) {
        this.props.onAnimationOpenEnd();
      }
    });
  }

  private _isElementInProximity(targetElement: HTMLElement, mouseProximityOffset: number = 0): void {
    /**
     * An array of cached ids returned when setTimeout runs during
     * the window resize event trigger.
     */
    let timeoutIds: number[] = [];

    /**
     * The target element the mouse would be in
     * proximity to
     */
    let targetElementRect: ClientRect = targetElement.getBoundingClientRect();

    // When the window resizes we want to async
    // get the bounding client rectangle.
    // Every time the event is triggered we wan't to
    // setTimeout and then clear any previous instances
    // of setTimeout.
    this._events.on(window, 'resize', (): void => {
      timeoutIds.forEach((value: number): void => {
        clearInterval(value);
      });

      timeoutIds.push(this._async.setTimeout((): void => {
        targetElementRect = targetElement.getBoundingClientRect();
      }, 100));
    });

    // Everytime the document's mouse move is triggered
    // we want to check if inside of an element and
    // set the state with the result.
    this._events.on(document, 'mousemove', (e: MouseEvent) => {
      let mouseY = e.pageY;
      let mouseX = e.pageX;
      let isMouseInProximity = this._isInsideElement(targetElementRect, mouseX, mouseY);

      if (isMouseInProximity !== this.state.isMouseInProximity) {
        this.setState({
          isMouseInProximity: isMouseInProximity
        });
      }
    });
  }

  private _isInsideElement(elementRect: ClientRect, mouseX: number, mouseY: number, mouseProximityOffset: number = 0): boolean {
    return mouseX > (elementRect.left - mouseProximityOffset) && mouseX < ((elementRect.left + elementRect.width) + mouseProximityOffset) &&
      mouseY > (elementRect.top - mouseProximityOffset) && mouseY < ((elementRect.top + elementRect.height) + mouseProximityOffset);
  }
}