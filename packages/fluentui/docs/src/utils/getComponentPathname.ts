import * as _ from 'lodash';

/**
 * Returns a pathname for a given component.
 *
 * @param info - A Component's *.info.json
 */
const getComponentPathname = (info: { type: string; displayName: string }): string =>
  `/${info.type}s/${_.kebabCase(info.displayName)}`;

export default getComponentPathname;
