import type {
  ToolbarToggleButtonProps as ToolbarToggleButtonHeadlessProps,
  ToolbarToggleButtonState as ToolbarToggleButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/toolbar';

import type { ButtonState } from '../../Button/Button.types';
import type { ToolbarButtonAppearance } from '../ToolbarButton/ToolbarButton.types';

/**
 * Windmod ToolbarToggleButton props: the headless toolbar toggle button plus the look prop the
 * headless surface deliberately omits. `size` is not among them — it stays a headless prop and
 * defaults from the toolbar context.
 */
export type ToolbarToggleButtonProps = ToolbarToggleButtonHeadlessProps & {
  /** @default 'subtle' */
  appearance?: ToolbarButtonAppearance;
};

/** Windmod ToolbarToggleButton state: headless state plus the resolved look props. */
export type ToolbarToggleButtonState = ToolbarToggleButtonHeadlessState &
  Required<Pick<ToolbarToggleButtonProps, 'appearance'>> &
  Required<Pick<ButtonState, 'shape' | 'size'>>;
