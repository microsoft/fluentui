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
export const createClassResolver = (classes: ClassDictionary, slotNames: string[]) => {
  const { slots, modifiers, enums } = createResolvedMap(classes, slotNames);

  return (state: GenericDictionary): ClassDictionary => {
    return Object.keys(slots).reduce((acc, slotName) => {
      acc[slotName] = [
        ...(slotName === 'root' && state.className ? [state.className] : []),
        slots[slotName],

        ...Object.keys(modifiers)
          .filter((key: string) => !!state[key])
          .map((key: string) => modifiers[key]),

        ...Object.keys(enums)
          .filter((key: string) => state[key] && enums[key][state[key]])
          .map((key: string) => enums[key][state[key]]),
      ].join(' ');

      return acc;
    }, {} as ClassDictionary);
  };
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

type ResolvedMap = {
  slots: Record<string, string | string[]>;
  modifiers: Record<string, string | string[]>;
  enums: Record<string, Record<string, string | string[]>>;
};

function createResolvedMap(classes: ClassDictionary, slotNames: string[]): ResolvedMap {
  const resolvedMap: ResolvedMap = {
    slots: {},
    modifiers: {},
    enums: {},
  };
  const { slots, modifiers, enums } = resolvedMap;

  // Iterate through classes
  Object.keys(classes).forEach((key: string) => {
    const classValue = classes[key];

    if (classValue) {
      // If the class is named the same as a slot, add it to the slot.
      if (slotNames.indexOf(key) >= 0) {
        addClassTo(slots, key, classValue);
      } else if (key.indexOf('_') >= 0) {
        // The class is an enum value. Add if the prop exists and matches.
        const parts = key.split('_');
        const enumName = parts[0];
        const enumValue = parts[1];

        enums[enumName] = enums[enumName] || {};
        addClassTo(enums[enumName], enumValue, classValue);
      } else {
        addClassTo(modifiers, key, classValue);
      }
    }
  });

  // Reduce map to strings
  Object.keys(slots).reduce((acc, key) => {
    slots[key] = (slots[key] as string[]).join(' ');
    return acc;
  }, slots);
  Object.keys(modifiers).reduce((acc, key) => {
    modifiers[key] = (modifiers[key] as string[]).join(' ');
    return acc;
  }, modifiers);
  Object.keys(enums).forEach(key =>
    Object.keys(enums[key]).forEach(val =>
      Object.keys(enums[key][val]).reduce((acc, valKey) => {
        enums[key][val] = (enums[key][val] as string[]).join(' ');
        return acc;
      }, enums[key]),
    ),
  );

  return resolvedMap;
}
