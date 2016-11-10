import * as React from 'react';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IDialogProps, DialogType } from './Dialog.Props';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Button, ButtonType } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { css } from '../../utilities/css';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { getId } from '../../utilities/object';
import { BaseComponent } from '../../common/BaseComponent';
import './Dialog.scss';

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

export interface IDialogState {
  isOpen?: boolean;
  isAnimatingOpen?: boolean;
  isAnimatingClose?: boolean;
  id?: string;
}

@withResponsiveMode
export class Dialog extends BaseComponent<IDialogProps, IDialogState> {

  public static defaultProps: IDialogProps = {
    isOpen: false,
    type: DialogType.normal,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: '',
    contentClassName: ''
  };

  constructor(props: IDialogProps) {
    super(props);

    this._onDialogRef = this._onDialogRef.bind(this);

    this.state = {
      id: getId('Dialog'),
      isAnimatingOpen: props.isOpen,
      isAnimatingClose: false
    };
  }

  public componentDidMount() {
    if (this.state.isOpen) {
      this._async.setTimeout(() => {
        this.setState({
          isAnimatingOpen: false
        });
      }, 2000);
    }
  }

  public componentWillReceiveProps(newProps: IDialogProps) {
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
    let { type, isDarkOverlay, onDismiss, title, subText, isBlocking, responsiveMode, elementToFocusOnDismiss, ignoreExternalFocusing, forceFocusInsideTrap, firstFocusableSelector, closeButtonAriaLabel, onLayerMounted, isClickableOutsideFocusTrap} = this.props;
    let { id, isOpen, isAnimatingOpen, isAnimatingClose } = this.state;
    // @TODO - the discussion on whether the Dialog contain a property for rendering itself is still being discussed
    if (!isOpen) {
      return null;
    }

    let subTextContent;
    const dialogClassName = css('ms-Dialog', this.props.className, {
      'ms-Dialog--lgHeader': type === DialogType.largeHeader,
      'ms-Dialog--close': type === DialogType.close,
      'is-open': isOpen,
      'is-animatingOpen': isAnimatingOpen,
      'is-animatingClose': isAnimatingClose
    });
    let groupings = this._groupChildren();

    if (subText) {
      subTextContent = <p className='ms-Dialog-subText' id={ id + '-subText' }>{ subText }</p>;
    }

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode >= ResponsiveMode.small) {
      return (
        <Layer onLayerMounted={ onLayerMounted }>
          <Popup
            role='dialog'
            ariaLabelledBy={ title ? id + '-title' : '' }
            ariaDescribedBy={ subText ? id + '-subText' : '' }
            onDismiss={ onDismiss }
            >
            <div
              className={ dialogClassName }
              ref={ this._onDialogRef }>
              <Overlay isDarkThemed={ isDarkOverlay } onClick={ isBlocking ? null : onDismiss } />
              <FocusTrapZone
                className={ css('ms-Dialog-main', this.props.containerClassName) }
                elementToFocusOnDismiss={ elementToFocusOnDismiss }
                isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking }
                ignoreExternalFocusing={ ignoreExternalFocusing }
                forceFocusInsideTrap={ forceFocusInsideTrap }
                firstFocusableSelector={ firstFocusableSelector }>
                <div className='ms-Dialog-header'>
                  <p className='ms-Dialog-title' id={ id + '-title' }>{ title }</p>
                  <div className='ms-Dialog-topButton'>
                    <Button
                      className='ms-Dialog-button ms-Dialog-button--close'
                      buttonType={ ButtonType.icon }
                      icon='Cancel'
                      rootProps={ { title: closeButtonAriaLabel } }
                      ariaLabel={ closeButtonAriaLabel }
                      onClick={ onDismiss }
                      />
                  </div>
                </div>
                <div className='ms-Dialog-inner'>
                  <div className={ css('ms-Dialog-content', this.props.contentClassName) }>
                    { subTextContent }
                    { groupings.contents }
                  </div>
                  { groupings.footers }
                </div>
              </FocusTrapZone>
            </div>
          </Popup>
        </Layer>
      );
    }
  }

  // @TODO - typing the footers as an array of DialogFooter is difficult because
  // casing "child as DialogFooter" causes a problem because
  // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
  private _groupChildren(): { footers: any[]; contents: any[]; } {

    let groupings: { footers: any[]; contents: any[]; } = {
      footers: [],
      contents: []
    };

    React.Children.map(this.props.children, child => {
      if (typeof child === 'object' && child !== null && child.type === DialogFooter) {
        groupings.footers.push(child);
      } else {
        groupings.contents.push(child);
      }
    });

    return groupings;
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
    if (ev.animationName.indexOf('fadeIn') > -1) {
      this.setState({
        isOpen: true,
        isAnimatingOpen: false
      });
    }
    if (ev.animationName.indexOf('fadeOut') > -1) {
      this.setState({
        isOpen: false,
        isAnimatingClose: false
      });

      // Dialog has closed, call the onDismiss callback
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }
}
