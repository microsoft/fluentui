import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { IDialogProps, DialogType } from './Dialog.Props';
import { Modal } from '../../Modal';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import * as stylesImport from './Dialog.scss';
const styles: any = stylesImport;

import { DialogContent } from './DialogContent';

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
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      isOpen,
      onDismiss,
      onDismissed,
      onLayerDidMount,
      onLayerMounted,
      responsiveMode,
      subText,
      title,
      type,
      contentClassName,
      topButtonsProps
    } = this.props;
    let { id } = this.state;

    const dialogClassName = css(this.props.className, {
      ['ms-Dialog--lgHeader ' + styles.isLargeHeader]: type === DialogType.largeHeader,
      ['ms-Dialog--close ' + styles.isClose]: type === DialogType.close,
    });
    const containerClassName = css(this.props.containerClassName, styles.main);

    return (
      <Modal
        className={ dialogClassName }
        containerClassName={ containerClassName }
        elementToFocusOnDismiss={ elementToFocusOnDismiss }
        firstFocusableSelector={ firstFocusableSelector }
        forceFocusInsideTrap={ forceFocusInsideTrap }
        ignoreExternalFocusing={ ignoreExternalFocusing }
        isBlocking={ isBlocking }
        isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap }
        isDarkOverlay={ isDarkOverlay }
        isOpen={ isOpen }
        onDismiss={ onDismiss }
        onDismissed={ onDismissed }
        onLayerDidMount={ onLayerDidMount }
        responsiveMode={ responsiveMode }
        subtitleAriaId={ subText && id + '-subText' }
        titleAriaId={ title && id + '-title' }
      >

        <DialogContent
          onDismiss={ onDismiss }
          showCloseButton={ !isBlocking && type !== DialogType.largeHeader }
          title={ title }
          subText={ subText }
          className={ contentClassName }
          topButtonsProps={ topButtonsProps }
        >
          { this.props.children }
        </DialogContent>

      </Modal>
    );
  }
}
