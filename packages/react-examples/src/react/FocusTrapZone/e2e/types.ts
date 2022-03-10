import type { IFocusTrapZoneProps } from '@fluentui/react/lib/FocusTrapZone';

/**
 * Globals set by some of the stories. A story may set some or none of these.
 */
export type FTZTestGlobals = {
  /** Sets props of the FocusTrapZone (used by several stories) */
  setProps?: (props: IFocusTrapZoneProps) => void;
  /** Calls FocusTrapZone's imperative `focus()` method on a `componentRef` (used by Focusing story) */
  imperativeFocus?: () => void;
  /** Gets `FocusTrapZone.focusStack` (used by FocusStack story) */
  getFocusStack?: () => string[];
};
