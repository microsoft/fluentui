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
import './Dialog.scss';

// @TODO - need to add animations, pending Fabric Team + Coulton work
// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

@withResponsiveMode
export class Dialog extends React.Component<IDialogProps, any> {

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

    this.state = {
      id: getId('Dialog'),
    };
  }

  public render() {
    let { isOpen, type, isDarkOverlay, onDismiss, title, subText, isBlocking, responsiveMode, elementToFocusOnDismiss, ignoreExternalFocusing, forceFocusInsideTrap, firstFocusableSelector, closeButtonAriaLabel, onLayerMounted } = this.props;
    let { id } = this.state;
    // @TODO - the discussion on whether the Dialog contain a property for rendering itself is still being discussed
    if (!isOpen) {
      return null;
    }

    let subTextContent;
    const dialogClassName = css('ms-Dialog', this.props.className, {
      'ms-Dialog--lgHeader': type === DialogType.largeHeader,
      'ms-Dialog--close': type === DialogType.close
    });
    let groupings = this._groupChildren();

    if (subText) {
      subTextContent = <p className='ms-Dialog-subText' id={ id + '-subText'}>{ subText }</p>;
    }

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode >= ResponsiveMode.small) {
      return (
        <Layer onLayerMounted={ onLayerMounted }>
          <Popup
            className= { dialogClassName }
            role='dialog'
            ariaLabelledBy={ title ? id + '-title' : '' }
            ariaDescribedBy={ subText ? id + '-subText' : '' }
            onDismiss={ onDismiss }
            >
              <Overlay isDarkThemed={ isDarkOverlay } onClick={ isBlocking ? null : onDismiss } />
              <FocusTrapZone
                className={ css('ms-Dialog-main', this.props.containerClassName) }
                elementToFocusOnDismiss={ elementToFocusOnDismiss }
                isClickableOutsideFocusTrap={ !isBlocking }
                ignoreExternalFocusing={ ignoreExternalFocusing }
                forceFocusInsideTrap={ forceFocusInsideTrap }
                firstFocusableSelector={ firstFocusableSelector }>
                <div className='ms-Dialog-header'>
                  <p className='ms-Dialog-title' id={ id + '-title'}>{ title }</p>
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
}
