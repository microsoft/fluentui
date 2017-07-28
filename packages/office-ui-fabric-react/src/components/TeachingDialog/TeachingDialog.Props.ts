import * as React from 'react';
import { ITeachingDialogViewProps } from './TeachingDialogView.Props';
import { TeachingDialog } from './TeachingDialog';
import { IAccessiblePopupProps } from '../../common/IAccessiblePopupProps';

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
   * pageProps an array ITeachingDialogPageProps for all pages in the dialog
   */
  viewProps: ITeachingDialogViewProps[];

  /**
   * Callback when trying to close TeachingDialog using X button.
   */
  onXButton?: (ev?: any) => void;

}