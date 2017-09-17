import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { FocusTrapZone, IFocusTrapZone } from '../FocusTrapZone/index';
import { IModalProps, IModal } from './Modal.Props';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import * as stylesImport from './Modal.scss';
const styles: any = stylesImport;

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

export interface IDialogState {
  isOpen?: boolean;
  isVisible?: boolean;
  isVisibleClose?: boolean;
  id?: string;
}

@withResponsiveMode
export class Modal extends BaseComponent<IModalProps, IDialogState> implements IModal {

  public static defaultProps: IModalProps = {
    isOpen: false,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: '',
  };

  private _onModalCloseTimer: number;
  private focusTrapZone: IFocusTrapZone | undefined;

  constructor(props: IModalProps) {
    super(props);
    this.state = {
      id: getId('Modal'),
      isOpen: props.isOpen,
      isVisible: props.isOpen,
    };
  }

  public componentWillReceiveProps(newProps: IModalProps) {
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
      this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(styles.duration) * 1000);
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
    let {
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
      subtitleAriaId,
    } = this.props;
    let { isOpen, isVisible } = this.state;

    const modalClassName = css(
      'ms-Modal',
      styles.root,
      this.props.className,
      !!isOpen && 'is-open',
      !!isVisible && styles.rootIsVisible
    );

    if (!isOpen) {
      return null;
    }

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode! >= ResponsiveMode.small) {
      return (
        <Layer onLayerDidMount={ onLayerDidMount }>
          <Popup
            role={ isBlocking ? 'alertdialog' : 'dialog' }
            ariaLabelledBy={ titleAriaId }
            ariaDescribedBy={ subtitleAriaId }
            onDismiss={ onDismiss }
          >
            <div className={ modalClassName }>
              <Overlay isDarkThemed={ isDarkOverlay } onClick={ isBlocking ? undefined : (onDismiss as any) } />
              <FocusTrapZone
                componentRef={ ref => this.focusTrapZone = ref }
                className={ css('ms-Dialog-main', styles.main, this.props.containerClassName) }
                elementToFocusOnDismiss={ elementToFocusOnDismiss }
                isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking }
                ignoreExternalFocusing={ ignoreExternalFocusing }
                forceFocusInsideTrap={ forceFocusInsideTrap }
                firstFocusableSelector={ firstFocusableSelector }
              >
                { this.props.children }
              </FocusTrapZone>
            </div>
          </Popup>
        </Layer>
      );
    }
    return null;
  }

  public focus() {
    this.focusTrapZone && this.focusTrapZone.focus();
  }

  // Watch for completed animations and set the state
  private _onModalClose() {
    this.setState({
      isOpen: false
    });

    // Call the onDismiss callback
    if (this.props.onDismissed) {
      this.props.onDismissed();
    }
  }
}
