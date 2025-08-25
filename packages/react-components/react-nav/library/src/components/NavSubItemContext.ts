import * as React from 'react';
import { NavItemValue } from './NavContext.types';

// This context is analogous to AccordionItemContext

export type NavSubItemContextValue = {
  open: boolean;
  value: NavItemValue;
};

const NavSubItemContext = React.createContext<NavSubItemContextValue | undefined>(
  undefined,
) as React.Context<NavSubItemContextValue>;

const NavSubItemContextDefaultValue: NavSubItemContextValue = {
  open: false,
  value: '',
};

export const { Provider: NavSubItemProvider } = NavSubItemContext;

export const useNavSubItemContext_unstable = (): NavSubItemContextValue => {
  return React.useContext(NavSubItemContext) ?? NavSubItemContextDefaultValue;
};
