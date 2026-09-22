import type {
  NavItemProps as NavItemBaseProps,
  NavItemState as NavItemBaseState,
} from '@fluentui/react-headless-components-preview/nav';
import type { NavDensity } from '../Nav/Nav.types';
export type { NavItemSlots } from '@fluentui/react-headless-components-preview/nav';

export type NavItemProps = NavItemBaseProps;

export type NavItemState = NavItemBaseState & {
  density: NavDensity;
  root: NavItemBaseState['root'] & {
    'data-density': NavDensity;
  };
};
