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
    modalProps: {
      isDarkOverlay: true,
      isBlocking: false,
      className: '',
      containerClassName: ''
    },
    dialogContentProps: {
      type: DialogType.normal,
      className: '',
      topButtonsProps: [],
    },
    hidden: true,
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
      className,
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
        isClickableOutsideFocusTrap={ isClickableOutsideFocusTrap }
        onDismissed={ onDismissed }
        onLayerDidMount={ onLayerDidMount }
        responsiveMode={ responsiveMode }
        { ...modalProps }
        isDarkOverlay={ isDarkOverlay !== undefined ? isDarkOverlay : modalProps.isDarkOverlay }
        isBlocking={ isBlocking !== undefined ? isBlocking : modalProps.isBlocking }
        isOpen={ isOpen !== undefined ? isOpen : !hidden }
        className={ css('ms-Dialog', className ? className : modalProps.className) }
        containerClassName={ css(styles.main, containerClassName ? containerClassName : modalProps.containerClassName) }
        onDismiss={ onDismiss ? onDismiss : modalProps.onDismiss }
        subtitleAriaId={
          this._getAriaLabelId(
            ariaDescribedById ? ariaDescribedById : modalProps.subtitleAriaId,
            subText ? subText : modalProps.subtitleAriaId,
            id + '-subText'
          )
        }
        titleAriaId={
          this._getAriaLabelId(
            modalProps.titleAriaId ? modalProps.titleAriaId : ariaLabelledById,
            title ? title : modalProps.titleAriaId,
            id + '-title') }
      >
        <DialogContent
          title={ title }
          subText={ subText }
          showCloseButton={ isBlocking !== undefined ? !isBlocking : !modalProps.isBlocking }
          topButtonsProps={ topButtonsProps ? topButtonsProps : dialogContentProps.topButtonsProps }
          type={ type !== undefined ? type : dialogContentProps.type }
          onDismiss={ onDismiss ? onDismiss : dialogContentProps.onDismiss }
          className={ css(contentClassName ? contentClassName : dialogContentProps.className) }
          { ...dialogContentProps }
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
