import type {
  ComboboxProps as ComboboxHeadlessProps,
  ComboboxState as ComboboxHeadlessState,
} from '@fluentui/react-headless-components-preview/combobox';

export type { ComboboxSlots } from '@fluentui/react-headless-components-preview/combobox';

/** Colours and borders of the Combobox trigger. `'outline'` is the base look. */
export type ComboboxAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/** Size of the Combobox trigger — changes its height, font size and horizontal padding. */
export type ComboboxSize = 'small' | 'medium' | 'large';

/**
 * Windmod Combobox props: the headless combobox plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). `inlinePopup` and `mountNode` stay
 * omitted — the surface is always inline in the React tree and promoted to the top layer.
 */
export type ComboboxProps = ComboboxHeadlessProps & {
  /** @default 'outline' */
  appearance?: ComboboxAppearance;
  /** @default 'medium' */
  size?: ComboboxSize;
};

/** Windmod Combobox state: headless state plus the resolved look props. */
export type ComboboxState = ComboboxHeadlessState & Required<Pick<ComboboxProps, 'appearance' | 'size'>>;
