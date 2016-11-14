import * as React from 'react';
import { Pane } from './Pane';

export interface IPaneProps extends React.Props<Pane> {
    /**
     * Whether the pane is displayed.
     * @default false
     */
    hidden?: boolean;

    /**
     * Mode of the pane.
     * @default PaneMode.push
     */
    paneMode?: PaneMode;

    /**
     * Has the close button visible.
     * @default true
     */
    closeButtonHidden?: boolean;

    /**
     * Additional styling options.
     */
    className?: string;

    /**
     * Aria label on close button
     */
    closeButtonAriaLabel?: string;

    /**
     * Header text for the Pane.
     * @default ""
     */
    headerText?: string;

    /**
     * Optional parameter to provider the class name for header text
     */
    headerClassName?: string;

    /**
     * Type of the pane.
     * @default PaneType.small
     */
    type?: PaneType;

    /**
     * Event handler for when the pane is closed.
     */
    onDismiss?: () => void;
}

export enum PaneType {
    /**
     * Renders the pane in 'small' mode, anchored to the far side (right in LTR mode).
     */
    small,

    /**
     * Renders the pane in 'medium' mode, anchored to the far side (right in LTR mode).
     */
    medium
}

export enum PaneMode {
    /**
     * Pane reflows the main content and shrinks the viewable area.
     */
    push,

    /**
     * Pane leaves the content unchanged and only resizes the viewable area.
     */
    overlay
}