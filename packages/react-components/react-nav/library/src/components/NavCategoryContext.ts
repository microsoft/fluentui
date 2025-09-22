import * as React from 'react';
import { NavItemValue } from './NavContext.types';

// This context is analogous to AccordionItemContext

export type NavCategoryContextValues = {
  categoryValue: NavCategoryContextValue;
};

export type NavCategoryContextValue = {
  open: boolean;
  value: NavItemValue;
};

const NavCategoryContext = React.createContext<NavCategoryContextValue | undefined>(
  undefined,
) as React.Context<NavCategoryContextValue>;

const navCategoryContextDefaultValue: NavCategoryContextValue = {
  open: false,
  value: '',
};

export const { Provider: NavCategoryProvider } = NavCategoryContext;

export const useNavCategoryContext_unstable = (): NavCategoryContextValue => {
  return React.useContext(NavCategoryContext) ?? navCategoryContextDefaultValue;
};
