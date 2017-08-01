import * as React from 'react';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';
import { TeachingDialog } from './TeachingDialog';
import { ITeachingDialogViewProps } from './TeachingDialogView.Props';

/**
 * TeachingDialog component props.
 */
export interface ITeachingDialogProps extends React.Props<TeachingDialog>, IAccessiblePopupProps {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: TeachingDialog) => void;

  /**
   * Callback when trying to close TeachingDialog using X button.
   */
  onXButton?: (ev?: any) => void;

  /**
   * pageProps an array ITeachingDialogPageProps for all pages in the dialog
   */
  viewProps: ITeachingDialogViewProps[];

}