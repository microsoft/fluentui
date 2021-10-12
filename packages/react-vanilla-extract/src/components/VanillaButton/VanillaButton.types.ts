import { ARIAButtonShorthandProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type VanillaButtonSlots = {
  /**
   * Root of the component that renders as either a <Vanillabutton> tag.
   */
  root: ARIAButtonShorthandProps;

  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: IntrinsicShorthandProps<'span'>;
};

export type VanillaButtonCommons = {};

export type VanillaButtonProps = ComponentProps<VanillaButtonSlots> & Partial<VanillaButtonCommons>;

export type VanillaButtonState = ComponentState<VanillaButtonSlots> &
  VanillaButtonCommons & {
    /**
     * A Vanillabutton can contain only an icon.
     * @default false
     */
    iconOnly: boolean;
  };
