import type {
  ToggleButtonProps as ToggleButtonHeadlessProps,
  ToggleButtonState as ToggleButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/toggle-button';

import type { ButtonAppearance, ButtonShape, ButtonSize } from '../Button/Button.types';

export type { ToggleButtonSlots } from '@fluentui/react-headless-components-preview/toggle-button';

/**
 * Windmod ToggleButton props: the headless toggle button plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type ToggleButtonProps = ToggleButtonHeadlessProps & {
  /** @default 'secondary' */
  appearance?: ButtonAppearance;
  /** @default 'rounded' */
  shape?: ButtonShape;
  /** @default 'medium' */
  size?: ButtonSize;
};

/** Windmod ToggleButton state: headless state plus the resolved look props. */
export type ToggleButtonState = ToggleButtonHeadlessState &
  Required<Pick<ToggleButtonProps, 'appearance' | 'shape' | 'size'>>;
