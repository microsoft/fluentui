import type {
  MenuButtonProps as MenuButtonHeadlessProps,
  MenuButtonState as MenuButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/menu-button';

import type { ButtonAppearance, ButtonShape, ButtonSize } from '../Button/Button.types';

export type { MenuButtonSlots } from '@fluentui/react-headless-components-preview/menu-button';

/**
 * Windmod MenuButton props: the headless menu button plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type MenuButtonProps = MenuButtonHeadlessProps & {
  /** @default 'secondary' */
  appearance?: ButtonAppearance;
  /** @default 'rounded' */
  shape?: ButtonShape;
  /** @default 'medium' */
  size?: ButtonSize;
};

/** Windmod MenuButton state: headless state plus the resolved look props. */
export type MenuButtonState = MenuButtonHeadlessState &
  Required<Pick<MenuButtonProps, 'appearance' | 'shape' | 'size'>>;
