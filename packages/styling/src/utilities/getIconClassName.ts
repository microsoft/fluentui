import {
  IconClassNames
} from '../classNames/IconClassNames';

let _lowerCaseIconMap: { [key: string]: string };

/**
 * Gets an icon classname, given an icon name (case insensitive.) The class name can be attached to
 * an I tag with no additional classnames. This will render the icon code using a ::before pseudo-selector.
 *
 * @public
 */
export function getIconClassName(name: string): string {
  if (!name) {
    return '';
  }

  // Make the lookup case insensitive. Note that this implementation is different in Fabric 5, but this method
  // is being added sooner to make it easier to transition products.
  name = name.toLowerCase();

  if (!_lowerCaseIconMap) {
    _lowerCaseIconMap = {};

    for (let iconName in IconClassNames) {
      if (IconClassNames.hasOwnProperty(iconName)) {
        _lowerCaseIconMap[iconName.toLowerCase()] = iconName;
      }
    }
  }

  return IconClassNames[_lowerCaseIconMap[name.toLowerCase()]] || '';
}
