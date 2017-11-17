// Utilities
import * as React from 'react';
import { autobind, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

// Component Dependencies
import { DynamicallyPositionedContainer } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer';

// Coachmark
import { ICoachmarkProps } from './Coachmark.Props';
import { getStyles } from './Coachmark.Styles';

/**
 * An interface for the cached dimensions of entity inner host.
 */
export interface IEntityRect {
  width: number,
  height: number
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
}

export class Coachmark extends BaseComponent<ICoachmarkProps, ICoachmarkState> {

  /**
   * The cached HTMLElement reference to the Entity Inner Host
   * element.
   */
  private _entityInnerHostElement: HTMLElement;

  public static defaultProps: Partial<ICoachmarkProps> = {
    isCollapsed: true,
    mouseProximityOffset: 100
  };

  constructor(props: ICoachmarkProps) {
    super();

    // Set defaults for state
    this.state = {
      isCollapsed: props.isCollapsed!,
      isBeaconAnimating: true,
      isMeasuring: true,
      entityInnerHostRect: {
        width: 0,
        height: 0
      },
      isMouseInProximity: true
    };

    // Remove the measurement from the initial paint
    this._async.setTimeout(() => {
      this.setState({
        entityInnerHostRect: this._entityInnerHostElement.getBoundingClientRect()
      });
    }, 10);

    this._isElementInProximity(this._entityInnerHostElement);
  }

  public render() {
    let {
      children
    } = this.props;

    // Retrieve classnames
    const classNames = getStyles({
      isCollapsed: this.state.isCollapsed,
      isBeaconAnimating: this.state.isBeaconAnimating,
      isMeasuring: this.state.isMeasuring,
      entityHostHeight: (this.state.entityInnerHostRect.width) ? this.state.entityInnerHostRect.height + 'px' : undefined,
      entityHostWidth: (this.state.entityInnerHostRect.width) ? this.state.entityInnerHostRect.height + 'px' : undefined
    });

    const entityHostStyles = {
      height: this.state.entityInnerHostRect.height,
      width: this.state.entityInnerHostRect.width
    };

    return (
      <DynamicallyPositionedContainer
        target={ this.props.positioningTarget }>
        <div
          className={ classNames.root }
          onClick={ this._onCLickHandler }
        >
          <div className={ classNames.pulsingBeacon }></div>
          <div className={ classNames.translateAnimationContainer }>
            <div className={ classNames.scaleAnimationLayer }>
              <div className={ classNames.rotateAnimationLayer }>
                <div
                  className={ classNames.entityHost }
                  ref={ this._resolveRef('_entityHost') }
                  style={ entityHostStyles }
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
      </DynamicallyPositionedContainer>
    );
  }
  public componentDidMount() {
    if (this.state.isMeasuring) {
      this._async.setTimeout(() => {
        if ((this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width) === 0) {
          this.setState({
            isMeasuring: false,
            entityInnerHostRect: {
              width: this._entityInnerHostElement.offsetWidth,
              height: this._entityInnerHostElement.offsetHeight
            }
          });
        }
      }, 100);
    }
  }


  @autobind
  private _onCLickHandler() {

    // @TODO remove this as it's an example
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });

    if (this.props.onClickHandler) {
      this.props.onClickHandler();
    }
  }

  private _isElementInProximity(targetElement: HTMLElement, mouseProximityOffset: number = 0) {
    /**
     * An array of cached ids returned when setTimeout runs during
     * the window resize event trigger.
     */
    let timeoutIds: number[] = [];

    /**
     * The target element the mouse would be in
     * proximity to
     */
    let targetElementRect: ClientRect;

    // When the window resizes we want to async
    // get the bounding client rectangle.
    // Every time the event is triggered we wan't to
    // setTimeout and then clear any previous instances
    // of setTimeout.
    this._events.on(window, 'resize', () => {
      timeoutIds.forEach((value) => {
        clearInterval(value)
      });

      timeoutIds.push(this._async.setTimeout(() => {
        targetElementRect = targetElement.getBoundingClientRect();
      }, 100));
    });

    // Everytime the document's mouse move is triggered
    // we want to check if inside of an element and
    // set the state with the result.
    this._events.on(document, 'mousemove', (e: MouseEvent) => {
      let mouseY = e.pageY;
      let mouseX = e.pageX;

      // We try to set state every time because we assume
      //
      this.setState({
        isMouseInProximity: this._isInsideElement(targetElementRect, mouseX, mouseY)
      });
    });
  }

  private _isInsideElement(elementRect: ClientRect, mouseX: number, mouseY: number, mouseProximityOffset: number = 0): boolean {
    return mouseX > (elementRect.left - mouseProximityOffset) && mouseX < ((elementRect.left + elementRect.width) + mouseProximityOffset) &&
      mouseY > (elementRect.top - mouseProximityOffset) && mouseY < ((elementRect.top + elementRect.height) + mouseProximityOffset);
  }
};