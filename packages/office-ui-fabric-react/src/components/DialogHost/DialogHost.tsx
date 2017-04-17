import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IDialogHostProps } from './DialogHost.Props';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Button, ButtonType } from '../../Button';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import styles = require('./DialogHost.scss');

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

export interface IDialogState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

@withResponsiveMode
export class DialogHost extends BaseComponent<IDialogHostProps, IDialogState> {

  public static defaultProps: IDialogHostProps = {
    isOpen: false,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: '',
  };

  constructor(props: IDialogHostProps) {
    super(props);

    this._onDialogRef = this._onDialogRef.bind(this);

    this.state = {
      id: getId('DialogHost'),
      isOpen: props.isOpen,
      isAnimatingOpen: props.isOpen,
      isAnimatingClose: false
    };
  }

  public componentWillReceiveProps(newProps: IDialogHostProps) {
    // Opening the dialog
    if (newProps.isOpen && !this.state.isOpen) {
      this.setState({
        isOpen: true,
        isAnimatingOpen: true,
        isAnimatingClose: false
      });
    }

    // Closing the dialog
    if (!newProps.isOpen && this.state.isOpen) {
      this.setState({
        isAnimatingOpen: false,
        isAnimatingClose: true
      });
    }
  }

  public render() {
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
    let { id, isOpen, isAnimatingOpen, isAnimatingClose } = this.state;
    // @TODO - the discussion on whether the DialogHost contain a property for rendering itself is still being discussed
    if (!isOpen) {
      return null;
    }

    let subTextContent;
    const dialogClassName = css('ms-DialogHost', styles.root, this.props.className, {
      ['is-open ' + styles.isOpen]: isOpen,
      'ms-u-fadeIn200': isAnimatingOpen,
      'ms-u-fadeOut200': isAnimatingClose
    });

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode >= ResponsiveMode.small) {
      return (
        <Layer onLayerDidMount={ onLayerDidMount }>
          <Popup
            role={ isBlocking ? 'alertdialog' : 'dialog' }
            ariaLabelledBy={ titleAriaId }
            ariaDescribedBy={ subtitleAriaId }
            onDismiss={ onDismiss }
          >
            <div
              className={ dialogClassName }
              ref={ this._onDialogRef }>
              <Overlay isDarkThemed={ isDarkOverlay } onClick={ isBlocking ? null : onDismiss } />
              <FocusTrapZone
                className={ css('ms-DialogHost-main', styles.main, this.props.containerClassName) }
                elementToFocusOnDismiss={ elementToFocusOnDismiss }
                isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking }
                ignoreExternalFocusing={ ignoreExternalFocusing }
                forceFocusInsideTrap={ forceFocusInsideTrap }
                firstFocusableSelector={ firstFocusableSelector }>
                { this.props.children }
              </FocusTrapZone>
            </div>
          </Popup>
        </Layer>
      );
    }
  }

  private _onDialogRef(ref: HTMLDivElement) {
    if (ref) {
      this._events.on(ref, 'animationend', this._onAnimationEnd);
    } else {
      this._events.off();
    }
  }

  // Watch for completed animations and set the state
  private _onAnimationEnd(ev: AnimationEvent) {

    // The dialog has just opened (faded in)
    if (ev.animationName.indexOf('fadeIn') > -1) {
      this.setState({
        isOpen: true,
        isAnimatingOpen: false
      });
    }

    // The dialog has just closed (faded out)
    if (ev.animationName.indexOf('fadeOut') > -1) {
      this.setState({
        isOpen: false,
        isAnimatingClose: false
      });

      // Call the onDismiss callback
      if (this.props.onDismissed) {
        this.props.onDismissed();
      }
    }
  }
}
