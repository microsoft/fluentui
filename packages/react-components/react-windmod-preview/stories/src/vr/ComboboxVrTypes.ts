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

/**
 * Dropdown shares this file rather than copying it: its trigger is a button where Combobox's is an
 * input, but every prop the scenes pass exists on both, so the loose trigger shape is unchanged.
 */
export type DropdownFamily = { Dropdown: ComboboxLike } & Omit<ComboboxFamily, 'Combobox'>;

export const pickerSizes = ['medium', 'large', 'extra-large'] as const;

/**
 * The TagPicker family.
 *
 * `TagPickerLike` types `children` as ReactNode where the real prop is a two-element tuple, so a
 * story assigns the real component through one cast.
 *
 * `inline` is GRIFFEL-ONLY: Griffel portals the popover to document.body unless it is set, and a
 * portalled surface leaves the captured tree. Windmod has no portals and does not declare the prop.
 * `list` is WINDMOD-ONLY: `popover: 'manual'` is what lets one page hold more than one open
 * surface, and a popover attribute on Griffel's portalled div would hide the surface outright.
 */
export type TagPickerLike = React.ComponentType<{
  appearance?: (typeof appearances)[number];
  size?: (typeof pickerSizes)[number];
  disabled?: boolean;
  inline?: boolean;
  noPopover?: boolean;
  open?: boolean;
  selectedOptions?: string[];
  children?: React.ReactNode;
}>;

// Slot types reject `false`, so a shim can never widen a slot prop to ReactNode — the same
// limitation TagVrScene.tsx records.
export type TagPickerControlLike = React.ComponentType<{
  'aria-invalid'?: boolean;
  expandIcon?: null;
  secondaryAction?: { children: string };
  style?: React.CSSProperties;
  children?: React.ReactNode;
}>;

export type TagPickerGroupLike = React.ComponentType<{
  'aria-label'?: string;
  children?: React.ReactNode;
}>;

export type TagPickerInputLike = React.ComponentType<{
  'aria-label'?: string;
  value?: string;
}>;

export type TagPickerButtonLike = React.ComponentType<{ children?: React.ReactNode }>;

export type TagPickerListLike = React.ComponentType<{
  popover?: '' | 'auto' | 'manual' | 'hint';
  children?: React.ReactNode;
}>;

export type TagPickerOptionLike = React.ComponentType<{
  disabled?: boolean;
  media?: React.ReactElement;
  secondaryContent?: string;
  value: string;
  children: string;
}>;

export type TagLike = React.ComponentType<{
  media?: React.ReactElement;
  value?: string;
  children?: React.ReactNode;
}>;

export type AvatarLike = React.ComponentType<{ name?: string }>;

// A TagPickerControl is invalid ONLY through a Field ancestor whose validationState is 'error' —
// the control reads useFieldContext_unstable and has no invalid prop of its own on either
// implementation, so an aria-invalid on the picker reaches nothing.
export type FieldLike = React.ComponentType<{
  validationState?: 'error';
  children?: React.ReactNode;
}>;

export type TagPickerFamily = {
  TagPicker: TagPickerLike;
  TagPickerControl: TagPickerControlLike;
  TagPickerGroup: TagPickerGroupLike;
  TagPickerInput: TagPickerInputLike;
  TagPickerButton: TagPickerButtonLike;
  TagPickerList: TagPickerListLike;
  TagPickerOption: TagPickerOptionLike;
  TagPickerOptionGroup: OptionGroupLike;
  Tag: TagLike;
  Avatar: AvatarLike;
  Field: FieldLike;
  /** Windmod only — see the note above. */
  list?: { popover: 'manual' };
  /** Griffel only — see the note above. */
  inline?: boolean;
};
