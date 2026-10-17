import type {
  ToolbarRadioButtonProps as ToolbarRadioButtonHeadlessProps,
  ToolbarRadioButtonState as ToolbarRadioButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ButtonState } from '../Button/Button.types';
import type { ToolbarButtonAppearance } from '../ToolbarButton/ToolbarButton.types';

/**
 * Windmod ToolbarRadioButton props: the headless toolbar radio button plus the look prop the
 * headless surface deliberately omits. `size` is not among them — it stays a headless prop and
 * defaults from the toolbar context.
 */
export type ToolbarRadioButtonProps = ToolbarRadioButtonHeadlessProps & {
  /** @default 'subtle' */
  appearance?: ToolbarButtonAppearance;
};

/** Windmod ToolbarRadioButton state: headless state plus the resolved look props. */
export type ToolbarRadioButtonState = ToolbarRadioButtonHeadlessState &
  Required<Pick<ToolbarRadioButtonProps, 'appearance'>> &
  Required<Pick<ButtonState, 'shape' | 'size'>>;
