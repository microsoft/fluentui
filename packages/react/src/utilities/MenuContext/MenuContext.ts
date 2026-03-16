import * as React from 'react';
import type { MinimalMenuProps } from './types';

export const MenuContext = React.createContext<MinimalMenuProps>({});

export const useMenuContext = (): MinimalMenuProps => {
  return React.useContext(MenuContext);
};
