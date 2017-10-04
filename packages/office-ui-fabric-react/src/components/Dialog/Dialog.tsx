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

@withResponsiveMode
export class Dialog extends BaseComponent<IDialogProps, {}> {
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

  private _id: string;
  private _defaultTitleTextId: string;
  private _defaultSubTextId: string;

  constructor(props: IDialogProps) {
    super(props);

    this._id = getId('Dialog');
    this._defaultTitleTextId = this._id + '-title';
    this._defaultSubTextId = this._id + '-subText';

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
        isDarkOverlay={ isDarkOverlay !== undefined ? isDarkOverlay : modalProps!.isDarkOverlay }
        isBlocking={ isBlocking !== undefined ? isBlocking : modalProps!.isBlocking }
        isOpen={ isOpen !== undefined ? isOpen : !hidden }
        className={ css('ms-Dialog', className ? className : modalProps!.className) }
        containerClassName={ css(styles.main, containerClassName ? containerClassName : modalProps!.containerClassName) }
        onDismiss={ onDismiss ? onDismiss : modalProps!.onDismiss }
        subtitleAriaId={ this._getSubTextId() }
        titleAriaId={ this._getTitleTextId() }
      >
        <DialogContent
          titleId={ this._defaultTitleTextId }
          subTextId={ this._defaultSubTextId }
          title={ title }
          subText={ subText }
          showCloseButton={ isBlocking !== undefined ? !isBlocking : !modalProps!.isBlocking }
          topButtonsProps={ topButtonsProps ? topButtonsProps : dialogContentProps!.topButtonsProps }
          type={ type !== undefined ? type : dialogContentProps!.type }
          onDismiss={ onDismiss ? onDismiss : dialogContentProps!.onDismiss }
          className={ css(contentClassName ? contentClassName : dialogContentProps!.className) }
          { ...dialogContentProps }
        >
          { this.props.children }
        </DialogContent>
      </Modal>
    );
  }

  private _getSubTextId = (): string | undefined => {
    let { ariaDescribedById, modalProps, dialogContentProps, subText } = this.props;
    let id = ariaDescribedById || (modalProps && modalProps.subtitleAriaId);

    if (!id) {
      id = (subText || (dialogContentProps && dialogContentProps.subText)) && this._defaultSubTextId;
    }

    return id;
  }

  private _getTitleTextId = (): string | undefined => {
    let { ariaLabelledById, modalProps, dialogContentProps, title } = this.props;
    let id = ariaLabelledById || (modalProps && modalProps.titleAriaId);

    if (!id) {
      id = (title || (dialogContentProps && dialogContentProps.title)) && this._defaultTitleTextId;
    }

    return id;
  }
}
