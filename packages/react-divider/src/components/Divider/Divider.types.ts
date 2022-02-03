import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type DividerSlots = {
  /**
   * Root of the component that renders as a `<div>` tag.
   */
  root: IntrinsicSlotProps<'div'>;

  /**
   * Accessibility wrapper for content when presented.
   */
  wrapper: IntrinsicSlotProps<'div'>;
};

export type DividerCommonsUnstable = {
  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent: 'start' | 'center' | 'end';

  /**
   * A divider can have one of the preset appearances.
   * When not specified, the divider has its default appearance.
   */
  appearance?: 'brand' | 'strong' | 'subtle';

  /**
   * Adds padding to the beginning and end of the divider.
   * @default false
   */
  inset: boolean;

  /**
   * A divider can be horizontal (default) or vertical.
   * @default false
   */
  vertical: boolean;
};

export type DividerProps = ComponentProps<DividerSlots> & Partial<DividerCommonsUnstable>;

export type DividerState = ComponentState<DividerSlots> & DividerCommonsUnstable;
