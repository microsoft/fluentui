// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import type * as React from 'react';

export const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
export const sizes = ['small', 'medium', 'large'] as const;

export type ComboboxLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  'aria-invalid'?: boolean;
  clearable?: boolean;
  defaultSelectedOptions?: string[];
  defaultValue?: string;
  disabled?: boolean;
  multiselect?: boolean;
  open?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  // Only the windmod side passes this: `popover: 'manual'` is what lets one page hold more than one
  // open surface. Griffel portals each listbox instead, and a popover attribute on its div would
  // hide the surface outright.
  listbox?: Record<string, unknown>;
  root?: { style?: React.CSSProperties };
}>;

export type ListboxLike = React.ComponentType<{
  multiselect?: boolean;
  selectedOptions?: string[];
  children?: React.ReactNode;
}>;

// OptionProps is a union — an option carries either a `text` prop or string children — so the
// scenes' loose shape has to require the string children half for the real components to be
// assignable to it.
export type OptionLike = React.ComponentType<{
  disabled?: boolean;
  value?: string;
  children: string;
}>;

export type OptionGroupLike = React.ComponentType<{
  label?: string;
  children?: React.ReactNode;
}>;

export type ComboboxFamily = {
  Combobox: ComboboxLike;
  Listbox: ListboxLike;
  Option: OptionLike;
  OptionGroup: OptionGroupLike;
  /** Windmod only — see ComboboxLike.listbox. */
  listbox?: Record<string, unknown>;
};
