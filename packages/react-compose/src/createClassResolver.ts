import { GenericDictionary, ClassDictionary } from './types';

/**
 * `createClassResolver` is a factory function which creates a state to classmap resolver for
 * slot specific class names. It can be used in conjunction with the `compose` option `classes` to
 * inject css modules without writing cx(...) logic manually distributing classnames.
 *
 * Class names which map to slots are automatically distributed to correct slot props.
 *
 * Class names with an underscore are interpretted as enum matchable classes. For example,
 * the class "size_large" would be applied to the `root` slot when the component's state contains
 * a prop `size` with a value `large`.
 *
 * Remaining class names would be interpretted as modifiers, applied to the `root` slot when
 * the component `state` contains a truthy matching prop name.
 */
export const createClassResolver = (classes: ClassDictionary) => (
  state: GenericDictionary,
  slots: GenericDictionary,
): ClassDictionary => {
  const classMap: GenericDictionary = {};
  const modifiers: string[] = [];

  // Add the default className to root
  addClassTo(classMap, 'root', state.className);

  if (classes) {
    // Iterate through classes
    Object.keys(classes).forEach((key: string) => {
      const classValue = classes[key];

      if (classValue) {
        // If the class is named the same as a slot, add it to the slot.
        if (slots.hasOwnProperty(key)) {
          addClassTo(classMap, key, classValue);
        } else if (key.indexOf('_') >= 0) {
          // The class is an enum value. Add if the prop exists and matches.
          const parts = key.split('_');
          const enumName = parts[0];
          const enumValue = parts[1];

          state[enumName] === enumValue && modifiers.push(classValue);
        } else {
          state[key] && modifiers.push(classValue);
        }
      }
    });

    // Convert the className arrays to strings.
    Object.keys(classMap).forEach((key: string) => (classMap[key] = classMap[key].concat(modifiers).join(' ')));
  }

  return classMap;
};

/**
 * Helper function to update slot arrays within a class map.
 */
function addClassTo(slotProps: GenericDictionary, slotName: string, className?: string | false) {
  if (className) {
    if (!slotProps[slotName]) {
      slotProps[slotName] = [className];
    } else {
      slotProps[slotName].push(className);
    }
  }
}
