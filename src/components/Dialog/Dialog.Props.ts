import * as React from 'react';
import Dialog from './Dialog';
import { DialogType } from './interfaces';
import { ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

export interface IDialogProps extends React.Props<Dialog> {
    isOpen?: boolean;                                /** Whether the dialog is displayed. */
    type?: DialogType;                               /** The type of Dialog to display. */
    onDismiss?: (ev?: React.MouseEvent) => any;      /** A callback function for when the Dialog is dismissed from the close button or light dismiss. */
    title?: string;                                  /** The title text to display at the top of the dialog. */
    subText?: string;                                /** The subtext to display in the dialog. */
    isBlocking?: boolean;                            /** Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay). */
    responsiveMode?: ResponsiveMode;
}
