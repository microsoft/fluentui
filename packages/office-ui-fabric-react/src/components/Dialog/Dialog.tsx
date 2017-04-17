import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { IDialogProps, DialogType } from './Dialog.Props';
import { DialogHost } from '../DialogHost/DialogHost'; // TODO: Reference index file
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Button, ButtonType } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import styles = require('./Dialog.scss');

// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

export interface IDialogState {
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
    contentClassName: '',
    topButtonsProps: []
  };

  constructor(props: IDialogProps) {
    super(props);

    this.state = {
      id: getId('Dialog'),
    };
  }

  public render() {
    let {
      closeButtonAriaLabel,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      onDismiss,
      onLayerDidMount,
      onLayerMounted,
      responsiveMode,
      subText,
      title,
      type,
      isOpen,
    } = this.props;
    let { id } = this.state;

    let subTextContent;
    const dialogClassName = css(this.props.className, {
      ['ms-Dialog--lgHeader ' + styles.isLargeHeader]: type === DialogType.largeHeader,
      ['ms-Dialog--close ' + styles.isClose]: type === DialogType.close,
    });
    const containerClassName = css(this.props.containerClassName, styles.main);
    let groupings = this._groupChildren();

    if (subText) {
      subTextContent = <p className={ css('ms-Dialog-subText', styles.subText) } id={ id + '-subText' }>{ subText }</p>;
    }

    return (
      <DialogHost
        elementToFocusOnDismiss={ elementToFocusOnDismiss }
        firstFocusableSelector={ firstFocusableSelector }
        forceFocusInsideTrap={ forceFocusInsideTrap }
        ignoreExternalFocusing={ ignoreExternalFocusing }
        isBlocking={ isBlocking }
        isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap }
        isDarkOverlay={ isDarkOverlay }
        onDismiss={ onDismiss }
        onLayerDidMount={ onLayerDidMount }
        responsiveMode={ responsiveMode }
        className={ dialogClassName }
        isOpen={ isOpen }
        titleAriaId={ title && id + '-title' }
        subtitleAriaId={ subText && id + '-subText' }
        containerClassName={ containerClassName }
      >


        <div className={ css('ms-Dialog-header', styles.header) }>
          <p className={ css('ms-Dialog-title', styles.title) } id={ id + '-title' } role='heading'>{ title }</p>
          <div className={ css('ms-Dialog-topButton', styles.topButton) }>
            { this.props.topButtonsProps.map((props) => (
              <Button {...props} />
            )) }
            <Button
              className={ css('ms-Dialog-button ms-Dialog-button--close',
                styles.button,
                { [styles.isClose]: isBlocking || type === DialogType.largeHeader }) }
              buttonType={ ButtonType.icon }
              icon='Cancel'
              ariaLabel={ closeButtonAriaLabel }
              onClick={ onDismiss }
            />
          </div>
        </div>
        <div className={ css('ms-Dialog-inner', styles.inner) }>
          <div className={ css('ms-Dialog-content', styles.content, this.props.contentClassName) }>
            { subTextContent }
            { groupings.contents }
          </div>
          { groupings.footers }
        </div>

      </DialogHost>
    );
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
