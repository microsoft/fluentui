import { ClassDictionary, Dictionary } from './types';
import cx from 'classnames';

function addClassTo(dictionary: Dictionary, slotName: string, value?: string | false) {
  if (value) {
    if (!dictionary[slotName]) {
      dictionary[slotName] = { className: [value] };
    } else {
      dictionary[slotName].className.push(value);
    }
  }
}

// tslint:disable-next-line: no-any
export const createClassResolver = (classes: ClassDictionary, slots: { [key: string]: any }) => (state: Dictionary) => {
  // First break up the class names based on prefixes:
  //
  // "_value" = flag, where "Value" is the flag
  // "_size_large" = enum where "size" is the enum prop and "large" is the value
  // default: slot class

  const slotProps: Dictionary = {};

  // Add the default className to root
  addClassTo(slotProps, 'root', state.className);

  if (classes) {
    // Iterate through classes
    Object.keys(classes).forEach((key: string) => {
      // If the class is named the same as a slot, add it to the slot.
      if (slots.hasOwnProperty(key)) {
        addClassTo(slotProps, key, classes[key]);
      } else if (key.indexOf('_') >= 0) {
        // The class is an enum value. Add if the prop exists and matches.
        const parts = key.split('_');
        const enumName = parts[0];
        const enumValue = parts[1];

        addClassTo(slotProps, 'root', state[enumName] === enumValue && classes[key]);
      } else {
        addClassTo(slotProps, 'root', state[key] && classes[key]);
      }
    });
  }

  Object.keys(slotProps).forEach((key: string) => (slotProps[key].className = cx(...slotProps[key].className)));

  return slotProps;
};
