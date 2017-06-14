import * as React from 'react';
import {
  autobind,
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
    modalProps: {},
    dialogContentProps: {},
    // deprecated props
    isOpen: false,
    type: DialogType.normal,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: '',
    contentClassName: '',
    topButtonsProps: [],
  };

  constructor(props: IDialogProps) {
    super(props);

    this.state = {
      id: getId('Dialog'),
    };

    this._warnDeprecations({
      'isOpen': 'hidden',
      'type': 'dialogContentProps.type',
      'subText': 'dialogContentProps.subText',
      'contentClassName': 'dialogContentProps.className',
      'topButtonsProps': 'dialogContentProps.topButtonsProps',
      'className': 'modalProps.className',
      'isDarkOverlay': 'modalProps.isDarkOverlay',
      'isBlocking': 'modalProps.isBlocking',
      'containerClassName': 'modalProps.containerClassName',
      'onDismissed': 'modalProps.onDismissed',
      'onLayerDidMount': 'modalProps.onLayerDidMount',
      'ariaDescribedById': 'modalProps.subtitleAriaId',
      'ariaLabelledById': 'modalProps.titleAriaId'
    });
  }

  public render() {
    let {
      ariaDescribedById,
      ariaLabelledById,
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
      topButtonsProps,
      dialogContentProps,
      modalProps,
      containerClassName,
      hidden
    } = this.props;
    let { id } = this.state;

    return (
      <Modal
        elementToFocusOnDismiss={ elementToFocusOnDismiss }
        firstFocusableSelector={ firstFocusableSelector }
        forceFocusInsideTrap={ forceFocusInsideTrap }
        ignoreExternalFocusing={ ignoreExternalFocusing }
        isBlocking={ isBlocking }
        isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap }
        isDarkOverlay={ isDarkOverlay }
        isOpen={ hidden !== undefined ? !hidden : isOpen }
        onDismissed={ onDismissed }
        onLayerDidMount={ onLayerDidMount }
        responsiveMode={ responsiveMode }
        { ...modalProps }
        className={ css('ms-Dialog', modalProps.className) }
        containerClassName={ css(containerClassName, styles.main, modalProps.containerClassName) }
        onDismiss={ modalProps.onDismiss || onDismiss }
        subtitleAriaId={ this._getAriaLabelId(modalProps.subtitleAriaId ? modalProps.subtitleAriaId : ariaDescribedById, subText, id + '-subText') }
        titleAriaId={ this._getAriaLabelId(modalProps.titleAriaId ? modalProps.titleAriaId : ariaLabelledById, title, id + '-title') }
      >
        <DialogContent
          showCloseButton={ !isBlocking }
          title={ title }
          subText={ subText }
          topButtonsProps={ topButtonsProps }
          type={ type }
          {...dialogContentProps}
          onDismiss={ dialogContentProps.onDismiss || onDismiss }
          className={ css(contentClassName, dialogContentProps.className) }
        >
          { this.props.children }
        </DialogContent>

      </Modal>
    );
  }

  @autobind
  private _getAriaLabelId(ariaId: string, text: string, alternativeId: string): string {
    return ariaId || text && alternativeId;
  }
}
