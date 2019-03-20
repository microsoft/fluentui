import * as React from 'react';
import { BaseComponent, classNamesFunction, getId, allowScrollOnElement } from '../../Utilities';
import { FocusTrapZone, IFocusTrapZone } from '../FocusTrapZone/index';
import { animationDuration } from './Modal.styles';
import { IModalProps, IModalStyleProps, IModalStyles, IModal } from './Modal.types';
import { Overlay } from '../../Overlay';
import { ILayerProps, Layer } from '../../Layer';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

const DefaultLayerProps: ILayerProps = {
  eventBubblingEnabled: false
};

export interface IDialogState {
  isOpen?: boolean;
  isVisible?: boolean;
  isVisibleClose?: boolean;
  id?: string;
  hasBeenOpened?: boolean;
  modalRectangleTop?: number;
}

const getClassNames = classNamesFunction<IModalStyleProps, IModalStyles>();

@withResponsiveMode
export class ModalBase extends BaseComponent<IModalProps, IDialogState> implements IModal {
  public static defaultProps: IModalProps = {
    isOpen: false,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: ''
  };

  private _onModalCloseTimer: number;
  private _focusTrapZone = React.createRef<IFocusTrapZone>();
  private _scrollableContent: HTMLDivElement | null;

  constructor(props: IModalProps) {
    super(props);
    this.state = {
      id: getId('Modal'),
      isOpen: props.isOpen,
      isVisible: props.isOpen,
      hasBeenOpened: props.isOpen
    };

    this._warnDeprecations({
      onLayerDidMount: 'layerProps.onLayerDidMount'
    });
  }

  public componentWillReceiveProps(newProps: IModalProps): void {
    clearTimeout(this._onModalCloseTimer);

    // Opening the dialog
    if (newProps.isOpen) {
      if (!this.state.isOpen) {
        // First Open
        this.setState({
          isOpen: true
        });
      } else {
        // Modal has been opened
        // Reopen during closing
        this.setState({
          hasBeenOpened: true,
          isVisible: true
        });

        if (newProps.topOffsetFixed) {
          const dialogMain = document.getElementsByClassName('ms-Dialog-main');
          let modalRectangle;
          if (dialogMain.length > 0) {
            modalRectangle = dialogMain[0].getBoundingClientRect();
            this.setState({
              modalRectangleTop: modalRectangle.top
            });
          }
        }
      }
    }

    // Closing the dialog
    if (!newProps.isOpen && this.state.isOpen) {
      this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(animationDuration) * 1000);
      this.setState({
        isVisible: false
      });
    }
  }

  public componentDidUpdate(prevProps: IModalProps, prevState: IDialogState) {
    if (!prevProps.isOpen && !prevState.isVisible) {
      this.setState({
        isVisible: true
      });
    }
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
      responsiveMode,
      titleAriaId,
      styles,
      subtitleAriaId,
      theme,
      topOffsetFixed,
      onLayerDidMount,
      isModeless
    } = this.props;
    const { isOpen, isVisible, hasBeenOpened, modalRectangleTop } = this.state;

    if (!isOpen) {
      return null;
    }

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
      isModeless
    });

    // if the modal is modeless, add the classname to correctly style the layer
    const layerClassName = isModeless
      ? this.props.className
        ? `${this.props.className} ${classNames.layer}`
        : classNames.layer
      : this.props.className;

    const mergedLayerProps = {
      ...DefaultLayerProps,
      ...this.props.layerProps,
      onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount,
      className: layerClassName,
      insertFirst: isModeless
    };

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode! >= ResponsiveMode.small) {
      return (
        <Layer {...mergedLayerProps}>
          <Popup
            role={isModeless || !isBlocking ? 'dialog' : 'alertdialog'}
            aria-modal={!isModeless}
            ariaLabelledBy={titleAriaId}
            ariaDescribedBy={subtitleAriaId}
            onDismiss={onDismiss}
          >
            <div className={classNames.root}>
              {!isModeless && <Overlay isDarkThemed={isDarkOverlay} onClick={isBlocking ? undefined : (onDismiss as any)} />}
              <FocusTrapZone
                componentRef={this._focusTrapZone}
                className={classNames.main}
                elementToFocusOnDismiss={elementToFocusOnDismiss}
                isClickableOutsideFocusTrap={isModeless || isClickableOutsideFocusTrap || !isBlocking}
                ignoreExternalFocusing={ignoreExternalFocusing}
                forceFocusInsideTrap={isModeless ? !isModeless : forceFocusInsideTrap}
                firstFocusableSelector={firstFocusableSelector}
              >
                <div ref={this._allowScrollOnModal} className={classNames.scrollableContent} data-is-scrollable={true}>
                  {this.props.children}
                </div>
              </FocusTrapZone>
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

  // Allow the user to scroll within the modal but not on the body
  private _allowScrollOnModal = (elt: HTMLDivElement | null): void => {
    if (elt) {
      allowScrollOnElement(elt, this._events);
    } else {
      this._events.off(this._scrollableContent);
    }
    this._scrollableContent = elt;
  };

  // Watch for completed animations and set the state
  private _onModalClose(): void {
    this.setState({
      isOpen: false
    });

    // Call the onDismiss callback
    if (this.props.onDismissed) {
      this.props.onDismissed();
    }
  }
}
