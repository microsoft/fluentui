import * as React from 'react';
import { MinimalMenuProps } from './types';

export const MenuContext = React.createContext<MinimalMenuProps>({});

export const useMenuContext = () => {
  return React.useContext(MenuContext);
};
