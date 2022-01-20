import * as React from 'react';
import type { MinimalMenuProps } from './types';

export const MenuContext = React.createContext<MinimalMenuProps>({});

export const useMenuContext_unstable = () => {
  return React.useContext(MenuContext);
};
