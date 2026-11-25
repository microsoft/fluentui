import type { MenuBaseProps } from '@fluentui/react-menu';
import type { PositioningShorthand } from '../../positioning';

export type MenuProps = Omit<MenuBaseProps, 'positioning'> & {
  /**
   * Configures the positioned menu.
   */
  positioning?: PositioningShorthand;
};

export type {
  MenuBaseState as MenuState,
  MenuContextValue,
  MenuOpenChangeData,
  MenuOpenEvent,
  MenuContextValues,
} from '@fluentui/react-menu';
