import type {
  DividerProps as DividerHeadlessProps,
  DividerState as DividerHeadlessState,
} from '@fluentui/react-headless-components-preview/divider';

export type { DividerSlots } from '@fluentui/react-headless-components-preview/divider';

/** Alignment of the Divider's content along the divider line. */
export type DividerAlignContent = 'start' | 'center' | 'end';

/** Appearance of the Divider. */
export type DividerAppearance = 'brand' | 'default' | 'strong' | 'subtle';

/**
 * Windmod Divider props: the headless divider plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). `vertical` is not among them —
 * it stays a headless prop.
 */
export type DividerProps = DividerHeadlessProps & {
  /** @default 'center' */
  alignContent?: DividerAlignContent;
  /** @default 'default' */
  appearance?: DividerAppearance;
  /** @default false */
  inset?: boolean;
};

/** Windmod Divider state: headless state plus the resolved look props. */
export type DividerState = DividerHeadlessState & Required<Pick<DividerProps, 'alignContent' | 'appearance' | 'inset'>>;
