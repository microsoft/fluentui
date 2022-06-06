import * as React from 'react';
import { DialogBase } from './Dialog.base';
import { DialogType } from './DialogContent.types';
import type { IModalProps } from '../../Modal';
import type { IDialogContentProps } from './DialogContent.types';
import type { IButtonProps } from '../../Button';
import type { IWithResponsiveModeState } from '../../ResponsiveMode';
import type { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import type { IStyle, ITheme } from '../../Styling';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { ICSSRule, ICSSPixelUnitRule } from '@fluentui/merge-styles';

/**
 * {@docCategory Dialog}
 */
export interface IDialog {}

/**
 * {@docCategory Dialog}
 */
export interface IDialogProps
  extends React.ClassAttributes<DialogBase>,
    // eslint-disable-next-line deprecation/deprecation
    IWithResponsiveModeState,
    IAccessiblePopupProps {
  /**
   * @deprecated Unused, returns no value
   */
  componentRef?: IRefObject<IDialog>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;

  /**
   * Theme provided by HOC.
   */
  theme?: ITheme;

  /**
   * Props to be passed through to Dialog Content
   */
  dialogContentProps?: IDialogContentProps;

  /**
   * A callback function for when the Dialog is dismissed from the close button or light dismiss.
   * Can also be specified separately in content and modal.
   */
  onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;

  /**
   * Whether the dialog is hidden.
   * @defaultvalue true
   */
  hidden?: boolean;

  /**
   * Props to be passed through to Modal
   */
  modalProps?: IModalProps;

  /**
   * Whether the dialog is displayed.
   * @defaultvalue false
   * @deprecated Use `hidden` instead
   */
  isOpen?: boolean;

  /**
   * Whether the overlay is dark themed.
   * @defaultvalue true
   * @deprecated Pass through via `modalProps` instead
   */
  isDarkOverlay?: boolean;

  /**
   * A callback function which is called after the Dialog is dismissed and the animation is complete.
   * @deprecated Pass through via `modalProps` instead
   */
  onDismissed?: () => any;

  /**
   * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
   * @defaultvalue false
   * @deprecated Pass through via `modalProps` instead
   */
  isBlocking?: boolean;

  /**
   * Optional class name to be added to the root class
   * @deprecated Pass through via `modalProps.className` instead
   */
  className?: string;

  /**
   * Optional override for container class
   * @deprecated Pass through via `modalProps.className` instead
   */
  containerClassName?: string;

  /**
   * A callback function for when the Dialog content is mounted on the overlay layer
   * @deprecated Pass through via `modalProps.layerProps` instead
   */
  onLayerDidMount?: () => void;

  /**
   * Deprecated at 0.81.2.
   * @deprecated Use `onLayerDidMount` instead.
   */
  onLayerMounted?: () => void;

  /**
   * The type of Dialog to display.
   * @defaultvalue DialogType.normal
   * @deprecated Pass through via `dialogContentProps` instead.
   */
  type?: DialogType;

  /**
   * The title text to display at the top of the dialog.
   * @deprecated Pass through via `dialogContentProps` instead.
   */
  title?: string | JSX.Element;

  /**
   * The subtext to display in the dialog.
   * @deprecated Pass through via `dialogContentProps` instead.
   */
  subText?: string;

  /**
   * Optional override content class
   * @deprecated Pass through via `dialogContentProps` instead as `className`.
   */
  contentClassName?: string;

  /**
   * Other top buttons that will show up next to the close button
   * @deprecated Pass through via `dialogContentProps` instead.
   */
  topButtonsProps?: IButtonProps[];

  /**
   * Optional id for aria-LabelledBy
   * @deprecated Pass through via `modalProps.titleAriaId` instead.
   */
  ariaLabelledById?: string;

  /**
   * Optional id for aria-DescribedBy
   * @deprecated Pass through via `modalProps.subtitleAriaId` instead.
   */
  ariaDescribedById?: string;

  /**
   * Sets the minimum width of the dialog. It limits the width property to be not
   * smaller than the value specified in min-width.
   */
  minWidth?: ICSSRule | ICSSPixelUnitRule;

  /**
   * Sets the maximum width for the dialog. It limits the width property to be larger
   * than the value specified in max-width.
   */
  maxWidth?: ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogStyleProps {
  /**
   * Accept theme prop.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Optional override for container class
   * @deprecated Pass through via `modalProps.className` instead.
   */
  containerClassName?: string;

  /**
   * Optional override content class
   * @deprecated Pass through via `dialogContentProps` instead as `className`.
   */
  contentClassName?: string;

  /**
   * Whether the dialog is hidden.
   * @defaultvalue false
   */
  hidden?: boolean;

  /**
   * Default min-width for the dialog box.
   * @defaultvalue '288px'
   */
  dialogDefaultMinWidth?: string | ICSSRule | ICSSPixelUnitRule;

  /**
   * Default max-width for the dialog box.
   * @defaultvalue '340px'
   */
  dialogDefaultMaxWidth?: string | ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export interface IDialogStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  main: IStyle;
}
