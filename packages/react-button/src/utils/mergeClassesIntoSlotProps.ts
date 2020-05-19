import cx from 'classnames';
import { GenericDictionary } from './mergeProps';

/**
 * NOTE! THIS FILE IS TEMPORARY AND SHOULD BE DELETED ONCE IT HAS MOVED ELSEWHERE.
 */

export const mergeClassesIntoSlotProps = (
  // tslint:disable-next-line:no-any
  classes: GenericDictionary,
  props: GenericDictionary,
  slots: GenericDictionary,
  slotProps: GenericDictionary,
) => {
  // First break up the class names based on prefixes:
  //
  // "_value" = flag, where "Value" is the flag
  // "_size_large" = enum where "size" is the enum prop and "large" is the value
  // default: slot class
  if (classes) {
    Object.keys(classes).forEach(key => {
      if (slots[key]) {
        slotProps[key] = slotProps[key] || {};
        slotProps[key].className = cx(key === 'root' && props.className, slotProps.className, classes[key]);
      } else {
        const slotProp = (slotProps.root = slotProps.root || {});
        // If the classname has "_", it's an enum, otherwise it's a modifier.
        if (key.indexOf('_') >= 0) {
          const parts = key.split('_');
          const enumName = parts[0];
          const enumValue = parts[1];
          slotProp.className = cx(slotProp.className, props[enumName] === enumValue && classes[key]);
        } else {
          slotProp.className = cx(slotProp.className, props[key] && classes[key]);
        }
      }
    });
  }
  return slotProps;
};
