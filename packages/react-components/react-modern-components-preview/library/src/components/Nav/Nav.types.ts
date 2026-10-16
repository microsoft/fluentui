import type {
  NavProps as NavBaseProps,
  NavState as NavBaseState,
} from '@fluentui/react-headless-components-preview/nav';
export type {
  NavContextValue,
  NavContextValues,
  NavItemRegisterData,
  NavItemValue,
  NavSlots,
  OnNavItemSelectData,
  RegisterNavItemEventHandler,
} from '@fluentui/react-headless-components-preview/nav';

export type NavDensity = 'small' | 'medium';

export type NavProps = NavBaseProps & {
  /**
   * The vertical density of the Nav and its children.
   *
   * @default 'medium'
   */
  density?: NavDensity;
};

export type NavState = NavBaseState & {
  density: NavDensity;
  tabbable: boolean;
  root: NavBaseState['root'] & {
    'data-density': NavDensity;
  };
};
