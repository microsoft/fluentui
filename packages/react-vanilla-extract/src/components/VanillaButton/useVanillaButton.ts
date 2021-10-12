import * as React from 'react';
import { useARIAButton } from '@fluentui/react-aria';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { VanillaButtonProps, VanillaButtonState } from './VanillaButton.types';

export const useVanillaButton = (
  props: VanillaButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): VanillaButtonState => {
  const { as, icon } = props;
  const iconShorthand = resolveShorthand(icon);

  return {
    // State calculated from a set of props
    iconOnly: Boolean(iconShorthand?.children && !props.children),

    // Slots definition
    components: {
      root: 'button',
      icon: 'span',
    },

    root: getNativeElementProps(
      as || 'button',
      useARIAButton(props, {
        required: true,
        defaultProps: {
          // useARIAButton isn't working with React.Ref<HTMLButtonElement | HTMLAnchorElement>
          ref: ref as React.Ref<HTMLButtonElement>,
          type: 'button', // This is added because the default for type is 'submit'
        },
      }),
    ),
    icon: iconShorthand,
  };
};
