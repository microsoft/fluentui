// Utilities
import * as React from 'react';
import {
  classNamesFunction,
  elementContains,
  focusFirstChild,
  getDocument,
  IRectangle,
  KeyCodes,
  getRTL,
  warnDeprecations,
  EventGroup,
} from '../../Utilities';
import { IPositionedData, RectangleEdge, getOppositeEdge } from 'office-ui-fabric-react/lib/utilities/positioning';

// Component Dependencies
import { PositioningContainer } from './PositioningContainer/index';
import { Beak, BEAK_HEIGHT, BEAK_WIDTH } from './Beak/Beak';
import { DirectionalHint } from '../../common/DirectionalHint';

// Coachmark
import { ICoachmarkProps, ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.types';
import { COACHMARK_HEIGHT, COACHMARK_WIDTH } from './Coachmark.styles';
import { FocusTrapZone } from '../../FocusTrapZone';
import { getPropsWithDefaults } from '../../Utilities';
import { useAsync, useOnEvent } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<ICoachmarkStyleProps, ICoachmarkStyles>();

export const COACHMARK_ATTRIBUTE_NAME = 'data-coachmarkid';

/**
 * An interface for the cached dimensions of entity inner host.
 */
export interface IEntityRect {
  width: number;
  height: number;
}

const DEFAULT_PROPS = {
  isCollapsed: true,
  mouseProximityOffset: 10,
  delayBeforeMouseOpen: 3600, // The approximate time the coachmark shows up
  delayBeforeCoachmarkAnimation: 0,
  isPositionForced: true,
  positioningContainerProps: {
    directionalHint: DirectionalHint.bottomAutoEdge,
  },
};

function useCollapsedState(props: ICoachmarkProps, entityInnerHostElementRef: React.RefObject<HTMLDivElement>) {
  /**
   * Is the Coachmark currently collapsed into
   * a tear drop shape
   */
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(!!props.isCollapsed);
  const async = useAsync();

  // Rather than pushing out logic elsewhere to prevent openCoachmark from being called repeatedly,
  // we'll track it here and only invoke the logic once. We do this with a ref, rather than just the state,
  // because the openCoachmark callback can be captured in scope for an effect
  const hasCoachmarkBeenOpened = React.useRef(!isCollapsed);

  const openCoachmark = () => {
    if (!hasCoachmarkBeenOpened.current) {
      setIsCollapsed(false);

      props.onAnimationOpenStart?.();

      entityInnerHostElementRef.current?.addEventListener?.('transitionend', (): void => {
        // Need setTimeout to trigger narrator
        async.setTimeout(() => {
          if (entityInnerHostElementRef.current) {
            focusFirstChild(entityInnerHostElementRef.current);
          }
        }, 1000);

        props.onAnimationOpenEnd?.();
      });
      hasCoachmarkBeenOpened.current = true;
    }
  };

  React.useEffect(() => {
    if (!props.isCollapsed) {
      openCoachmark();
    }
  }, [props.isCollapsed]);

  return [isCollapsed, openCoachmark] as const;
}

function usePositionedData() {
  const async = useAsync();

  /**
   * Alignment edge of callout in relation to target
   */
  const [targetAlignment, setTargetAlignment] = React.useState<RectangleEdge | undefined>();
  /**
   * Position of Coachmark/TeachingBubble in relation to target
   */
  const [targetPosition, setTargetPosition] = React.useState<RectangleEdge | undefined>();

  const onPositioned = ({ alignmentEdge, targetEdge }: IPositionedData) =>
    async.requestAnimationFrame(() => {
      setTargetAlignment(alignmentEdge);
      setTargetPosition(targetEdge);
    });

  return [targetAlignment, targetPosition, onPositioned] as const;
}

function useBeakPosition(
  props: ICoachmarkProps,
  targetAlignment: RectangleEdge | undefined,
  targetPosition: RectangleEdge | undefined,
) {
  const beakDirection = targetPosition === undefined ? RectangleEdge.bottom : getOppositeEdge(targetPosition);

  /**
   * The left position of the beak
   */
  const [beakLeft, setBeakLeft] = React.useState<string>();

  /**
   * The right position of the beak
   */
  const [beakTop, setBeakTop] = React.useState<string>();

  /**
   * The right position of the beak
   */
  const [beakRight, setBeakRight] = React.useState<string>();

  /**
   * The bottom position of the beak
   */
  const [beakBottom, setBeakBottom] = React.useState<string>();

  /**
   * Transform origin of teaching bubble callout
   */
  const [transformOrigin, setTransformOrigin] = React.useState<string>();

  React.useEffect(() => {
    let transformOriginX;
    let transformOriginY;

    const distanceAdjustment = '3px'; // Adjustment distance for Beak to shift towards Coachmark bubble.

    switch (beakDirection) {
      // If Beak is pointing Up or Down
      case RectangleEdge.top:
      case RectangleEdge.bottom:
        // If there is no target alignment, then beak is X-axis centered in callout
        if (!targetAlignment) {
          setBeakLeft(`calc(50% - ${BEAK_WIDTH / 2}px)`);
          transformOriginX = 'center';
        } else {
          // Beak is aligned to the left of target
          if (targetAlignment === RectangleEdge.left) {
            setBeakLeft(`${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`);
            transformOriginX = 'left';
          } else {
            // Beak is aligned to the right of target
            setBeakRight(`${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`);
            transformOriginX = 'right';
          }
        }

        if (beakDirection === RectangleEdge.top) {
          setBeakTop(distanceAdjustment);
          transformOriginY = 'top';
        } else {
          setBeakBottom(distanceAdjustment);
          transformOriginY = 'bottom';
        }
        break;
      // If Beak is pointing Left or Right
      case RectangleEdge.left:
      case RectangleEdge.right:
        // If there is no target alignment, then beak is Y-axis centered in callout
        if (!targetAlignment) {
          setBeakTop(`calc(50% - ${BEAK_WIDTH / 2}px)`);
          transformOriginY = `center`;
        } else {
          // Beak is aligned to the top of target
          if (targetAlignment === RectangleEdge.top) {
            setBeakTop(`${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`);
            transformOriginY = `top`;
          } else {
            // Beak is aligned to the bottom of target
            setBeakBottom(`${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`);
            transformOriginY = `bottom`;
          }
        }

        if (beakDirection === RectangleEdge.left) {
          if (getRTL(props.theme)) {
            setBeakRight(distanceAdjustment);
          } else {
            setBeakLeft(distanceAdjustment);
          }
          transformOriginX = 'left';
        } else {
          if (getRTL(props.theme)) {
            setBeakLeft(distanceAdjustment);
          } else {
            setBeakRight(distanceAdjustment);
          }
          transformOriginX = 'right';
        }
        break;
    }

    setTransformOrigin(`${transformOriginX} ${transformOriginY}`);
  }, [targetAlignment, targetPosition]);

  return [
    { direction: beakDirection, top: beakTop, bottom: beakBottom, left: beakLeft, right: beakRight } as const,
    transformOrigin,
  ] as const;
}

function useListeners(
  props: ICoachmarkProps,
  translateAnimationContainer: React.RefObject<HTMLDivElement>,
  openCoachmark: () => void,
) {
  const document = getDocument()?.documentElement;

  useOnEvent(
    document,
    'keydown',
    (e: KeyboardEvent) => {
      // Open coachmark if user presses ALT + C (arbitrary keypress for now)
      if (
        // tslint:disable-next-line: deprecation
        (e.altKey && e.which === KeyCodes.c) ||
        // tslint:disable-next-line: deprecation
        (e.which === KeyCodes.enter && translateAnimationContainer.current?.contains?.(e.target as Node))
      ) {
        openCoachmark();
      }
    },
    true,
  );

  const dismissOnLostFocus = (ev: Event) => {
    if (props.preventDismissOnLostFocus) {
      const clickTarget = ev.target as HTMLElement;
      const clickedOutsideCallout =
        translateAnimationContainer.current && !elementContains(translateAnimationContainer.current, clickTarget);

      const { target } = props;

      if (clickedOutsideCallout && clickTarget !== target && !elementContains(target as HTMLElement, clickTarget)) {
        props.onDismiss?.(ev);
      }
    }
  };

  useOnEvent(document, 'click', dismissOnLostFocus, true);
  useOnEvent(document, 'focus', dismissOnLostFocus, true);
}

function useProximityHandlers(
  props: ICoachmarkProps,
  translateAnimationContainer: React.RefObject<HTMLDivElement>,
  openCoachmark: () => void,
) {
  const async = useAsync();

  /**
   * The target element the mouse would be in
   * proximity to
   */
  const targetElementRect = React.useRef<DOMRect>();

  const setTargetElementRect = (): void => {
    if (translateAnimationContainer?.current) {
      targetElementRect.current = translateAnimationContainer.current.getBoundingClientRect();
    }
  };

  React.useEffect(() => {
    const events = new EventGroup({});

    // We don't want to the user to immediately trigger the Coachmark when it's opened
    async.setTimeout(() => {
      const { mouseProximityOffset = 0 } = props;
      /**
       * An array of cached ids returned when setTimeout runs during
       * the window resize event trigger.
       */
      const timeoutIds: number[] = [];

      // Take the initial measure out of the initial render to prevent
      // an unnecessary render.
      async.setTimeout(() => {
        setTargetElementRect();

        // When the window resizes we want to async
        // get the bounding client rectangle.
        // Every time the event is triggered we want to
        // setTimeout and then clear any previous instances
        // of setTimeout.
        events.on(window, 'resize', (): void => {
          timeoutIds.forEach((value: number): void => {
            clearInterval(value);
          });

          timeoutIds.push(
            async.setTimeout((): void => {
              setTargetElementRect();
            }, 100),
          );
        });
      }, 10);

      // Every time the document's mouse move is triggered
      // we want to check if inside of an element and
      // set the state with the result.
      events.on(document, 'mousemove', (e: MouseEvent) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        setTargetElementRect();

        if (isInsideElement(targetElementRect.current!, mouseX, mouseY, mouseProximityOffset)) {
          openCoachmark();
        }

        props.onMouseMove?.(e);
      });
    }, props.delayBeforeMouseOpen!);

    return () => events.dispose();
  }, []);
}

function useComponentRef(props: ICoachmarkProps) {
  React.useImperativeHandle(
    props.componentRef,
    (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => ({
      dismiss() {
        props.onDismiss?.(ev);
      },
    }),
    [props.onDismiss],
  );
}

function useAriaAlert({ ariaAlertText }: ICoachmarkProps) {
  const async = useAsync();

  /**
   * ARIA alert text to read aloud with Narrator once the Coachmark is mounted
   */
  const [alertText, setAlertText] = React.useState<string | undefined>();

  React.useEffect(() => {
    // Need to add RAF to have narrator read change in alert container
    async.requestAnimationFrame(() => {
      setAlertText(ariaAlertText);
    });
  }, []);

  return alertText;
}

function useAutoFocus({ preventFocusOnMount }: ICoachmarkProps) {
  const async = useAsync();

  /**
   * The cached HTMLElement reference to the Entity Inner Host
   * element.
   */
  const entityHost = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!preventFocusOnMount) {
      async.setTimeout(() => entityHost.current?.focus(), 1000);
    }
  }, []);

  return entityHost;
}

function useEntityHostMeasurements(entityInnerHostElementRef: React.RefObject<HTMLDivElement>) {
  /**
   * Is the teaching bubble currently retreiving the
   * original dimensions of the hosted entity.
   */
  const [isMeasuring, setIsMeasuring] = React.useState<boolean>(true);
  /**
   * Cached width and height of _entityInnerHostElement
   */
  const [entityInnerHostRect, setEntityInnerHostRect] = React.useState<IEntityRect>({ width: 0, height: 0 });
  const async = useAsync();

  React.useEffect(() => {
    async.requestAnimationFrame(() => {
      if (entityInnerHostElementRef.current) {
        setEntityInnerHostRect({
          width: entityInnerHostElementRef.current.offsetWidth,
          height: entityInnerHostElementRef.current.offsetHeight,
        });
        setIsMeasuring(false);
      }
    });
  }, []);

  return [isMeasuring, entityInnerHostRect] as const;
}

function useDeprecationWarning(props: ICoachmarkProps) {
  React.useEffect(() => {
    warnDeprecations(COMPONENT_NAME, props, {
      teachingBubbleRef: undefined,
      collapsed: 'isCollapsed',
      beakWidth: undefined,
      beakHeight: undefined,
      width: undefined,
      height: undefined,
    });
  }, []);
}

const COMPONENT_NAME = 'CoachmarkBase';
export const CoachmarkBase = React.forwardRef(
  (propsWithoutDefaults: ICoachmarkProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const entityInnerHostElementRef = React.useRef<HTMLDivElement | null>(null);
    const translateAnimationContainer = React.useRef<HTMLDivElement | null>(null);

    const [targetAlignment, targetPosition, onPositioned] = usePositionedData();
    const [isCollapsed, openCoachmark] = useCollapsedState(props, entityInnerHostElementRef);
    const [beakPositioningProps, transformOrigin] = useBeakPosition(props, targetAlignment, targetPosition);
    const [isMeasuring, entityInnerHostRect] = useEntityHostMeasurements(entityInnerHostElementRef);
    const alertText = useAriaAlert(props);
    const entityHost = useAutoFocus(props);

    useListeners(props, translateAnimationContainer, openCoachmark);
    useComponentRef(props);
    useProximityHandlers(props, translateAnimationContainer, openCoachmark);
    useDeprecationWarning(props);

    const {
      beaconColorOne,
      beaconColorTwo,
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
      className,
      persistentBeak,
    } = props;

    // Defaulting the main background before passing it to the styles because it is used for `Beak` too.
    let defaultColor = color;
    if (!defaultColor && theme) {
      defaultColor = theme.semanticColors.primaryButtonBackground;
    }

    const classNames = getClassNames(styles, {
      theme,
      beaconColorOne,
      beaconColorTwo,
      className,
      isCollapsed,
      isMeasuring,
      color: defaultColor,
      transformOrigin,
      entityHostHeight: `${entityInnerHostRect.height}px`,
      entityHostWidth: `${entityInnerHostRect.width}px`,
      width: `${COACHMARK_WIDTH}px`,
      height: `${COACHMARK_HEIGHT}px`,
      delayBeforeCoachmarkAnimation: `${delayBeforeCoachmarkAnimation}ms`,
    });

    const finalHeight: number = isCollapsed ? COACHMARK_HEIGHT : entityInnerHostRect.height;

    return (
      <PositioningContainer
        target={target}
        offsetFromTarget={BEAK_HEIGHT}
        finalHeight={finalHeight}
        onPositioned={onPositioned}
        bounds={getBounds(props)}
        {...positioningContainerProps}
      >
        <div className={classNames.root}>
          {ariaAlertText && (
            <div className={classNames.ariaContainer} role="alert" aria-hidden={!isCollapsed}>
              {alertText}
            </div>
          )}
          <div className={classNames.pulsingBeacon} />
          <div className={classNames.translateAnimationContainer} ref={translateAnimationContainer}>
            <div className={classNames.scaleAnimationLayer}>
              <div className={classNames.rotateAnimationLayer}>
                {(isCollapsed || persistentBeak) && <Beak {...beakPositioningProps} color={defaultColor} />}
                <div
                  className={classNames.entityHost}
                  ref={entityHost}
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
                    ),
                  ]}
                  <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                    <div className={classNames.entityInnerHost} ref={entityInnerHostElementRef}>
                      <div className={classNames.childrenContainer} aria-hidden={isCollapsed}>
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
  },
);
CoachmarkBase.displayName = COMPONENT_NAME;

function getBounds({ isPositionForced, positioningContainerProps }: ICoachmarkProps): IRectangle | undefined {
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
        height: Infinity,
      };
    } else {
      return {
        left: -Infinity,
        top: -Infinity,
        bottom: Infinity,
        right: Infinity,
        width: Infinity,
        height: Infinity,
      };
    }
  } else {
    return undefined;
  }
}

function isInsideElement(
  targetElementRect: ClientRect,
  mouseX: number,
  mouseY: number,
  mouseProximityOffset: number = 0,
): boolean {
  return (
    mouseX > targetElementRect.left - mouseProximityOffset &&
    mouseX < targetElementRect.left + targetElementRect.width + mouseProximityOffset &&
    mouseY > targetElementRect.top - mouseProximityOffset &&
    mouseY < targetElementRect.top + targetElementRect.height + mouseProximityOffset
  );
}
