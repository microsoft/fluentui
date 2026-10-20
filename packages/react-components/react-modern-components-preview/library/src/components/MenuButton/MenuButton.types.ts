import type {
  MenuButtonProps as MenuButtonBaseProps,
  MenuButtonState as MenuButtonBaseState,
} from '@fluentui/react-headless-components-preview/menu-button';
export type { MenuButtonSlots } from '@fluentui/react-headless-components-preview/menu-button';
import type { ButtonProps } from '../Button/Button.types';

export type MenuButtonProps = MenuButtonBaseProps & Pick<ButtonProps, 'appearance' | 'shape' | 'size'>;

export type MenuButtonState = MenuButtonBaseState & {
  appearance: MenuButtonProps['appearance'];
  shape: MenuButtonProps['shape'];
  size: MenuButtonProps['size'];
  root: {
    'data-appearance'?: MenuButtonProps['appearance'];
    'data-shape'?: MenuButtonProps['shape'];
    'data-size'?: MenuButtonProps['size'];
  };
};
