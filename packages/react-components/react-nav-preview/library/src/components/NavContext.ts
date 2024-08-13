import * as React from 'react';
import { NavContextValue } from './NavContext.types';

const navContextDefaultValue: NavContextValue = {
  reserveSelectedNavItemSpace: true,
  selectedValue: undefined,
  selectedCategoryValue: undefined,
  onRegister: () => {
    /* noop */
  },
  onUnregister: () => {
    /* noop */
  },
  onSelect: () => {
    /* noop */
  },
  getRegisteredNavItems: () => {
    return {
      registeredNavItems: {},
    };
  },
  onRequestNavCategoryItemToggle() {
    /* noop */
  },
  /**
   * The list of opened panels by index
   */
  openCategories: [],

  /**
   * Indicates if Nav supports multiple open Categories at the same time.
   */
  multiple: true,

  /**
   * Indicates the size and density of the Nav.
   */
  size: 'medium',
};

const NavContext = React.createContext<NavContextValue | undefined>(undefined);

export const NavProvider = NavContext.Provider;

export const useNavContext_unstable = () => React.useContext(NavContext) || navContextDefaultValue;
