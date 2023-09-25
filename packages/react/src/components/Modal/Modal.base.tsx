import * as React from 'react';
import {
  classNamesFunction,
  css,
  allowScrollOnElement,
  allowOverscrollOnElement,
  getPropsWithDefaults,
  KeyCodes,
  elementContains,
  EventGroup,
} from '../../Utilities';
import { FocusTrapZone } from '../../FocusTrapZone';
import { animationDuration } from './Modal.styles';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Popup } from '../../Popup';
import { ResponsiveMode, useResponsiveMode } from '../../ResponsiveMode';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Icon } from '../../Icon';
import { DraggableZone } from '../../utilities/DraggableZone/index';
import { useWindow } from '@fluentui/react-window-provider';
import {
  useBoolean,
  useMergedRefs,
  useWarnings,
  useConst,
  useSetTimeout,
  useId,
  useUnmount,
} from '@fluentui/react-hooks';
import type { IFocusTrapZone } from '../../FocusTrapZone';
import type { IDragOptions, IModalProps, IModalStyleProps, IModalStyles } from './Modal.types';
import type { ILayerProps } from '../../Layer';
import type { ICoordinates, IDragData } from '../../utilities/DraggableZone/index';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

interface IModalInternalState {
  onModalCloseTimer: number;
  allowTouchBodyScroll?: boolean;
  scrollableContent: HTMLDivElement | null;
  lastSetCoordinates: ICoordinates;
  /** Minimum clamped position, if dragging and clamping (`dragOptions.keepInBounds`) are enabled */
  minPosition?: ICoordinates;
  /** Maximum clamped position, if dragging and clamping (`dragOptions.keepInBounds`) are enabled */
  maxPosition?: ICoordinates;
  events: EventGroup;
  /** Ensures we dispose the same keydown callback as was registered */
  disposeOnKeyDown?: () => void;
  /** Ensures we dispose the same keyup callback as was registered (also tracks whether keyup has been registered) */
  disposeOnKeyUp?: () => void;
  isInKeyboardMoveMode?: boolean;
  hasBeenOpened?: boolean;
}

const ZERO: ICoordinates = { x: 0, y: 0 };

const DEFAULT_PROPS: Partial<IModalProps> = {
  isOpen: false,
  isDarkOverlay: true,
  className: '',
  containerClassName: '',
  enableAriaHiddenSiblings: true,
};

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>();

const getMoveDelta = (ev: React.KeyboardEvent<HTMLElement>): number => {
  let delta = 10;
  if (ev.shiftKey) {
    if (!ev.ctrlKey) {
      delta = 50;
    }
  } else if (ev.ctrlKey) {
    delta = 1;
  }

  return delta;
};

const useComponentRef = (props: IModalProps, focusTrapZone: React.RefObject<IFocusTrapZone>) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus() {
        if (focusTrapZone.current) {
          focusTrapZone.current.focus();
        }
      },
    }),
    [focusTrapZone],
  );
};

export const ModalBase: React.FunctionComponent<IModalProps> = React.forwardRef<HTMLDivElement, IModalProps>(
  (propsWithoutDefaults, ref) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
    const {
      allowTouchBodyScroll,
      className,
      children,
      containerClassName,
      scrollableContentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      focusTrapZoneProps,
      forceFocusInsideTrap,
      // eslint-disable-next-line deprecation/deprecation
      disableRestoreFocus = props.ignoreExternalFocusing,
      isBlocking,
      isAlert,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      layerProps,
      overlay,
      isOpen,
      titleAriaId,
      styles,
      subtitleAriaId,
      theme,
      topOffsetFixed,
      responsiveMode,
      // eslint-disable-next-line deprecation/deprecation
      onLayerDidMount,
      isModeless,
      dragOptions,
      onDismissed,
      // eslint-disable-next-line deprecation/deprecation
      enableAriaHiddenSiblings,
      popupProps,
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const focusTrapZone = React.useRef<IFocusTrapZone>(null);
    const focusTrapZoneRef = useMergedRefs(focusTrapZone, focusTrapZoneProps?.componentRef);
    const focusTrapZoneElm = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(rootRef, ref);

    const modalResponsiveMode = useResponsiveMode(mergedRef);

    const focusTrapZoneId = useId('ModalFocusTrapZone', focusTrapZoneProps?.id);

    const win = useWindow();

    const { setTimeout, clearTimeout } = useSetTimeout();

    const [isModalOpen, setIsModalOpen] = React.useState(isOpen);
    const [isVisible, setIsVisible] = React.useState(isOpen);
    const [coordinates, setCoordinates] = React.useState<ICoordinates>(ZERO);
    const [modalRectangleTop, setModalRectangleTop] = React.useState<number | undefined>();

    const [isModalMenuOpen, { toggle: toggleModalMenuOpen, setFalse: setModalMenuClose }] = useBoolean(false);

    const internalState = useConst<IModalInternalState>(() => ({
      onModalCloseTimer: 0,
      allowTouchBodyScroll,
      scrollableContent: null,
      lastSetCoordinates: ZERO,
      events: new EventGroup({}),
    }));

    const { keepInBounds } = dragOptions || ({} as IDragOptions);
    const isAlertRole = isAlert ?? (isBlocking && !isModeless);

    const layerClassName = layerProps === undefined ? '' : layerProps.className;
    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      containerClassName,
      scrollableContentClassName,
      isOpen,
      isVisible,
      hasBeenOpened: internalState.hasBeenOpened,
      modalRectangleTop,
      topOffsetFixed,
      isModeless,
      layerClassName,
      windowInnerHeight: win?.innerHeight,
      isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector,
    });

    const mergedLayerProps: ILayerProps = {
      eventBubblingEnabled: false,
      ...layerProps,
      onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount,
      insertFirst: layerProps?.insertFirst || isModeless,
      className: classNames.layer,
    };

    // Allow the user to scroll within the modal but not on the body
    const allowScrollOnModal = React.useCallback(
      (elt: HTMLDivElement | null): void => {
        if (elt) {
          if (internalState.allowTouchBodyScroll) {
            allowOverscrollOnElement(elt, internalState.events);
          } else {
            allowScrollOnElement(elt, internalState.events);
          }
        } else {
          internalState.events.off(internalState.scrollableContent);
        }
        internalState.scrollableContent = elt;
      },
      [internalState],
    );

    const registerInitialModalPosition = (): void => {
      const dialogMain = focusTrapZoneElm.current;
      const modalRectangle = dialogMain?.getBoundingClientRect();

      if (modalRectangle) {
        if (topOffsetFixed) {
          setModalRectangleTop(modalRectangle.top);
        }

        if (keepInBounds) {
          // x/y are unavailable in IE, so use the equivalent left/top
          internalState.minPosition = { x: -modalRectangle.left, y: -modalRectangle.top };
          internalState.maxPosition = { x: modalRectangle.left, y: modalRectangle.top };
        }
      }
    };

    /**
     * Clamps an axis to a specified min and max position.
     *
     * @param axis A string that represents the axis (x/y).
     * @param position The position on the axis.
     */
    const getClampedAxis = React.useCallback(
      (axis: keyof ICoordinates, position: number) => {
        const { minPosition, maxPosition } = internalState;
        if (keepInBounds && minPosition && maxPosition) {
          position = Math.max(minPosition[axis], position);
          position = Math.min(maxPosition[axis], position);
        }
        return position;
      },
      [keepInBounds, internalState],
    );

    const handleModalClose = (): void => {
      internalState.lastSetCoordinates = ZERO;

      setModalMenuClose();
      internalState.isInKeyboardMoveMode = false;
      setIsModalOpen(false);
      setCoordinates(ZERO);

      internalState.disposeOnKeyUp?.();

      onDismissed?.();
    };

    const handleDragStart = React.useCallback((): void => {
      setModalMenuClose();
      internalState.isInKeyboardMoveMode = false;
    }, [internalState, setModalMenuClose]);

    const handleDrag = React.useCallback(
      (ev: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, dragData: IDragData): void => {
        setCoordinates(prevValue => ({
          x: getClampedAxis('x', prevValue.x + dragData.delta.x),
          y: getClampedAxis('y', prevValue.y + dragData.delta.y),
        }));
      },
      [getClampedAxis],
    );

    const handleDragStop = React.useCallback((): void => {
      if (focusTrapZone.current) {
        focusTrapZone.current.focus();
      }
    }, []);

    const handleEnterKeyboardMoveMode = () => {
      // We need a global handleKeyDown event when we are in the move mode so that we can
      // handle the key presses and the components inside the modal do not get the events
      const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
        // eslint-disable-next-line deprecation/deprecation
        if (ev.altKey && ev.ctrlKey && ev.keyCode === KeyCodes.space) {
          // CTRL + ALT + SPACE is handled during keyUp
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }

        // eslint-disable-next-line deprecation/deprecation
        const newLocal = ev.altKey || ev.keyCode === KeyCodes.escape;
        if (isModalMenuOpen && newLocal) {
          setModalMenuClose();
        }

        // eslint-disable-next-line deprecation/deprecation
        if (internalState.isInKeyboardMoveMode && (ev.keyCode === KeyCodes.escape || ev.keyCode === KeyCodes.enter)) {
          internalState.isInKeyboardMoveMode = false;
          ev.preventDefault();
          ev.stopPropagation();
        }

        if (internalState.isInKeyboardMoveMode) {
          let handledEvent = true;
          const delta = getMoveDelta(ev);

          // eslint-disable-next-line deprecation/deprecation
          switch (ev.keyCode) {
            /* eslint-disable no-fallthrough */
            case KeyCodes.escape:
              setCoordinates(internalState.lastSetCoordinates);
            case KeyCodes.enter: {
              // TODO: determine if fallthrough was intentional
              /* eslint-enable no-fallthrough */
              internalState.lastSetCoordinates = ZERO;
              // setIsInKeyboardMoveMode(false);
              break;
            }
            case KeyCodes.up: {
              setCoordinates(prevValue => ({ x: prevValue.x, y: getClampedAxis('y', prevValue.y - delta) }));
              break;
            }
            case KeyCodes.down: {
              setCoordinates(prevValue => ({ x: prevValue.x, y: getClampedAxis('y', prevValue.y + delta) }));
              break;
            }
            case KeyCodes.left: {
              setCoordinates(prevValue => ({ x: getClampedAxis('x', prevValue.x - delta), y: prevValue.y }));
              break;
            }
            case KeyCodes.right: {
              setCoordinates(prevValue => ({ x: getClampedAxis('x', prevValue.x + delta), y: prevValue.y }));
              break;
            }
            default: {
              handledEvent = false;
            }
          }
          if (handledEvent) {
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      internalState.lastSetCoordinates = coordinates;
      setModalMenuClose();
      internalState.isInKeyboardMoveMode = true;

      internalState.events.on(win, 'keydown', handleKeyDown, true /* useCapture */);
      internalState.disposeOnKeyDown = () => {
        internalState.events.off(win, 'keydown', handleKeyDown, true /* useCapture */);
        internalState.disposeOnKeyDown = undefined;
      };
    };

    const handleExitKeyboardMoveMode = (ev: React.FocusEvent<HTMLDivElement>) => {
      focusTrapZoneProps?.onBlur?.(ev);
      internalState.lastSetCoordinates = ZERO;
      internalState.isInKeyboardMoveMode = false;
      internalState.disposeOnKeyDown?.();
    };

    const registerForKeyUp = (): void => {
      const handleKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
        // Needs to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
        // eslint-disable-next-line deprecation/deprecation
        if (ev.altKey && ev.ctrlKey && ev.keyCode === KeyCodes.space) {
          if (elementContains(internalState.scrollableContent, ev.target as HTMLElement)) {
            toggleModalMenuOpen();
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      if (!internalState.disposeOnKeyUp) {
        internalState.events.on(win, 'keyup', handleKeyUp, true /* useCapture */);
        internalState.disposeOnKeyUp = () => {
          internalState.events.off(win, 'keyup', handleKeyUp, true /* useCapture */);
          internalState.disposeOnKeyUp = undefined;
        };
      }
    };

    React.useEffect(() => {
      clearTimeout(internalState.onModalCloseTimer);
      // Opening the dialog
      if (isOpen) {
        // This must be done after the modal content has rendered
        requestAnimationFrame(() => setTimeout(registerInitialModalPosition, 0));

        setIsModalOpen(true);

        // Add a keyUp handler for all key up events once the dialog is open.
        if (dragOptions) {
          registerForKeyUp();
        }

        internalState.hasBeenOpened = true;
        setIsVisible(true);
      }

      // Closing the dialog
      if (!isOpen && isModalOpen) {
        internalState.onModalCloseTimer = setTimeout(handleModalClose, parseFloat(animationDuration) * 1000);
        setIsVisible(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run if isModalOpen or isOpen mutates.
    }, [isModalOpen, isOpen]);

    useUnmount(() => {
      internalState.events.dispose();
    });

    useComponentRef(props, focusTrapZone);
    useDebugWarnings(props);

    const modalContent = (
      <FocusTrapZone
        {...focusTrapZoneProps}
        id={focusTrapZoneId}
        ref={focusTrapZoneElm}
        componentRef={focusTrapZoneRef}
        className={css(classNames.main, focusTrapZoneProps?.className)}
        elementToFocusOnDismiss={focusTrapZoneProps?.elementToFocusOnDismiss ?? elementToFocusOnDismiss}
        isClickableOutsideFocusTrap={
          focusTrapZoneProps?.isClickableOutsideFocusTrap ?? (isModeless || isClickableOutsideFocusTrap || !isBlocking)
        }
        disableRestoreFocus={focusTrapZoneProps?.disableRestoreFocus ?? disableRestoreFocus}
        forceFocusInsideTrap={(focusTrapZoneProps?.forceFocusInsideTrap ?? forceFocusInsideTrap) && !isModeless}
        // eslint-disable-next-line deprecation/deprecation
        firstFocusableSelector={focusTrapZoneProps?.firstFocusableSelector || firstFocusableSelector}
        focusPreviouslyFocusedInnerElement={focusTrapZoneProps?.focusPreviouslyFocusedInnerElement ?? true}
        onBlur={internalState.isInKeyboardMoveMode ? handleExitKeyboardMoveMode : undefined}
        // enableAriaHiddenSiblings is handled by the Popup
      >
        {dragOptions && internalState.isInKeyboardMoveMode && (
          <div className={classNames.keyboardMoveIconContainer}>
            {dragOptions.keyboardMoveIconProps ? (
              <Icon {...dragOptions.keyboardMoveIconProps} />
            ) : (
              <Icon iconName="move" className={classNames.keyboardMoveIcon} />
            )}
          </div>
        )}
        <div ref={allowScrollOnModal} className={classNames.scrollableContent} data-is-scrollable>
          {dragOptions && isModalMenuOpen && (
            <dragOptions.menu
              items={[
                { key: 'move', text: dragOptions.moveMenuItemText, onClick: handleEnterKeyboardMoveMode },
                { key: 'close', text: dragOptions.closeMenuItemText, onClick: handleModalClose },
              ]}
              onDismiss={setModalMenuClose}
              alignTargetEdge
              coverTarget
              directionalHint={DirectionalHint.topLeftEdge}
              directionalHintFixed
              shouldFocusOnMount
              target={internalState.scrollableContent}
            />
          )}
          {children}
        </div>
      </FocusTrapZone>
    );

    return (
      (isModalOpen && modalResponsiveMode! >= (responsiveMode || ResponsiveMode.small) && (
        <Layer ref={mergedRef} {...mergedLayerProps}>
          <Popup
            role={isAlertRole ? 'alertdialog' : 'dialog'}
            ariaLabelledBy={titleAriaId}
            ariaDescribedBy={subtitleAriaId}
            onDismiss={onDismiss}
            shouldRestoreFocus={!disableRestoreFocus}
            // Modeless modals shouldn't hide siblings.
            // Popup will automatically handle this based on the aria-modal setting.
            enableAriaHiddenSiblings={enableAriaHiddenSiblings}
            aria-modal={!isModeless}
            {...popupProps}
          >
            <div className={classNames.root} role={!isModeless ? 'document' : undefined}>
              {!isModeless && (
                <Overlay
                  aria-hidden={true}
                  isDarkThemed={isDarkOverlay}
                  onClick={isBlocking ? undefined : onDismiss}
                  allowTouchBodyScroll={allowTouchBodyScroll}
                  {...overlay}
                />
              )}
              {dragOptions ? (
                <DraggableZone
                  handleSelector={dragOptions.dragHandleSelector || `#${focusTrapZoneId}`}
                  preventDragSelector="button"
                  onStart={handleDragStart}
                  onDragChange={handleDrag}
                  onStop={handleDragStop}
                  position={coordinates}
                >
                  {modalContent}
                </DraggableZone>
              ) : (
                modalContent
              )}
            </div>
          </Popup>
        </Layer>
      )) ||
      null
    );
  },
);
ModalBase.displayName = 'Modal';

function useDebugWarnings(props: IModalProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Modal',
      props,
      deprecations: { onLayerDidMount: 'layerProps.onLayerDidMount' },
    });
  }
}
