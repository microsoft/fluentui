import * as React from 'react';
import { IPositioningContainerProps } from './PositioningContainer.types';
import { getClassNames } from './PositioningContainer.styles';
import { Layer } from '../../../Layer';

// Utilites/Helpers
import { DirectionalHint } from '../../../common/DirectionalHint';
import {
  Point,
  IRectangle,
  assign,
  css,
  elementContains,
  focusFirstChild,
  getWindow,
  getDocument,
  initializeComponentRef,
  Async,
  EventGroup,
  getPropsWithDefaults,
} from '../../../Utilities';

import {
  getMaxHeight,
  positionElement,
  IPositionedData,
  IPositionProps,
  IPosition,
  RectangleEdge,
} from 'office-ui-fabric-react/lib/utilities/positioning';

import { AnimationClassNames, mergeStyles } from '../../../Styling';

const OFF_SCREEN_STYLE = { opacity: 0 };

// In order for some of the max height logic to work
// properly we need to set the border.
// The value is abitrary.
const BORDER_WIDTH = 1;
const SLIDE_ANIMATIONS = {
  [RectangleEdge.top]: 'slideUpIn20',
  [RectangleEdge.bottom]: 'slideDownIn20',
  [RectangleEdge.left]: 'slideLeftIn20',
  [RectangleEdge.right]: 'slideRightIn20',
} as const;

export interface IPositioningContainerState {
  /**
   * Tracks the current height offset and updates during
   * the height animation when props.finalHeight is specified.
   */
  heightOffset?: number;
}

const DEFAULT_PROPS = {
  preventDismissOnScroll: false,
  offsetFromTarget: 0,
  minPagePadding: 8,
  directionalHint: DirectionalHint.bottomAutoEdge,
};

function useCachedBounds(props: IPositioningContainerProps, targetWindowRef: React.RefObject<Window>) {
  /**
   * The bounds used when determing if and where the
   * PositioningContainer should be placed.
   */
  const positioningBounds = React.useRef<IRectangle>();

  const getBounds = (): IRectangle => {
    if (!positioningBounds.current) {
      let currentBounds = props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + props.minPagePadding!,
          left: 0 + props.minPagePadding!,
          right: (targetWindowRef.current?.innerWidth ?? 0) - props.minPagePadding!,
          bottom: (targetWindowRef.current?.innerHeight ?? 0) - props.minPagePadding!,
          width: (targetWindowRef.current?.innerWidth ?? 0) - props.minPagePadding! * 2,
          height: (targetWindowRef.current?.innerHeight ?? 0) - props.minPagePadding! * 2,
        };
      }
      positioningBounds.current = currentBounds;
    }
    return positioningBounds.current!;
  };

  return getBounds;
}

function usePositions(
  props: IPositioningContainerProps,
  positioningContainerElement: React.RefObject<HTMLDivElement>,
  positionedHost: React.RefObject<HTMLDivElement>,
  target: React.RefObject<HTMLElement | MouseEvent | Point | null>,
  getBounds: () => IRectangle,
) {
  /**
   * Current set of calcualted positions for the outermost parent container.
   */
  const [positions, setPositions] = React.useState<IPositionedData | undefined>();
  const postitionAttempts = React.useRef<number>(0);

  const updatePosition = (): void => {
    const hostElement = positionedHost.current;

    if (hostElement && positioningContainerElement.current) {
      let currentProps: IPositionProps | undefined;
      currentProps = assign(currentProps, props);
      currentProps!.bounds = getBounds();
      currentProps!.target = target.current ?? undefined;
      if (document.body.contains(currentProps!.target as Node)) {
        currentProps!.gapSpace = props.offsetFromTarget;
        const newPositions: IPositionedData = positionElement(
          currentProps!,
          hostElement,
          positioningContainerElement.current!,
        );
        // Set the new position only when the positions are not exists or one of the new positioningContainer positions
        // are different. The position should not change if the position is within 2 decimal places.
        if (
          (!positions && newPositions) ||
          (positions && newPositions && !arePositionsEqual(positions, newPositions) && postitionAttempts.current < 5)
        ) {
          // We should not reposition the positioningContainer more than a few times, if it is then the content is
          // likely resizing and we should stop trying to reposition to prevent a stack overflow.
          postitionAttempts.current++;
          setPositions(newPositions);
          props.onPositioned?.(newPositions);
        } else {
          postitionAttempts.current = 0;
          props.onPositioned?.(newPositions);
        }
      } else if (positions !== undefined) {
        setPositions(undefined);
      }
    }
  };

  return [positions, updatePosition] as const;
}

function useTargets(props: IPositioningContainerProps, positionedHost: React.RefObject<HTMLDivElement>) {
  /**
   * Stores an instance of Window, used to check
   * for server side rendering and if focus was lost.
   */
  const targetWindowRef = React.useRef<Window | null>(null);
  const targetRef = React.useRef<HTMLElement | MouseEvent | Point | null>(null);

  // If the target element changed, find the new one. If we are tracking
  // target with class name, always find element because we do not know if
  // fabric has rendered a new element and disposed the old element.
  React.useEffect((): void => {
    const currentElement = positionedHost.current;
    const { target } = props;

    if (target && typeof target !== 'string') {
      if (!!(target as MouseEvent).stopPropagation) {
        targetWindowRef.current = getWindow((target as MouseEvent).target as HTMLElement)!;
        targetRef.current = target;
      } else if (
        // tslint:disable-next-line:deprecation
        ((target as Point).left !== undefined || (target as Point).x !== undefined) &&
        // tslint:disable-next-line:deprecation
        ((target as Point).top !== undefined || (target as Point).y !== undefined)
      ) {
        targetWindowRef.current = getWindow(currentElement)!;
        targetRef.current = target;
      } else {
        const targetElement: HTMLElement = target as HTMLElement;
        targetWindowRef.current = getWindow(targetElement)!;
        targetRef.current = target;
      }
    } else if (!!target) {
      targetWindowRef.current = getWindow(currentElement)!;
    }
  }, [props.target]);

  React.useEffect((): void => {
    const currentElement = positionedHost.current;
    const { target } = props;

    if (target && typeof target === 'string') {
      const currentDoc: Document = getDocument()!;
      targetRef.current = currentDoc ? (currentDoc.querySelector(target) as HTMLElement) : null;
      targetWindowRef.current = getWindow(currentElement)!;
    }
  }, []);

  return [targetRef, targetWindowRef] as const;
}

export const PositioningContainer = React.forwardRef(
  (propsWithoutDefaults: IPositioningContainerProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    // @TODO rename to reflect the name of this class
    const contentHost = React.useRef<HTMLDivElement>(null);
    const positioningContainer = React.useRef<HTMLDivElement>(null);
    /**
     * The primary positioned div.
     */
    const positionedHost = React.useRef<HTMLDivElement>(null);
    const [targetRef, targetWindowRef] = useTargets(props, positionedHost);

    const getBounds = useCachedBounds(props, targetWindowRef);
    const [positions, updatePosition] = usePositions(props, positioningContainer, positionedHost, targetRef, getBounds);

    return (
      <PositioningContainerClass
        {...props}
        contentHost={contentHost}
        positionedHost={positionedHost}
        targetRef={targetRef}
        targetWindow={targetWindowRef}
        positions={positions}
        updatePosition={updatePosition}
        getBounds={getBounds}
      />
    );
  },
);
PositioningContainer.displayName = 'PositioningContainer';

interface IPositioningContainerClassProps extends IPositioningContainerProps {
  contentHost: React.RefObject<HTMLDivElement>;
  positionedHost: React.RefObject<HTMLDivElement>;
  targetRef: React.MutableRefObject<HTMLElement | MouseEvent | Point | null>;
  targetWindow: React.MutableRefObject<Window | null>;
  positions: IPositionedData | undefined;
  updatePosition: () => void;
  getBounds: () => IRectangle;
}

class PositioningContainerClass extends React.Component<IPositioningContainerClassProps, IPositioningContainerState>
  implements PositioningContainerClass {
  private _didSetInitialFocus: boolean;

  /**
   * The maximum height the PositioningContainer can grow to
   * without going being the window or target bounds
   */
  private _maxHeight: number | undefined;
  private _setHeightOffsetTimer: number;
  private _async: Async;
  private _events: EventGroup;

  constructor(props: IPositioningContainerClassProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);

    this._didSetInitialFocus = false;
    this.state = {
      heightOffset: 0,
    };
  }

  public componentDidMount(): void {
    this._onComponentDidMount();
  }

  public componentDidUpdate(): void {
    this._setInitialFocus();
    this._updateAsyncPosition();
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillUpdate(newProps: IPositioningContainerClassProps): void {
    if (newProps.offsetFromTarget !== this.props.offsetFromTarget) {
      this._maxHeight = undefined;
    }

    if (newProps.finalHeight !== this.props.finalHeight) {
      this._setHeightOffsetEveryFrame();
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  public render(): JSX.Element | null {
    // If there is no target window then we are likely in server side rendering and we should not render anything.
    if (!this.props.targetWindow.current) {
      return null;
    }

    const { className, positioningContainerWidth, positioningContainerMaxHeight, children, positions } = this.props;

    const styles = getClassNames();

    const directionalClassName =
      positions && positions.targetEdge ? AnimationClassNames[SLIDE_ANIMATIONS[positions.targetEdge]] : '';

    const getContentMaxHeight: number = this._getMaxHeight() + this.state.heightOffset!;
    const contentMaxHeight: number =
      positioningContainerMaxHeight! && positioningContainerMaxHeight! > getContentMaxHeight
        ? getContentMaxHeight
        : positioningContainerMaxHeight!;
    const content = (
      <div ref={this.props.positionedHost} className={css('ms-PositioningContainer', styles.container)}>
        <div
          className={mergeStyles(
            'ms-PositioningContainer-layerHost',
            styles.root,
            className,
            directionalClassName,
            !!positioningContainerWidth && { width: positioningContainerWidth },
          )}
          // tslint:disable-next-line:jsx-ban-props
          style={positions ? positions.elementPosition : OFF_SCREEN_STYLE}
          // Safari and Firefox on Mac OS requires this to back-stop click events so focus remains in the Callout.
          // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
          tabIndex={-1}
          ref={this.props.contentHost}
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
    if (this.props.positions && !preventDismissOnScroll) {
      this._dismissOnLostFocus(ev);
    }
  }

  protected _dismissOnLostFocus(ev: Event): void {
    const target = ev.target as HTMLElement;
    const clickedOutsideCallout =
      this.props.positionedHost.current && !elementContains(this.props.positionedHost.current, target);

    if (
      (!this.props.targetRef.current && clickedOutsideCallout) ||
      (ev.target !== this.props.targetWindow.current &&
        clickedOutsideCallout &&
        ((this.props.targetRef.current as MouseEvent).stopPropagation ||
          !this.props.targetRef.current ||
          (target !== this.props.targetRef.current &&
            !elementContains(this.props.targetRef.current as HTMLElement, target))))
    ) {
      this.onResize(ev);
    }
  }

  protected _setInitialFocus = (): void => {
    if (
      this.props.contentHost.current &&
      this.props.setInitialFocus &&
      !this._didSetInitialFocus &&
      this.props.positions
    ) {
      this._didSetInitialFocus = true;
      focusFirstChild(this.props.contentHost.current);
    }
  };

  protected _onComponentDidMount = (): void => {
    // This is added so the positioningContainer will dismiss when the window is scrolled
    // but not when something inside the positioningContainer is scrolled. The delay seems
    // to be required to avoid React firing an async focus event in IE from
    // the target changing focus quickly prior to rendering the positioningContainer.
    this._async.setTimeout(() => {
      this._events.on(this.props.targetWindow.current, 'scroll', this._async.throttle(this._dismissOnScroll, 10), true);
      this._events.on(this.props.targetWindow.current, 'resize', this._async.throttle(this.onResize, 10), true);
      this._events.on(this.props.targetWindow.current?.document?.body, 'focus', this._dismissOnLostFocus, true);
      this._events.on(this.props.targetWindow.current?.document?.body, 'click', this._dismissOnLostFocus, true);
    }, 0);

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updateAsyncPosition();
    this._setHeightOffsetEveryFrame();
  };

  private _updateAsyncPosition(): void {
    this._async.requestAnimationFrame(() => this.props.updatePosition());
  }

  /**
   * Return the maximum height the container can grow to
   * without going out of the specified bounds
   */
  private _getMaxHeight(): number {
    const { directionalHintFixed, offsetFromTarget, directionalHint } = this.props;

    if (!this._maxHeight) {
      if (directionalHintFixed && this.props.targetRef.current) {
        const gapSpace = offsetFromTarget ? offsetFromTarget : 0;
        this._maxHeight = getMaxHeight(
          this.props.targetRef.current,
          directionalHint!,
          gapSpace,
          this.props.getBounds(),
        );
      } else {
        this._maxHeight = this.props.getBounds().height! - BORDER_WIDTH * 2;
      }
    }
    return this._maxHeight!;
  }

  /**
   * Animates the height if finalHeight was given.
   */
  private _setHeightOffsetEveryFrame(): void {
    if (this.props.contentHost && this.props.finalHeight) {
      this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
        if (!this.props.contentHost.current) {
          return;
        }

        const positioningContainerMainElem = this.props.contentHost.current.lastChild as HTMLElement;
        const cardScrollHeight: number = positioningContainerMainElem.scrollHeight;
        const cardCurrHeight: number = positioningContainerMainElem.offsetHeight;
        const scrollDiff: number = cardScrollHeight - cardCurrHeight;

        this.setState({
          heightOffset: this.state.heightOffset! + scrollDiff,
        });

        if (positioningContainerMainElem.offsetHeight < this.props.finalHeight!) {
          this._setHeightOffsetEveryFrame();
        } else {
          this._async.cancelAnimationFrame(this._setHeightOffsetTimer);
        }
      });
    }
  }
}

function comparePositions(oldPositions: IPosition, newPositions: IPosition): boolean {
  for (const key in newPositions) {
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

function arePositionsEqual(positions: IPositionedData, newPosition: IPositionedData): boolean {
  return comparePositions(positions.elementPosition, newPosition.elementPosition);
}
