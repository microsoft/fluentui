import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogTitleSlots = {
  /**
   * The heading element. Defaults to `<h2>`.
   * Its `id` is set to match the `aria-labelledby` on `DialogSurface`.
   */
  root: Slot<'h2'>;
};

export type DialogTitleProps = ComponentProps<DialogTitleSlots>;

export type DialogTitleState = ComponentState<DialogTitleSlots>;
