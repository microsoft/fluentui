import * as React from 'react';
import {
  classNamesFunction,
  allowScrollOnElement,
  allowOverscrollOnElement,
  KeyCodes,
  elementContains,
  EventGroup,
} from '../../Utilities';
import { FocusTrapZone, IFocusTrapZone } from '../../FocusTrapZone';
import { animationDuration } from './Modal.styles';
import { IModalProps, IModalStyleProps, IModalStyles } from './Modal.types';
import { Overlay } from '../../Overlay';
import { ILayerProps, Layer } from '../../Layer';
import { Popup } from '../../Popup';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Icon } from '../../Icon';
import { DraggableZone, ICoordinates, IDragData } from '../../utilities/DraggableZone/index';
import { useResponsiveMode } from '../../utilities/hooks/useResponsiveMode';
import { useWindow, useDocument } from '@fluentui/react-window-provider';
import {
  useBoolean,
  useMergedRefs,
  useWarnings,
  useConst,
  useSetTimeout,
  useId,
  useMount,
  useUnmount,
} from '@fluentui/react-hooks';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)
const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false,
};

interface IModalInternalState {
  onModalCloseTimer: number;
  allowTouchBodyScroll: boolean;
  hasRegisteredKeyUp: boolean;
  scrollableContent: HTMLDivElement | null;
  lastSetXCoordinate: number;
  lastSetYCoordinate: number;
  minClampedPosition: ICoordinates;
  maxClampedPosition: ICoordinates;
  events: EventGroup;
  disposeOnKeyDown?: () => void;
  isInKeyboardMoveMode: boolean;
}

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
  (props, ref) => {
    const {
      allowTouchBodyScroll = false,
      className = '',
      children,
      containerClassName = '',
      scrollableContentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking = false,
      isClickableOutsideFocusTrap,
      isDarkOverlay = true,
      onDismiss,
      layerProps,
      overlay,
      isOpen = false,
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
      enableAriaHiddenSiblings,
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const focusTrapZone = React.useRef<IFocusTrapZone>(null);
    const mergedRef = useMergedRefs(rootRef, ref);

    const modalResponsiveMode = useResponsiveMode(mergedRef);

    const focusTrapZoneId = useId('ModalFocusTrapZone');

    const doc = useDocument();
    const win = useWindow();

    const { setTimeout, clearTimeout } = useSetTimeout();

    const [isModalOpen, setIsModalOpen] = React.useState(isOpen);
    const [hasBeenOpened, setHasBeenOpened] = React.useState(isOpen);
    const [isVisible, setIsVisible] = React.useState(isOpen);
    const [xCoordinate, setXCoordinate] = React.useState<number>(0);
    const [yCoordinate, setYCoordinate] = React.useState<number>(0);
    const [modalRectangleTop, setModalRectangleTop] = React.useState<number | undefined>();

    const [isModalMenuOpen, { toggle: toggleModalMenuOpen, setFalse: setModalMenuClose }] = useBoolean(false);

    const internalState = useConst<IModalInternalState>(() => ({
      onModalCloseTimer: 0,
      allowTouchBodyScroll,
      hasRegisteredKeyUp: false,
      scrollableContent: null,
      lastSetXCoordinate: 0,
      lastSetYCoordinate: 0,
      minClampedPosition: { x: 0, y: 0 },
      maxClampedPosition: { x: 0, y: 0 },
      events: new EventGroup({}),
      disposeOnKeyDown: undefined,
      isInKeyboardMoveMode: false,
    }));

    const hasDragOptions = !!dragOptions;

    const layerClassName = layerProps === undefined ? '' : layerProps.className;
    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      containerClassName,
      scrollableContentClassName,
      isOpen,
      isVisible,
      hasBeenOpened,
      modalRectangleTop,
      topOffsetFixed,
      isModeless,
      layerClassName,
      windowInnerHeight: win?.innerHeight,
      isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector,
    });

    const mergedLayerProps = {
      ...DefaultLayerProps,
      ...layerProps,
      onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount,
      insertFirst: isModeless,
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
      if (dragOptions?.keepInBounds && !internalState.minClampedPosition && !internalState.maxClampedPosition) {
        const dialogMain = doc?.querySelector(`[data-id=${focusTrapZoneId}]`);
        if (dialogMain) {
          const modalRectangle = dialogMain.getBoundingClientRect();
          internalState.minClampedPosition = { x: -modalRectangle.x, y: -modalRectangle.y };
          internalState.maxClampedPosition = { x: modalRectangle.x, y: modalRectangle.y };
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
      (axis: string, position: number) => {
        if (!dragOptions || !dragOptions.keepInBounds) {
          return position;
        }

        position = Math.max(internalState.minClampedPosition[axis as keyof ICoordinates], position);
        position = Math.min(internalState.minClampedPosition[axis as keyof ICoordinates], position);

        return position;
      },
      [dragOptions, internalState],
    );

    const handleModalClose = (): void => {
      internalState.lastSetXCoordinate = 0;
      internalState.lastSetYCoordinate = 0;

      setModalMenuClose();
      internalState.isInKeyboardMoveMode = false;
      setIsModalOpen(false);
      setXCoordinate(0);
      setYCoordinate(0);

      const handleKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
        // Needs to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
        if (ev.altKey && ev.ctrlKey && ev.keyCode === KeyCodes.space) {
          if (elementContains(internalState.scrollableContent, ev.target as HTMLElement)) {
            toggleModalMenuOpen();
            internalState.isInKeyboardMoveMode = true;
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      if (hasDragOptions && internalState.hasRegisteredKeyUp) {
        internalState.events.off(win, 'keyup', handleKeyUp, true /* useCapture */);
      }

      onDismissed?.();
    };

    const handleDragStart = React.useCallback((): void => {
      setModalMenuClose();
      internalState.isInKeyboardMoveMode = false;
    }, [internalState, setModalMenuClose]);

    const handleDrag = React.useCallback(
      (ev: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, ui: IDragData): void => {
        setXCoordinate(prevValue => getClampedAxis('x', prevValue + ui.delta.x));
        setYCoordinate(prevValue => getClampedAxis('y', prevValue + ui.delta.y));
      },
      [getClampedAxis],
    );

    const handleDragStop = React.useCallback((): void => {
      if (focusTrapZone.current) {
        focusTrapZone.current.focus();
      }
    }, []);

    // We need a global handleKeyDown event when we are in the move mode so that we can
    // handle the key presses and the components inside the modal do not get the events
    const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
      if (ev.altKey && ev.ctrlKey && ev.keyCode === KeyCodes.space) {
        // CTRL + ALT + SPACE is handled during keyUp
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }

      if (isModalMenuOpen && (ev.altKey || ev.keyCode === KeyCodes.escape)) {
        setModalMenuClose();
      }

      if (internalState.isInKeyboardMoveMode && (ev.keyCode === KeyCodes.escape || ev.keyCode === KeyCodes.enter)) {
        internalState.isInKeyboardMoveMode = false;
        ev.preventDefault();
        ev.stopPropagation();
      }

      if (internalState.isInKeyboardMoveMode) {
        let handledEvent = true;
        const delta = getMoveDelta(ev);

        switch (ev.keyCode) {
          /* eslint-disable no-fallthrough */
          case KeyCodes.escape:
            setXCoordinate(internalState.lastSetXCoordinate);
            setYCoordinate(internalState.lastSetYCoordinate);
          case KeyCodes.enter: {
            // TODO: determine if fallthrough was intentional
            /* eslint-enable no-fallthrough */
            internalState.lastSetXCoordinate = 0;
            internalState.lastSetYCoordinate = 0;
            // setIsInKeyboardMoveMode(false);
            break;
          }
          case KeyCodes.up: {
            setYCoordinate(prevValue => getClampedAxis('y', prevValue - delta));
            break;
          }
          case KeyCodes.down: {
            setYCoordinate(prevValue => getClampedAxis('y', prevValue + delta));
            break;
          }
          case KeyCodes.left: {
            setXCoordinate(prevValue => getClampedAxis('x', prevValue - delta));
            break;
          }
          case KeyCodes.right: {
            setXCoordinate(prevValue => getClampedAxis('x', prevValue + delta));
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

    const handleEnterKeyboardMoveMode = () => {
      internalState.lastSetXCoordinate = xCoordinate;
      internalState.lastSetYCoordinate = yCoordinate;
      setModalMenuClose();
      internalState.isInKeyboardMoveMode = true;
      // internalState.events.on(win, 'keydown', handleKeyDown, true /* useCapture */);

      // internalState.disposeOnKeyDown = () =>
      internalState.events.on(win, 'keydown', handleKeyDown, true /* useCapture */);
    };

    const handleExitKeyboardMoveMode = () => {
      internalState.lastSetXCoordinate = 0;
      internalState.lastSetYCoordinate = 0;
      internalState.isInKeyboardMoveMode = false;
      internalState.disposeOnKeyDown = () =>
        internalState.events.off(win, 'keydown', handleKeyDown, true /* useCapture */);
      // internalState.events.off(win, 'keydown', handleKeyDown, true /* useCapture */);
    };

    const registerForKeyUp = (): void => {
      const handleKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
        // Needs to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
        if (ev.altKey && ev.ctrlKey && ev.keyCode === KeyCodes.space) {
          if (elementContains(internalState.scrollableContent, ev.target as HTMLElement)) {
            toggleModalMenuOpen();
            ev.preventDefault();
            ev.stopPropagation();
          }
        }
      };

      if (!internalState.hasRegisteredKeyUp) {
        internalState.events.on(win, 'keyup', handleKeyUp, true /* useCapture */);
        internalState.hasRegisteredKeyUp = true;
      }
    };

    React.useEffect(() => {
      clearTimeout(internalState.onModalCloseTimer);
      // Opening the dialog
      if (isOpen) {
        requestAnimationFrame(() => setTimeout(registerInitialModalPosition, 0));
        setIsModalOpen(true);

        // Add a keyUp handler for all key up events once the dialog is open.
        if (dragOptions) {
          registerForKeyUp();
        }

        setHasBeenOpened(true);
        setIsVisible(true);

        if (topOffsetFixed) {
          const dialogMain = doc?.getElementsByClassName('ms-Dialog-main');
          let modalRectangle;
          if (dialogMain && dialogMain.length > 0) {
            modalRectangle = dialogMain[0].getBoundingClientRect();
            setModalRectangleTop(modalRectangle.top);
          }
        }
      }

      // Closing the dialog
      if (!isOpen && isModalOpen) {
        internalState.onModalCloseTimer = setTimeout(handleModalClose, parseFloat(animationDuration) * 1000);
        setIsVisible(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- should only run if isModalOpen or isOpen mutates.
    }, [isModalOpen, isOpen]);

    useMount(() => {
      if (isOpen && isVisible) {
        registerForKeyUp();
        registerInitialModalPosition();
      }
    });

    useUnmount(() => {
      internalState.events.dispose();
    });

    useComponentRef(props, focusTrapZone);
    useDebugWarnings(props);

    const modalContent = (
      <FocusTrapZone
        data-id={focusTrapZoneId}
        componentRef={focusTrapZone}
        className={classNames.main}
        elementToFocusOnDismiss={elementToFocusOnDismiss}
        isClickableOutsideFocusTrap={isModeless || isClickableOutsideFocusTrap || !isBlocking}
        ignoreExternalFocusing={ignoreExternalFocusing}
        forceFocusInsideTrap={isModeless ? !isModeless : forceFocusInsideTrap}
        firstFocusableSelector={firstFocusableSelector}
        focusPreviouslyFocusedInnerElement
        onBlur={internalState.isInKeyboardMoveMode ? handleExitKeyboardMoveMode : undefined}
        enableAriaHiddenSiblings={enableAriaHiddenSiblings}
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
            role={isModeless || !isBlocking ? 'dialog' : 'alertdialog'}
            aria-modal={!isModeless}
            ariaLabelledBy={titleAriaId}
            ariaDescribedBy={subtitleAriaId}
            onDismiss={onDismiss}
            shouldRestoreFocus={!ignoreExternalFocusing}
          >
            <div className={classNames.root} role={!isModeless ? 'document' : undefined}>
              {!isModeless && (
                <Overlay
                  isDarkThemed={isDarkOverlay}
                  onClick={isBlocking ? undefined : onDismiss}
                  allowTouchBodyScroll={allowTouchBodyScroll}
                  {...overlay}
                />
              )}
              {dragOptions ? (
                <DraggableZone
                  handleSelector={dragOptions.dragHandleSelector || `.${classNames.main.split(' ')[0]}`}
                  preventDragSelector="button"
                  onStart={handleDragStart}
                  onDragChange={handleDrag}
                  onStop={handleDragStop}
                  position={{ x: xCoordinate, y: yCoordinate }}
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
