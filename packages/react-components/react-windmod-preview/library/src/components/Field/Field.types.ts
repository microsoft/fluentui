import type {
  FieldProps as FieldHeadlessProps,
  FieldState as FieldHeadlessState,
} from '@fluentui/react-headless-components-preview/field';

export type { FieldSlots } from '@fluentui/react-headless-components-preview/field';

/** Placement of the label relative to the control. The message and hint always sit below it. */
export type FieldOrientation = 'vertical' | 'horizontal';

/** Size of the Field's label, and of any control that reads it from the field context. */
export type FieldSize = 'small' | 'medium' | 'large';

/**
 * Windmod Field props: the headless field plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type FieldProps = FieldHeadlessProps & {
  /** @default 'vertical' */
  orientation?: FieldOrientation;
  /** @default 'medium' */
  size?: FieldSize;
};

/** Windmod Field state: headless state plus the resolved look props. */
export type FieldState = FieldHeadlessState & Required<Pick<FieldProps, 'orientation' | 'size'>>;
