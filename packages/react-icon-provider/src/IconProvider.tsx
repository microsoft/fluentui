import { IIconSubset } from '@fluentui/style-utilities';
import * as React from 'react';
import { IconProviderProps } from './IconProvider.types';

/**
 * Context for providing the window.
 */
export const IconContext = React.createContext<IconProviderProps>({
  icons: { icons: {} },
});

/**
 * Hook to access the Icon object. This can be overridden contextually using the `IconProvider`.
 */
export const useIcon = (): IIconSubset | undefined => React.useContext(IconContext).icons;

/**
 * Component to provide the icon override object contextually. This is useful when rendering a different
 * Icon from the default svg Icon provided
 */
export const IconProvider: React.FunctionComponent<IconProviderProps> = props => {
  return <IconContext.Provider value={props}>{props.children}</IconContext.Provider>;
};
