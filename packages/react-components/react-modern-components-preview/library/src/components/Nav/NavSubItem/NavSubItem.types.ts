import type {
  NavSubItemProps as NavSubItemBaseProps,
  NavSubItemState as NavSubItemBaseState,
} from '@fluentui/react-headless-components-preview/nav';
import type { NavDensity } from '../Nav/Nav.types';
export type { NavSubItemSlots } from '@fluentui/react-headless-components-preview/nav';

export type NavSubItemProps = NavSubItemBaseProps;

export type NavSubItemState = NavSubItemBaseState & {
  density: NavDensity;
  root: NavSubItemBaseState['root'] & {
    'data-density': NavDensity;
  };
};
