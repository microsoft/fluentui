import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type DividerSlots = {
  root: IntrinsicShorthandProps<'div'>;

  /**
   * Accessibility wrapper for content when presented.
   * A shorthand prop can be a literal, object, or
   * JSX. The `children` prop of the object can be a render function,
   * taking in the original slot component and props.
   */
  wrapper: IntrinsicShorthandProps<'div'>;
};

export type DividerCommons = {
  /**
   * Determines the alignment of the content within the divider.
   * @defaultvalue 'center'
   */
  alignContent: 'start' | 'end' | 'center';

  /**
   * A divider can have one of the preset appearances.
   * When not specified, the divider has its default appearance.
   */
  appearance?: 'brand' | 'strong' | 'subtle';

  /**
   * Adds padding to the beginning and end of the divider
   * @default false
   */
  inset: boolean;

  /**
   * A divider can be horizontal (default) or vertical
   * @default false
   */
  vertical: boolean;
};

export type DividerProps = ComponentProps<DividerSlots> & Partial<DividerCommons>;

export type DividerState = ComponentState<DividerSlots> & DividerCommons;
