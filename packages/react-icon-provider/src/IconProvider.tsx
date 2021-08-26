import * as React from 'react';
import type { IIconSubset } from '@fluentui/style-utilities';
import type { IconProviderProps } from './IconProvider.types';

/**
 * Context for providing the IconSubset.
 */
export const IconContext = React.createContext<IIconSubset | undefined>(undefined);

/**
 * Hook to access the Icon subset. Returns the icons that will override the default.
 * This can be overridden contextually using the `IconProvider`.
 */
export const useIconSubset = (): IIconSubset | undefined => React.useContext(IconContext);

/**
 * Component to contextually override one or more of the default SVG icons
 */
export const IconProvider: React.FunctionComponent<IconProviderProps> = props => {
  return <IconContext.Provider value={props.icons}>{props.children}</IconContext.Provider>;
};
