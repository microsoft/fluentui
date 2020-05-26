import { Dictionary, ClassDictionary } from './types';

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
  state: Dictionary,
  slots: Dictionary,
): ClassDictionary => {
  // tslint:disable-next-line:no-any
  const classMap: Record<string, any> = {};

  // Add the default className to root
  // tslint:disable-next-line: no-any
  addClassTo(classMap, 'root', (state as any).className);

  if (classes) {
    // Iterate through classes
    Object.keys(classes).forEach((key: string) => {
      // If the class is named the same as a slot, add it to the slot.
      // tslint:disable-next-line: no-any
      if ((slots as any).hasOwnProperty(key)) {
        addClassTo(classMap, key, classes[key]);
      } else if (key.indexOf('_') >= 0) {
        // The class is an enum value. Add if the prop exists and matches.
        const parts = key.split('_');
        const enumName = parts[0];
        const enumValue = parts[1];

        // tslint:disable-next-line: no-any
        addClassTo(classMap, 'root', (state as any)[enumName] === enumValue && classes[key]);
      } else {
        // tslint:disable-next-line: no-any
        addClassTo(classMap, 'root', (state as any)[key] && classes[key]);
      }
    });
  }

  // Convert the className arrays to strings.
  Object.keys(classMap).forEach((key: string) => (classMap[key] = classMap[key].join(' ')));

  return classMap;
};

/**
 * Helper function to update `className` arrays on slots within a dictionary.
 */
// tslint:disable-next-line:no-any
function addClassTo(slotProps: Record<string, any>, slotName: string, className?: string | false) {
  if (className) {
    if (!slotProps[slotName]) {
      slotProps[slotName] = [className];
    } else {
      slotProps[slotName].push(className);
    }
  }
}
