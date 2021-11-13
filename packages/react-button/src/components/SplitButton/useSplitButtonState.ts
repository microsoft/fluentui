import { SplitButtonProps, MenuButton, Button, SplitButtonState } from '@fluentui/react-button';
import { resolveShorthand } from '@fluentui/react-utilities';

export const useSplitButtonState = (props: SplitButtonProps): SplitButtonState => {
  const {
    appearance,
    block = false,
    children,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    menuButton,
    primaryActionButton,
    shape = 'rounded',
    size = 'medium',
  } = props;

  return {
    // Props passed at the top-level
    appearance,
    block,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size,

    // Slots definition
    components: {
      root: 'div',
      menuButton: MenuButton,
      primaryActionButton: Button,
    },

    // TODO: moved to ARIA hook since it needs a ref, but this seems odd
    // root: getNativeElementProps('div', { ref, ...props }),
    root: {},
    menuButton: resolveShorthand(menuButton, {
      defaultProps: {
        appearance,
        disabled,
        disabledFocusable,
        shape,
        size,
      },
    }),
    primaryActionButton: resolveShorthand(primaryActionButton, {
      defaultProps: {
        appearance,
        block,
        children,
        disabled,
        disabledFocusable,
        icon,
        iconPosition,
        shape,
        size,
      },
    }),
  };
};
