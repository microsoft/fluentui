import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type ResultOptionSlots = {
  /** The root option slot, with role="option" */
  root: NonNullable<Slot<'div'>>;
  media: NonNullable<Slot<'div'>>;
  main: NonNullable<Slot<'div'>>;
};

export type ResultOptionProps = ComponentProps<Partial<ResultOptionSlots>> & {
  disabled?: boolean;
  value?: string;
} & (
    | {
        /**
         * An optional override the string value of the Option's display text,
         * defaulting to the Option's child content.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text?: string;
        children: string;
      }
    | {
        /**
         * The string value of the Option's display text when the Option's children are not a string.
         * This is used as the Dropdown button's or Combobox input's value when the option is selected,
         * and as the comparison for type-to-find keyboard functionality.
         */
        text: string;
        children?: React.ReactNode;
      }
  );

export type ResultOptionState = ComponentState<ResultOptionSlots> &
  Pick<ResultOptionProps, 'disabled'> & {
    selected: boolean;
  };
