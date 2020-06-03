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
  // This is in creation time, so this will happen once per css file.
  const { slots, modifiers, enums } = createResolvedMap(classes, slotNames);

  // Everything in the function below will happen at runtime, so it's very critical that this
  // code is as minimal as possible.
  return (state: GenericDictionary): ClassDictionary =>
    Object.keys(slots).reduce((acc, slotName) => {
      acc[slotName] = [
        // Ensure state.className lands on the root
        ...(slotName === 'root' && state.className ? [state.className] : []),

        // Grab the slot className
        slots[slotName],

        // Filter out the enabled modifier classes and mix them in
        ...Object.keys(modifiers)
          .filter((key: string) => !!state[key])
          .map((key: string) => modifiers[key]),

        // Filter out the enum value matching classes and mix them in
        ...Object.keys(enums)
          .filter((key: string) => state[key] && enums[key][state[key]])
          .map((key: string) => enums[key][state[key]]),
      ].join(' ');

      return acc;
    }, {} as ClassDictionary);
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

/**
 * Helper to take a css module map and translate it into { slots, modifiers,  enums } where
 * slots are a matched name in the slotNames array, enums have underscores splitting the matched
 * name/value, and modifiers are everything else. Creating this split definition keeps runtime
 * resolution work to a minimum.
 */
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
  collapseArray(slots);
  collapseArray(modifiers);
  Object.keys(enums).forEach(enumPropName => collapseArray(enums[enumPropName]));

  return resolvedMap;
}

function collapseArray(obj: Record<string, string | string[]>) {
  Object.keys(obj).forEach(propName => {
    obj[propName] = (obj[propName] as string[]).join(' ');
  });
}
