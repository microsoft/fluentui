import type {
  DropdownProps as DropdownHeadlessProps,
  DropdownState as DropdownHeadlessState,
} from '@fluentui/react-headless-components-preview/dropdown';

/** Colours and borders of the Dropdown trigger. `'outline'` is the base look. */
export type DropdownAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/** Size of the Dropdown trigger — changes its height, font size and horizontal padding. */
export type DropdownSize = 'small' | 'medium' | 'large';

/**
 * Windmod Dropdown props: the headless dropdown plus the look props the headless surface
 * deliberately omits (they exist purely to select styles). `inlinePopup` and `mountNode` stay
 * omitted — the surface is always inline in the React tree and promoted to the top layer.
 */
export type DropdownProps = DropdownHeadlessProps & {
  /** @default 'outline' */
  appearance?: DropdownAppearance;
  /** @default 'medium' */
  size?: DropdownSize;
};

/** Windmod Dropdown state: headless state plus the resolved look props. */
export type DropdownState = DropdownHeadlessState & Required<Pick<DropdownProps, 'appearance' | 'size'>>;
