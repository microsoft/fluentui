import * as React from 'react';
import {
  classNamesFunction,
  getId,
  allowScrollOnElement,
  allowOverscrollOnElement,
  KeyCodes,
  elementContains,
  warnDeprecations,
  Async,
  EventGroup,
} from '../../Utilities';
import { FocusTrapZone, IFocusTrapZone } from '../FocusTrapZone/index';
import { animationDuration } from './Modal.styles';
import { IModalProps, IModalStyleProps, IModalStyles, IModal } from './Modal.types';
import { Overlay } from '../../Overlay';
import { ILayerProps, Layer } from '../../Layer';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { DirectionalHint } from '../Callout/index';
import { Icon } from '../Icon/index';
import { DraggableZone, ICoordinates, IDragData } from '../../utilities/DraggableZone/index';
import { initializeComponentRef } from '@uifabric/utilities';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false,
};

export interface IDialogState {
  isOpen?: boolean;
  isVisible?: boolean;
  isVisibleClose?: boolean;
  id?: string;
  hasBeenOpened?: boolean;
  modalRectangleTop?: number;
  isModalMenuOpen?: boolean;
  isInKeyboardMoveMode?: boolean;
  x: number;
  y: number;
}

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>();
const COMPONENT_NAME = 'Modal';

@withResponsiveMode
export class ModalBase extends React.Component<IModalProps, IDialogState> implements IModal {
  public static defaultProps: IModalProps = {
    isOpen: false,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: '',
  };

  private _onModalCloseTimer: number;
  private _focusTrapZone = React.createRef<IFocusTrapZone>();
  private _scrollableContent: HTMLDivElement | null;
  private _lastSetX: number;
  private _lastSetY: number;
  private _allowTouchBodyScroll: boolean;
  private _hasRegisteredKeyUp: boolean;
  private _async: Async;
  private _events: EventGroup;
  private _minClampedPosition: ICoordinates;
  private _maxClampedPosition: ICoordinates;

  constructor(props: IModalProps) {
    super(props);

    this._async = new Async(this);
    this._events = new EventGroup(this);
    initializeComponentRef(this);

    warnDeprecations(COMPONENT_NAME, props, {
      onLayerDidMount: 'layerProps.onLayerDidMount',
    });

    this.state = {
      id: getId('Modal'),
      isOpen: props.isOpen,
      isVisible: props.isOpen,
      hasBeenOpened: props.isOpen,
      x: 0,
      y: 0,
    };

    this._lastSetX = 0;
    this._lastSetY = 0;

    const { allowTouchBodyScroll = false } = this.props;
    this._allowTouchBodyScroll = allowTouchBodyScroll;
  }

  public UNSAFE_componentWillReceiveProps(newProps: IModalProps): void {
    clearTimeout(this._onModalCloseTimer);

    // Opening the dialog
    if (newProps.isOpen) {
      if (!this.state.isOpen) {
        // First Open
        this.setState({
          isOpen: true,
        });
        // Add a keyUp handler for all key up events when the dialog is open
        if (newProps.dragOptions) {
          this._registerForKeyUp();
        }
      } else {
        // Modal has been opened
        // Reopen during closing
        this.setState({
          hasBeenOpened: true,
          isVisible: true,
        });
      }
    }

    // Closing the dialog
    if (!newProps.isOpen && this.state.isOpen) {
      this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(animationDuration) * 1000);
      this.setState({
        isVisible: false,
      });
    }
  }

  public componentDidMount() {
    // Not all modals show just by updating their props. Some only render when they are mounted and pass in
    // isOpen as true. We need to add the keyUp handler in componentDidMount if we are in that case.
    if (this.state.isOpen && this.state.isVisible) {
      this._registerForKeyUp();
      requestAnimationFrame(() => setTimeout(this._registerInitialModalPosition, 0));
    }
  }

  public componentDidUpdate(prevProps: IModalProps, prevState: IDialogState) {
    if (!prevProps.isOpen && !prevState.isVisible) {
      this.setState({
        isVisible: true,
      });
    }
    if (!prevProps.isOpen && this.props.isOpen) {
      requestAnimationFrame(() => setTimeout(this._registerInitialModalPosition, 0));
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  public render(): JSX.Element | null {
    const {
      className,
      containerClassName,
      scrollableContentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      layerProps,
      overlay,
      responsiveMode,
      titleAriaId,
      styles,
      subtitleAriaId,
      theme,
      topOffsetFixed,
      // eslint-disable-next-line deprecation/deprecation
      onLayerDidMount,
      isModeless,
      isAlert,
      dragOptions,
      enableAriaHiddenSiblings,
    } = this.props;
    const { isOpen, isVisible, hasBeenOpened, modalRectangleTop, x, y, isInKeyboardMoveMode } = this.state;

    if (!isOpen) {
      return null;
    }

    const layerClassName = layerProps === undefined ? '' : layerProps.className;
    const isAlertRole = isAlert ?? (isBlocking && !isModeless);

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
      isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector,
    });

    const mergedLayerProps = {
      ...DefaultLayerProps,
      ...this.props.layerProps,
      onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount,
      insertFirst: isModeless,
      className: classNames.layer,
    };
    const modalContent = (
      <FocusTrapZone
        data-id={this.state.id}
        componentRef={this._focusTrapZone}
        className={classNames.main}
        elementToFocusOnDismiss={elementToFocusOnDismiss}
        isClickableOutsideFocusTrap={isModeless || isClickableOutsideFocusTrap || !isBlocking}
        ignoreExternalFocusing={ignoreExternalFocusing}
        forceFocusInsideTrap={isModeless ? !isModeless : forceFocusInsideTrap}
        firstFocusableSelector={firstFocusableSelector}
        focusPreviouslyFocusedInnerElement={true}
        onBlur={isInKeyboardMoveMode ? this._onExitKeyboardMoveMode : undefined}
        enableAriaHiddenSiblings={enableAriaHiddenSiblings}
      >
        {dragOptions && isInKeyboardMoveMode && (
          <div className={classNames.keyboardMoveIconContainer}>
            {dragOptions.keyboardMoveIconProps ? (
              <Icon {...dragOptions.keyboardMoveIconProps} />
            ) : (
              <Icon iconName="move" className={classNames.keyboardMoveIcon} />
            )}
          </div>
        )}
        <div ref={this._allowScrollOnModal} className={classNames.scrollableContent} data-is-scrollable={true}>
          {dragOptions && this.state.isModalMenuOpen && (
            <dragOptions.menu
              items={[
                { key: 'move', text: dragOptions.moveMenuItemText, onClick: this._onEnterKeyboardMoveMode },
                { key: 'close', text: dragOptions.closeMenuItemText, onClick: this._onModalClose },
              ]}
              onDismiss={this._onModalContextMenuClose}
              alignTargetEdge={true}
              coverTarget={true}
              directionalHint={DirectionalHint.topLeftEdge}
              directionalHintFixed={true}
              shouldFocusOnMount={true}
              target={this._scrollableContent}
            />
          )}
          {this.props.children}
        </div>
      </FocusTrapZone>
    );

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode! >= ResponsiveMode.small) {
      return (
        <Layer {...mergedLayerProps}>
          <Popup
            role={isAlertRole ? 'alertdialog' : 'dialog'}
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
                  onClick={isBlocking ? undefined : (onDismiss as any)}
                  allowTouchBodyScroll={this._allowTouchBodyScroll}
                  {...overlay}
                />
              )}
              {dragOptions ? (
                <DraggableZone
                  handleSelector={dragOptions.dragHandleSelector || `.${classNames.main.split(' ')[0]}`}
                  preventDragSelector="button"
                  onStart={this._onDragStart}
                  onDragChange={this._onDrag}
                  onStop={this._onDragStop}
                  position={{ x: x, y: y }}
                >
                  {modalContent}
                </DraggableZone>
              ) : (
                modalContent
              )}
            </div>
          </Popup>
        </Layer>
      );
    }
    return null;
  }

  public focus() {
    if (this._focusTrapZone.current) {
      this._focusTrapZone.current.focus();
    }
  }

  private _registerInitialModalPosition = (): void => {
    const dialogMain = document.querySelector(`[data-id=${this.state.id}]`);

    if (dialogMain) {
      const modalRectangle = dialogMain.getBoundingClientRect();
      if (this.props.dragOptions?.keepInBounds && !this._minClampedPosition && !this._maxClampedPosition) {
        this._minClampedPosition = { x: -modalRectangle.x, y: -modalRectangle.y };
        this._maxClampedPosition = { x: modalRectangle.x, y: modalRectangle.y };
      }

      this.setState({
        modalRectangleTop: modalRectangle.top,
      });
    }
  };

  /**
   * Clamps the position coordinates to the maximum/minimum value specified in props
   */
  private _getClampedPosition(position: ICoordinates) {
    if (!this.props.dragOptions || !this.props.dragOptions.keepInBounds) {
      return position;
    }
    return { x: this._getClampedPositionX(position.x), y: this._getClampedPositionY(position.y) };
  }

  private _getClampedPositionY(y: number) {
    const minPosition = this._minClampedPosition;
    const maxPosition = this._maxClampedPosition;
    if (minPosition) {
      y = Math.max(minPosition.y, y);
    }
    if (maxPosition) {
      y = Math.min(maxPosition.y, y);
    }
    return y;
  }

  private _getClampedPositionX(x: number) {
    const minPosition = this._minClampedPosition;
    const maxPosition = this._maxClampedPosition;
    if (minPosition) {
      x = Math.max(minPosition.x, x);
    }
    if (maxPosition) {
      x = Math.min(maxPosition.x, x);
    }
    return x;
  }

  // Allow the user to scroll within the modal but not on the body
  private _allowScrollOnModal = (elt: HTMLDivElement | null): void => {
    if (elt) {
      if (this._allowTouchBodyScroll) {
        allowOverscrollOnElement(elt, this._events);
      } else {
        allowScrollOnElement(elt, this._events);
      }
    } else {
      this._events.off(this._scrollableContent);
    }
    this._scrollableContent = elt;
  };

  private _onModalContextMenuClose = (): void => {
    this.setState({ isModalMenuOpen: false });
  };

  private _onModalClose = (): void => {
    this._lastSetX = 0;
    this._lastSetY = 0;

    this.setState({
      isModalMenuOpen: false,
      isInKeyboardMoveMode: false,
      isOpen: false,
      x: 0,
      y: 0,
    });

    if (this.props.dragOptions && this._hasRegisteredKeyUp) {
      this._events.off(window, 'keyup', this._onKeyUp, true /* useCapture */);
    }

    // Call the onDismiss callback
    if (this.props.onDismissed) {
      this.props.onDismissed();
    }
  };

  private _onDragStart = (): void => {
    this.setState({ isModalMenuOpen: false, isInKeyboardMoveMode: false });
  };

  private _onDrag = (_: React.MouseEvent<HTMLElement> & React.TouchEvent<HTMLElement>, ui: IDragData): void => {
    const { x, y } = this.state;
    this.setState(this._getClampedPosition({ x: x + ui.delta.x, y: y + ui.delta.y }));
  };

  private _onDragStop = (): void => {
    this.focus();
  };

  private _onKeyUp = (event: React.KeyboardEvent<HTMLElement>): void => {
    // Need to handle the CTRL + ALT + SPACE key during keyup due to FireFox bug:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
    // Otherwise it would continue to fire a click even if the event was cancelled
    // during mouseDown.
    if (event.altKey && event.ctrlKey && event.keyCode === KeyCodes.space) {
      // Since this is a global handler, we should make sure the target is within the dialog
      // before opening the dropdown
      if (elementContains(this._scrollableContent, event.target as HTMLElement)) {
        this.setState({ isModalMenuOpen: !this.state.isModalMenuOpen });
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // We need a global onKeyDown event when we are in the move mode so that we can
  // handle the key presses and the components inside the modal do not get the events
  private _onKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.altKey && event.ctrlKey && event.keyCode === KeyCodes.space) {
      // CTRL + ALT + SPACE is handled during keyUp
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.state.isModalMenuOpen && (event.altKey || event.keyCode === KeyCodes.escape)) {
      this.setState({ isModalMenuOpen: false });
    }

    if (this.state.isInKeyboardMoveMode && (event.keyCode === KeyCodes.escape || event.keyCode === KeyCodes.enter)) {
      this.setState({ isInKeyboardMoveMode: false });
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.state.isInKeyboardMoveMode) {
      let handledEvent = true;
      const delta = this._getMoveDelta(event);

      switch (event.keyCode) {
        /* eslint-disable no-fallthrough */
        case KeyCodes.escape:
          this.setState({ x: this._lastSetX, y: this._lastSetY });
        case KeyCodes.enter: {
          // TODO: determine if fallthrough was intentional
          /* eslint-enable no-fallthrough */
          this._lastSetX = 0;
          this._lastSetY = 0;
          this.setState({ isInKeyboardMoveMode: false });
          break;
        }
        case KeyCodes.up: {
          this.setState({
            y: this._getClampedPositionY(this.state.y - delta),
          });
          break;
        }
        case KeyCodes.down: {
          this.setState({
            y: this._getClampedPositionY(this.state.y + delta),
          });
          break;
        }
        case KeyCodes.left: {
          this.setState({
            x: this._getClampedPositionX(this.state.x - delta),
          });
          break;
        }
        case KeyCodes.right: {
          this.setState({
            x: this._getClampedPositionX(this.state.x + delta),
          });
          break;
        }
        default: {
          handledEvent = false;
        }
      }

      if (handledEvent) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  private _getMoveDelta(event: React.KeyboardEvent<HTMLElement>): number {
    let delta = 10;
    if (event.shiftKey) {
      if (!event.ctrlKey) {
        delta = 50;
      }
    } else if (event.ctrlKey) {
      delta = 1;
    }

    return delta;
  }

  private _onEnterKeyboardMoveMode = () => {
    this._lastSetX = this.state.x;
    this._lastSetY = this.state.y;
    this.setState({ isInKeyboardMoveMode: true, isModalMenuOpen: false });
    this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
  };

  private _onExitKeyboardMoveMode = () => {
    this._lastSetX = 0;
    this._lastSetY = 0;
    this.setState({ isInKeyboardMoveMode: false });
    this._events.off(window, 'keydown', this._onKeyDown, true /* useCapture */);
  };

  private _registerForKeyUp = (): void => {
    if (!this._hasRegisteredKeyUp) {
      this._events.on(window, 'keyup', this._onKeyUp, true /* useCapture */);
      this._hasRegisteredKeyUp = true;
    }
  };
}
