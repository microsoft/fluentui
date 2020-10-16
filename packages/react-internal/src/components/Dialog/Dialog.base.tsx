import * as React from 'react';
import { warnDeprecations, classNamesFunction, getId } from '../../Utilities';
import { IDialogProps, IDialogStyleProps, IDialogStyles } from './Dialog.types';
import { DialogType, IDialogContentProps } from './DialogContent.types';
import { Modal, IModalProps, IDragOptions } from '../../Modal';
import { ILayerProps } from '../../Layer';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

const getClassNames = classNamesFunction<IDialogStyleProps, IDialogStyles>();

import { DialogContent } from './DialogContent';

const DefaultModalProps: IModalProps = {
  isDarkOverlay: false,
  isBlocking: false,
  className: '',
  containerClassName: '',
  topOffsetFixed: false,
};

const DefaultDialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  className: '',
  topButtonsProps: [],
};

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
      /* eslint-enable deprecation/deprecation */
      minWidth,
      maxWidth,
      modalProps,
    } = this.props;

    const mergedLayerProps: ILayerProps = {
      ...(modalProps ? modalProps.layerProps : { onLayerDidMount }),
    };
    if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
      mergedLayerProps.onLayerDidMount = onLayerDidMount;
    }

    let dialogDraggableClassName: string | undefined;
    let dragOptions: IDragOptions | undefined;

    // if we are draggable, make sure we are using the correct
    // draggable classname and selectors
    if (modalProps && modalProps.dragOptions && !modalProps.dragOptions.dragHandleSelector) {
      dialogDraggableClassName = 'ms-Dialog-draggable-header';
      dragOptions = {
        ...modalProps.dragOptions,
        dragHandleSelector: `.${dialogDraggableClassName}`,
      };
    } else {
      dragOptions = modalProps && modalProps.dragOptions;
    }

    const mergedModalProps = {
      ...DefaultModalProps,
      className,
      containerClassName,
      isBlocking,
      isDarkOverlay,
      onDismissed,
      ...modalProps,
      layerProps: mergedLayerProps,
      dragOptions,
    };

    const dialogContentProps: IDialogContentProps = {
      className: contentClassName,
      subText,
      title,
      topButtonsProps,
      type,
      ...DefaultDialogContentProps,
      ...this.props.dialogContentProps,
      draggableHeaderClassName: dialogDraggableClassName,
      titleProps: {
        // eslint-disable-next-line deprecation/deprecation
        id: this.props.dialogContentProps?.titleId || this._defaultTitleTextId,
        ...this.props.dialogContentProps?.titleProps,
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
        elementToFocusOnDismiss={elementToFocusOnDismiss}
        firstFocusableSelector={firstFocusableSelector}
        forceFocusInsideTrap={forceFocusInsideTrap}
        ignoreExternalFocusing={ignoreExternalFocusing}
        isClickableOutsideFocusTrap={isClickableOutsideFocusTrap}
        onDismissed={mergedModalProps.onDismissed}
        responsiveMode={responsiveMode}
        {...mergedModalProps}
        isDarkOverlay={mergedModalProps.isDarkOverlay}
        isBlocking={mergedModalProps.isBlocking}
        isOpen={isOpen !== undefined ? isOpen : !hidden}
        className={classNames.root}
        containerClassName={classNames.main}
        onDismiss={onDismiss ? onDismiss : mergedModalProps.onDismiss}
        subtitleAriaId={this._getSubTextId()}
        titleAriaId={this._getTitleTextId()}
      >
        <DialogContent
          subTextId={this._defaultSubTextId}
          title={dialogContentProps.title}
          subText={dialogContentProps.subText}
          showCloseButton={mergedModalProps.isBlocking}
          topButtonsProps={dialogContentProps.topButtonsProps}
          type={dialogContentProps.type}
          onDismiss={onDismiss ? onDismiss : dialogContentProps.onDismiss}
          className={dialogContentProps.className}
          {...dialogContentProps}
        >
          {this.props.children}
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
