import { IIconSubset } from '@fluentui/style-utilities';
import * as React from 'react';
import { IconProviderProps } from './IconProvider.types';

/**
 * Context for providing the IconSubset.
 */
export const IconContext = React.createContext<IIconSubset | undefined>(undefined);

/**
 * Hook to access the Icon subset. This can be overridden contextually using the `IconProvider`.
 */
export const useIcon = (): IIconSubset | undefined => React.useContext(IconContext);

/**
 * Component to contextually override one or more of the default SVG icons
 */
export const IconProvider: React.FunctionComponent<IconProviderProps> = props => {
  return <IconContext.Provider value={props.icons}>{props.children}</IconContext.Provider>;
};
