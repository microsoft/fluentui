import type {
  ToolbarButtonProps as ToolbarButtonHeadlessProps,
  ToolbarButtonState as ToolbarButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ButtonState } from '../../Button/Button.types';

/** Visual style of a ToolbarButton. `'subtle'` is the base look; the toolbar drops Button's outline and secondary. */
export type ToolbarButtonAppearance = 'primary' | 'subtle' | 'transparent';

/**
 * Windmod ToolbarButton props: the headless toolbar button plus the look prop the headless
 * surface deliberately omits. `vertical` is not among them — it stays a headless prop, and it
 * stacks the glyph above the label rather than describing the toolbar's orientation.
 */
export type ToolbarButtonProps = ToolbarButtonHeadlessProps & {
  /** @default 'subtle' */
  appearance?: ToolbarButtonAppearance;
};

/** Windmod ToolbarButton state: headless state plus the resolved look props. `shape` and `size` are fixed. */
export type ToolbarButtonState = ToolbarButtonHeadlessState &
  Required<Pick<ToolbarButtonProps, 'appearance'>> &
  Required<Pick<ButtonState, 'shape' | 'size'>>;
