import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DividerSlots = {
  /**
   * Root of the component that renders as a `<div>` tag.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Wrapper for content when presented.
   */
  wrapper: NonNullable<Slot<'div'>>;
};

export type DividerProps = ComponentProps<Partial<DividerSlots>> & {
  /**
   * Determines the alignment of the content within the divider.
   *
   * @default 'center'
   */
  alignContent?: 'start' | 'center' | 'end';

  /**
   * A divider can have one of the preset appearances.
   * When not specified, the divider has its default appearance.
   *
   * @default 'default'
   */
  appearance?: 'brand' | 'default' | 'strong' | 'subtle';

  /**
   * Adds padding to the beginning and end of the divider.
   *
   * @default false
   */
  inset?: boolean;

  /**
   * A divider can be horizontal (default) or vertical.
   *
   * @default false
   */
  vertical?: boolean;
};

export type DividerState = ComponentState<DividerSlots> &
  Required<Pick<DividerProps, 'alignContent' | 'appearance' | 'inset' | 'vertical'>>;
