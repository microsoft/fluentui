import type {
  DialogActionsProps as DialogActionsHeadlessProps,
  DialogActionsState as DialogActionsHeadlessState,
} from '@fluentui/react-headless-components-preview/dialog';

export type { DialogActionsSlots } from '@fluentui/react-headless-components-preview/dialog';

/** Which grid column the actions occupy, and therefore which edge they align to. */
export type DialogActionsPosition = 'start' | 'end';

/**
 * Windmod DialogActions props: the headless actions plus the two look props the headless component
 * deliberately omits (they exist purely to select styles).
 */
export type DialogActionsProps = DialogActionsHeadlessProps & {
  /** @default 'end' */
  position?: DialogActionsPosition;
  /**
   * Lets the actions span the full grid width instead of their own column.
   * @default false
   */
  fluid?: boolean;
};

/** Windmod DialogActions state: headless state plus the resolved look values. */
export type DialogActionsState = DialogActionsHeadlessState & {
  position: DialogActionsPosition;
  fluid: boolean;
};
