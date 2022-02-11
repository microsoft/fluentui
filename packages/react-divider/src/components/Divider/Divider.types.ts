import type { ComponentProps, ComponentState, ComponentRender, Slot } from '@fluentui/react-utilities';

export type DividerSlots = {
  /**
   * Root of the component that renders as a `<div>` tag.
   */
  root: Slot<'div'>;

  /**
   * Accessibility wrapper for content when presented.
   */
  wrapper: Slot<'div'>;
};

type DividerCommons = {
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

export type DividerProps = ComponentProps<Partial<DividerSlots>> & Partial<DividerCommons>;

export type DividerState = ComponentState<DividerSlots> & DividerCommons;

export type DividerRender = ComponentRender<DividerState>;
