import * as React from 'react';
import { BaseComponent, classNamesFunction, getId, createRef } from '../../Utilities';
import { FocusTrapZone, IFocusTrapZone } from '../FocusTrapZone/index';
import { animationDuration, getOverlayStyles } from './Modal.styles';
import { IModalProps, IModalStyleProps, IModalStyles, IModal } from './Modal.types';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

export interface IDialogState {
  isOpen?: boolean;
  isVisible?: boolean;
  isVisibleClose?: boolean;
  id?: string;
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
  private _focusTrapZone = createRef<IFocusTrapZone>();

  constructor(props: IModalProps) {
    super(props);
    this.state = {
      id: getId('Modal'),
      isOpen: props.isOpen,
      isVisible: props.isOpen
    };
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
        // Reopen during closing
        this.setState({
          isVisible: true
        });
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
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      onLayerDidMount,
      responsiveMode,
      titleAriaId,
      styles,
      subtitleAriaId,
      theme
    } = this.props;
    const { isOpen, isVisible } = this.state;

    if (!isOpen) {
      return null;
    }

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      containerClassName,
      isOpen,
      isVisible
    });

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode! >= ResponsiveMode.small) {
      return (
        <Layer onLayerDidMount={onLayerDidMount}>
          <Popup
            role={isBlocking ? 'alertdialog' : 'dialog'}
            ariaLabelledBy={titleAriaId}
            ariaDescribedBy={subtitleAriaId}
            onDismiss={onDismiss}
          >
            <div className={classNames.root}>
              <Overlay
                isDarkThemed={isDarkOverlay}
                onClick={isBlocking ? undefined : (onDismiss as any)}
                styles={getOverlayStyles}
              />
              <FocusTrapZone
                componentRef={this._focusTrapZone}
                className={classNames.main}
                elementToFocusOnDismiss={elementToFocusOnDismiss}
                isClickableOutsideFocusTrap={isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking}
                ignoreExternalFocusing={ignoreExternalFocusing}
                forceFocusInsideTrap={forceFocusInsideTrap}
                firstFocusableSelector={firstFocusableSelector}
              >
                {this.props.children}
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
