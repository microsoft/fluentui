import * as React from 'react';
import { warnDeprecations, classNamesFunction, getId } from '../../Utilities';
import { DialogType } from './DialogContent.types';
import { Modal } from '../../Modal';
import { withResponsiveMode } from '../../ResponsiveMode';

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>();

import { DialogContent } from './DialogContent';
import type { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';
import type { IDialogContentProps } from './DialogContent.types';
import type { IModalProps } from '../../Modal';
import type { ILayerProps } from '../../Layer';

const DefaultModalProps: IModalProps = {
  isDarkOverlay: false,
  isBlocking: false,
  className: '',
  containerClassName: '',
  topOffsetFixed: false,
  enableAriaHiddenSiblings: true,
};

const DefaultDialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  className: '',
  topButtonsProps: [],
};

// eslint-disable-next-line deprecation/deprecation
@withResponsiveMode
export class DialogBase extends React.Component<IDialogProps, {}> {
  public static defaultProps: IDialogProps = {
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

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('Dialog', props, {
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
        ariaLabelledById: 'modalProps.titleAriaId',
      });
    }
  }

  public render(): JSX.Element {
    const props = this.props;
    const {
      /* eslint-disable deprecation/deprecation */
      className,
      containerClassName,
      contentClassName,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      styles,
      hidden,
      disableRestoreFocus = props.ignoreExternalFocusing,
      isBlocking,
      isClickableOutsideFocusTrap,
      isDarkOverlay,
      isOpen = !hidden,
      onDismiss,
      onDismissed,
      onLayerDidMount,
      responsiveMode,
      subText,
      theme,
      title,
      topButtonsProps,
      type,
      /* eslint-enable deprecation/deprecation */
      minWidth,
      maxWidth,
      modalProps,
    } = props;

    const mergedLayerProps: ILayerProps = {
      onLayerDidMount,
      ...modalProps?.layerProps,
    };

    let dialogDraggableClassName: string | undefined;
    let dragOptions: IModalProps['dragOptions'];

    // If dragOptions are provided, but no drag handle is specified, we supply a drag handle,
    // and inform dialog contents to add class to draggable class to the header
    if (modalProps?.dragOptions && !modalProps.dragOptions?.dragHandleSelector) {
      // spread options to avoid mutating props
      dragOptions = { ...modalProps.dragOptions };
      dialogDraggableClassName = 'ms-Dialog-draggable-header';
      dragOptions.dragHandleSelector = `.${dialogDraggableClassName}`;
    }

    const mergedModalProps: IModalProps = {
      ...DefaultModalProps,
      elementToFocusOnDismiss,
      firstFocusableSelector,
      forceFocusInsideTrap,
      disableRestoreFocus,
      isClickableOutsideFocusTrap,
      responsiveMode,
      className,
      containerClassName,
      isBlocking,
      isDarkOverlay,
      onDismissed,
      ...modalProps,
      dragOptions,
      layerProps: mergedLayerProps,
      isOpen,
    };

    const dialogContentProps: IDialogContentProps = {
      className: contentClassName,
      subText,
      title,
      topButtonsProps,
      type,
      ...DefaultDialogContentProps,
      ...props.dialogContentProps,
      draggableHeaderClassName: dialogDraggableClassName,
      titleProps: {
        // eslint-disable-next-line deprecation/deprecation
        id: props.dialogContentProps?.titleId || this._defaultTitleTextId,
        ...props.dialogContentProps?.titleProps,
      },
    };

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className: mergedModalProps.className,
      containerClassName: mergedModalProps.containerClassName,
      hidden,
      dialogDefaultMinWidth: minWidth,
      dialogDefaultMaxWidth: maxWidth,
    });

    return (
      <Modal
        {...mergedModalProps}
        className={classNames.root}
        containerClassName={classNames.main}
        onDismiss={onDismiss || mergedModalProps.onDismiss}
        subtitleAriaId={this._getSubTextId()}
        titleAriaId={this._getTitleTextId()}
      >
        <DialogContent
          subTextId={this._defaultSubTextId}
          showCloseButton={mergedModalProps.isBlocking}
          onDismiss={onDismiss}
          {...dialogContentProps}
        >
          {props.children}
        </DialogContent>
      </Modal>
    );
  }

  private _getSubTextId = (): string | undefined => {
    // eslint-disable-next-line deprecation/deprecation
    const { ariaDescribedById, modalProps, dialogContentProps, subText } = this.props;
    let id = (modalProps && modalProps.subtitleAriaId) || ariaDescribedById;

    if (!id) {
      id = ((dialogContentProps && dialogContentProps.subText) || subText) && this._defaultSubTextId;
    }

    return id;
  };

  private _getTitleTextId = (): string | undefined => {
    // eslint-disable-next-line deprecation/deprecation
    const { ariaLabelledById, modalProps, dialogContentProps, title } = this.props;
    let id = (modalProps && modalProps.titleAriaId) || ariaLabelledById;

    if (!id) {
      id = ((dialogContentProps && dialogContentProps.title) || title) && this._defaultTitleTextId;
    }

    return id;
  };
}
