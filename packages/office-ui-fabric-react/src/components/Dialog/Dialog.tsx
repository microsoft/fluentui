import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { IDialogProps } from './Dialog.Props';
import { DialogType } from './DialogContent.Props';
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
      responsiveMode,
      subText,
      title,
      type,
      contentClassName,
      topButtonsProps,
      contentProps,
      modalProps
    } = this.props;
    let { id } = this.state;

    const containerClassName = css(this.props.containerClassName, styles.main);

    return (
      <Modal
        containerClassName={ containerClassName }
        elementToFocusOnDismiss={ elementToFocusOnDismiss }
        firstFocusableSelector={ firstFocusableSelector }
        forceFocusInsideTrap={ forceFocusInsideTrap }
        ignoreExternalFocusing={ ignoreExternalFocusing }
        isBlocking={ isBlocking }
        isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap }
        isDarkOverlay={ isDarkOverlay }
        isOpen={ isOpen }
        onDismissed={ onDismissed }
        onLayerDidMount={ onLayerDidMount }
        responsiveMode={ responsiveMode }
        { ...modalProps }
        onDismiss={ onDismiss } // pull from contentProps.onDismiss once onDismiss is deprecated
        subtitleAriaId={ subText && id + '-subText' }
        titleAriaId={ title && id + '-title' }
      >

        <DialogContent
          onDismiss={ onDismiss }
          showCloseButton={ !isBlocking }
          title={ title }
          subText={ subText }
          className={ contentClassName }
          topButtonsProps={ topButtonsProps }
          type={ type }
          {...contentProps}
        >
          { this.props.children }
        </DialogContent>

      </Modal>
    );
  }
}
