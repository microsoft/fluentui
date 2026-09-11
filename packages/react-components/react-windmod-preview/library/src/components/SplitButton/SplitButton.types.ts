import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  SplitButtonProps as SplitButtonHeadlessProps,
  SplitButtonSlots as SplitButtonHeadlessSlots,
  SplitButtonState as SplitButtonHeadlessState,
} from '@fluentui/react-headless-components-preview/split-button';

import type { Button } from '../Button/Button';
import type { ButtonAppearance, ButtonShape, ButtonSize } from '../Button/Button.types';
import type { MenuButton } from '../MenuButton/MenuButton';

/**
 * The child slots are the windmod Button and MenuButton, so their shorthand accepts the look props
 * the headless slots do not.
 */
export type SplitButtonSlots = Omit<SplitButtonHeadlessSlots, 'menuButton' | 'primaryActionButton'> & {
  menuButton?: Slot<typeof MenuButton>;
  primaryActionButton?: Slot<typeof Button>;
};

/**
 * Windmod SplitButton props: the headless split button plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type SplitButtonProps = ComponentProps<SplitButtonSlots> &
  Pick<SplitButtonHeadlessProps, 'disabled' | 'disabledFocusable' | 'icon' | 'iconPosition' | 'menuIcon'> & {
    /** @default 'secondary' */
    appearance?: ButtonAppearance;
    /** @default 'rounded' */
    shape?: ButtonShape;
    /** @default 'medium' */
    size?: ButtonSize;
  };

/** Windmod SplitButton state: headless state plus the resolved look props. */
export type SplitButtonState = ComponentState<SplitButtonSlots> &
  Pick<SplitButtonHeadlessState, 'disabled' | 'disabledFocusable' | 'iconPosition'> &
  Required<Pick<SplitButtonProps, 'appearance' | 'shape' | 'size'>>;
