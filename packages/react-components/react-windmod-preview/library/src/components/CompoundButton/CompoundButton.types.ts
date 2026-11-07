import type {
  CompoundButtonProps as CompoundButtonHeadlessProps,
  CompoundButtonState as CompoundButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/compound-button';

import type { ButtonAppearance, ButtonShape, ButtonSize } from '../Button/Button.types';

export type { CompoundButtonSlots } from '@fluentui/react-headless-components-preview/compound-button';

/**
 * Windmod CompoundButton props: the headless compound button plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type CompoundButtonProps = CompoundButtonHeadlessProps & {
  /** @default 'secondary' */
  appearance?: ButtonAppearance;
  /** @default 'rounded' */
  shape?: ButtonShape;
  /** @default 'medium' */
  size?: ButtonSize;
};

/** Windmod CompoundButton state: headless state plus the resolved look props. */
export type CompoundButtonState = CompoundButtonHeadlessState &
  Required<Pick<CompoundButtonProps, 'appearance' | 'shape' | 'size'>>;
