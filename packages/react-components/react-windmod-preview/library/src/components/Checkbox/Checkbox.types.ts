import type {
  CheckboxProps as CheckboxHeadlessProps,
  CheckboxState as CheckboxHeadlessState,
} from '@fluentui/react-headless-components-preview/checkbox';

export type { CheckboxSlots } from '@fluentui/react-headless-components-preview/checkbox';

/** Shape of the Checkbox indicator. `'circular'` suits checklists, where it cannot be read as a radio. */
export type CheckboxShape = 'square' | 'circular';

/** Size of the Checkbox indicator. */
export type CheckboxSize = 'medium' | 'large';

/**
 * Windmod Checkbox props: the headless checkbox plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type CheckboxProps = CheckboxHeadlessProps & {
  /** @default 'square' */
  shape?: CheckboxShape;
  /** @default 'medium' */
  size?: CheckboxSize;
};

/** Windmod Checkbox state: headless state plus the resolved look props. */
export type CheckboxState = CheckboxHeadlessState & Required<Pick<CheckboxProps, 'shape' | 'size'>>;
