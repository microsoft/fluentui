import * as React from 'react';
import { BaseComponent, classNamesFunction, getId } from '../../Utilities';
import { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { DialogType, IDialogContentProps } from './DialogContent.types';
import { Modal, IModalProps } from '../../Modal';
import { ILayerProps } from '../../Layer';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>();

import { DialogContent } from './DialogContent';

const DefaultModalProps: IModalProps = {
  isDarkOverlay: false,
  isBlocking: false,
  className: '',
  containerClassName: '',
  topOffsetFixed: false
};

const DefaultDialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  className: '',
  topButtonsProps: []
};

@withResponsiveMode
export class DialogBase extends BaseComponent<IDialogProps, {}> {
  public static defaultProps: IDialogProps = {
    hidden: true
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
      isOpen: 'hidden',
      type: 'dialogContentProps.type',
      subText: 'dialogContentProps.subText',
      contentClassName: 'dialogContentProps.className',
      topButtonsProps: 'dialogContentProps.topButtonsProps',
      className: 'modalProps.className',
      isDarkOverlay: 'modalProps.isDarkOverlay',
      isBlocking: 'modalProps.isBlocking',
      containerClassName: 'modalProps.containerClassName',
      onDismissed: 'modalProps.onDismissed',
      onLayerDidMount: 'modalProps.layerProps.onLayerDidMount',
      ariaDescribedById: 'modalProps.subtitleAriaId',
      ariaLabelledById: 'modalProps.titleAriaId'
    });
  }

  public render(): JSX.Element {
    const {
      className,
      containerClassName,
      contentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      styles,
      hidden,
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
      theme,
      title,
      topButtonsProps,
      type,
      minWidth,
      maxWidth,
      modalProps
    } = this.props;

    const mergedLayerProps: ILayerProps = {
      ...(modalProps ? modalProps.layerProps : { onLayerDidMount })
    };
    if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
      mergedLayerProps.onLayerDidMount = onLayerDidMount;
    }

    const mergedModalProps = {
      ...DefaultModalProps,
      ...modalProps,
      layerProps: mergedLayerProps
    };

    const dialogContentProps: IDialogContentProps = {
      ...DefaultDialogContentProps,
      ...this.props.dialogContentProps
    };

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className: className || mergedModalProps.className,
      containerClassName: containerClassName || mergedModalProps.containerClassName,
      hidden,
      dialogDefaultMinWidth: minWidth,
      dialogDefaultMaxWidth: maxWidth
    });

    return (
      <Modal
        elementToFocusOnDismiss={elementToFocusOnDismiss}
        firstFocusableSelector={firstFocusableSelector}
        forceFocusInsideTrap={forceFocusInsideTrap}
        ignoreExternalFocusing={ignoreExternalFocusing}
        isClickableOutsideFocusTrap={isClickableOutsideFocusTrap}
        onDismissed={onDismissed}
        responsiveMode={responsiveMode}
        {...mergedModalProps}
        isDarkOverlay={isDarkOverlay !== undefined ? isDarkOverlay : mergedModalProps.isDarkOverlay}
        isBlocking={isBlocking !== undefined ? isBlocking : mergedModalProps.isBlocking}
        isOpen={isOpen !== undefined ? isOpen : !hidden}
        className={classNames.root}
        containerClassName={classNames.main}
        onDismiss={onDismiss ? onDismiss : mergedModalProps.onDismiss}
        subtitleAriaId={this._getSubTextId()}
        titleAriaId={this._getTitleTextId()}
      >
        <DialogContent
          titleId={this._defaultTitleTextId}
          subTextId={this._defaultSubTextId}
          title={title}
          subText={subText}
          showCloseButton={isBlocking !== undefined ? !isBlocking : !mergedModalProps.isBlocking}
          topButtonsProps={topButtonsProps ? topButtonsProps : dialogContentProps!.topButtonsProps}
          type={type !== undefined ? type : dialogContentProps!.type}
          onDismiss={onDismiss ? onDismiss : dialogContentProps!.onDismiss}
          className={contentClassName || dialogContentProps!.className}
          {...dialogContentProps}
        >
          {this.props.children}
        </DialogContent>
      </Modal>
    );
  }

  private _getSubTextId = (): string | undefined => {
    const { ariaDescribedById, modalProps, dialogContentProps, subText } = this.props;
    let id = ariaDescribedById || (modalProps && modalProps.subtitleAriaId);

    if (!id) {
      id = (subText || (dialogContentProps && dialogContentProps.subText)) && this._defaultSubTextId;
    }

    return id;
  };

  private _getTitleTextId = (): string | undefined => {
    const { ariaLabelledById, modalProps, dialogContentProps, title } = this.props;
    let id = ariaLabelledById || (modalProps && modalProps.titleAriaId);

    if (!id) {
      id = (title || (dialogContentProps && dialogContentProps.title)) && this._defaultTitleTextId;
    }

    return id;
  };
}
