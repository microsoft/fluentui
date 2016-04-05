import * as React from 'react';
import './Dialog.scss';
import Overlay from '../Overlay/Overlay';
import Layer from '../Layer/Layer';
import { DialogFooter } from './DialogFooter';
import { DialogType } from './interfaces';
import { IDialogProps } from './Dialog.Props';
import { css } from '../../utilities/css';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

// @TODO - need to add animations, pending Fabric Team + Coulton work
// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)
// @TODO - use the layer component by thomas michon to project the dialog to the end of the DOM

@withResponsiveMode
export default class Dialog extends React.Component<IDialogProps, any> {
  public static defaultProps: IDialogProps = {
    isOpen: false,
    type: DialogType.normal,
    isBlocking: false
  };

  public render() {
    let { isOpen, type, onDismiss, title, subText, isBlocking, responsiveMode } = this.props;
    let subTextContent;
    const dialogClassName = css('ms-Dialog', {
      'ms-Dialog--lgHeader': type === DialogType.largeHeader,
      'ms-Dialog--close': type === DialogType.close
    });

    if (!isOpen) {
      return null;
    }

    if (subText) {
      subTextContent = <p className='ms-Dialog-subText'>{ subText }</p>;
    }

    // @temp tuatology - Will adjust this to be a panel at certain breakpoints
    if (responsiveMode >= ResponsiveMode.small) {
      return (
        <Layer>
          <div className={ dialogClassName }>
            <Overlay isDarkThemed={ !isBlocking } onClick={ isBlocking ? null : onDismiss}/>
            <div className='ms-Dialog-main'>
              <button className='ms-Dialog-button ms-Dialog-button--close' onClick={ onDismiss }>
                <i className='ms-Icon ms-Icon--x'></i>
              </button>
              <div className='ms-Dialog-header'>
                <p className='ms-Dialog-title'>{ title }</p>
              </div>
              <div className='ms-Dialog-inner'>
                <div className='ms-Dialog-content'>
                  { subTextContent }
                  { this._renderChildrenContent() }
                </div>
                { this._renderChildrenButtons() }
              </div>
            </div>
          </div>
        </Layer>
      );
    }
  }

  private _renderChildrenContent() {
    return React.Children.map(this.props.children, child => (child instanceof DialogFooter ? null : child));
  }

  private _renderChildrenButtons() {
    return React.Children.map(this.props.children, child => (child instanceof DialogFooter ? child : null));
  }
};
