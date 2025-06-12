import * as React from 'react';
import { NavItemValue } from './NavContext.types';

// This context is analogous to AccordionHeaderContext

export type NavCategoryItemContextValue = {
  open: boolean;
  value: NavItemValue;
};

const NavCategoryItemContext = React.createContext<NavCategoryItemContextValue | undefined>(
  undefined,
) as React.Context<NavCategoryItemContextValue>;

const NavCategoryItemContextDefaultValues = {
  open: false,
};

export const { Provider: NavCategoryItemProvider } = NavCategoryItemContext;

export const useNavCategoryItemContext_unstable = () =>
  React.useContext(NavCategoryItemContext) ?? NavCategoryItemContextDefaultValues;
