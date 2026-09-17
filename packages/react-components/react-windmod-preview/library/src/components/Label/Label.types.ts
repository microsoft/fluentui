import type {
  LabelProps as LabelHeadlessProps,
  LabelState as LabelHeadlessState,
} from '@fluentui/react-headless-components-preview/label';

export type { LabelSlots } from '@fluentui/react-headless-components-preview/label';

/** Size of the Label. */
export type LabelSize = 'small' | 'medium' | 'large';

/** Font weight of the Label. Size `'large'` is semibold regardless of this prop. */
export type LabelWeight = 'regular' | 'semibold';

/**
 * Windmod Label props: the headless label plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type LabelProps = LabelHeadlessProps & {
  /** @default 'medium' */
  size?: LabelSize;
  /** @default 'regular' */
  weight?: LabelWeight;
};

/** Windmod Label state: headless state plus the resolved look props. */
export type LabelState = LabelHeadlessState & Required<Pick<LabelProps, 'size' | 'weight'>>;
