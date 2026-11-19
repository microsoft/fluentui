import type {
  RadioGroupProps as RadioGroupHeadlessProps,
  RadioGroupState as RadioGroupHeadlessState,
} from '@fluentui/react-headless-components-preview/radio-group';

export type { RadioGroupSlots } from '@fluentui/react-headless-components-preview/radio-group';

/** How the Radio items are laid out in the group. */
export type RadioGroupLayout = 'vertical' | 'horizontal' | 'horizontal-stacked';

/**
 * Windmod RadioGroup props: the headless radio group plus the look prop the headless surface
 * deliberately omits. It is not style-only — a child Radio reads it back out of the group
 * context to decide where its own label goes.
 */
export type RadioGroupProps = RadioGroupHeadlessProps & {
  /** @default 'vertical' */
  layout?: RadioGroupLayout;
};

/** Windmod RadioGroup state: headless state plus the resolved look prop. */
export type RadioGroupState = RadioGroupHeadlessState & Required<Pick<RadioGroupProps, 'layout'>>;
