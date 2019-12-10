import * as React from 'react';
// import { IBaseThemeShape } from './ThemeShape';

/*
interface IProviderProps<T extends IBaseThemeShape> {
  theme: T;
}
*/

export const ProviderContext = React.createContext(null);

export const Provider: React.FunctionComponent<any> = props => {
  return <ProviderContext.Provider value={props.theme}>{props.children}</ProviderContext.Provider>;
};
