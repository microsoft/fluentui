import * as _ from 'lodash';
import { ComponentMenuItem } from '../types';

/**
 * Returns a pathname for a given component.
 *
 * @param infoOrMenuItem - A Component's *.info.json or a menu item from `componentMenu.json`.
 */
const getComponentPathname = (infoOrMenuItem: ComponentMenuItem): string => {
  return `/${infoOrMenuItem.type}s/${_.kebabCase(infoOrMenuItem.displayName)}`;
};

export default getComponentPathname;
