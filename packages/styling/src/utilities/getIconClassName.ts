import { mergeStyles, IStyle } from '@uifabric/merge-styles';
import { getIcon } from './icons';

const defaultIconStyles: IStyle = {
  display: 'inline-block'
};

/**
 * Gets an icon classname. You should be able to add this classname to an I tag with no
 * additional classnames, and render the icon.
 *
 * @public
 */
export function getIconClassName(name: string): string {
  let className = '';
  const icon = getIcon(name);

  if (icon) {
    className = mergeStyles(icon.subset.className, defaultIconStyles, {
      selectors: {
        '::before': {
          content: `"${icon.code}"`
        }
      }
    });
  }

  return className;
}
