import { GenericDictionary, ClassDictionary } from './types';
import { appendClasses } from './appendClasses';

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
export const createClassResolver = (classes: ClassDictionary) => {
  // This is in creation time, so this will happen once per css file.
  const { slots, modifiers, enums } = createResolvedMap(classes);

  // Everything in the function below will happen at runtime, so it's very critical that this
  // code is as minimal as possible.
  return function classResolver(state: GenericDictionary): ClassDictionary {
    const resolvedClasses: Record<string, string> = {};

    let modifierClasses = '';
    for (const modifierName of Object.keys(modifiers)) {
      if (state[modifierName]) {
        modifierClasses = appendClasses(modifierClasses, modifiers[modifierName]);
      }
    }

    let enumClasses = '';
    for (const enumName of Object.keys(enums)) {
      const enumValues = enums[enumName];
      // if we have a class which matches the enumName and current state value, add it.
      if (enumValues[state[enumName]]) {
        enumClasses = appendClasses(enumClasses, enumValues[state[enumName]]);
      }
    }

    for (const slotName of Object.keys(slots)) {
      resolvedClasses[slotName] = appendClasses(slots[slotName], modifierClasses, enumClasses);
    }
    return resolvedClasses as ClassDictionary;
  };
};

type ResolvedMap = {
  slots: Record<string, string>;
  modifiers: Record<string, string>;
  enums: Record<string, Record<string, string>>;
};

/**
 * Helper to take a css module map and translate it into { slots, modifiers, enums } where
 * slots are a matched name in the slotNames array, enums have underscores splitting the matched
 * name/value, and modifiers are everything else. Creating this split definition keeps runtime
 * resolution work to a minimum.
 */
export function createResolvedMap(classes: ClassDictionary): ResolvedMap {
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
      const classParts = key.split('_');

      // If the class is named the same as a slot, add it to the slot.
      switch (classParts.length) {
        case 2: // modifier (_modifierName)
          modifiers[classParts[1]] = classValue;
          break;

        case 3: // enum (_enumName_enumValue)
          const enumName = classParts[1];
          const enumValue = classParts[2];
          const enumValues = (enums[enumName] = enums[enumName] || {});

          enumValues[enumValue] = classValue;
          break;

        default:
          // slot (root)
          slots[key] = classValue;
      }
    }
  });

  return resolvedMap;
}
