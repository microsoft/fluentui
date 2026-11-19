import type {
  SelectProps as SelectHeadlessProps,
  SelectState as SelectHeadlessState,
} from '@fluentui/react-headless-components-preview/select';

export type { SelectSlots } from '@fluentui/react-headless-components-preview/select';

/** Colours and borders of the Select. `'outline'` is the base look. */
export type SelectAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/** Size of the Select — changes its height, font size and horizontal padding. */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * Windmod Select props: the headless select plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type SelectProps = SelectHeadlessProps & {
  /** @default 'outline' */
  appearance?: SelectAppearance;
  /** @default 'medium' */
  size?: SelectSize;
};

/** Windmod Select state: headless state plus the resolved look props. */
export type SelectState = SelectHeadlessState & Required<Pick<SelectProps, 'appearance' | 'size'>>;
