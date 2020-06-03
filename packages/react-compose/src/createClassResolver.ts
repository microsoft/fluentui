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
export const createClassResolver = (classes: ClassDictionary) => {
  // This is in creation time, so this will happen once per css file.
  const { slots, modifiers, enums } = createResolvedMap(classes);

  // Everything in the function below will happen at runtime, so it's very critical that this
  // code is as minimal as possible.
  // tslint:disable-next-line:no-function-expression
  return function classResolver(state: GenericDictionary): ClassDictionary {
    const resolvedClasses: Record<string, string | string[]> = {};

    const modifierClasses = [];
    for (const modifierName of Object.keys(modifiers)) {
      if (!!state[modifierName]) {
        modifierClasses.push(modifiers[modifierName]);
      }
    }

    const enumClasses = [];
    for (const enumName of Object.keys(enums)) {
      const enumValueClasses = enums[enumName];
      if (enumValueClasses[state[enumName]]) {
        enumClasses.push(enumValueClasses[state[enumName]]);
      }
    }

    for (const slotName of Object.keys(slots)) {
      resolvedClasses[slotName] = [
        slotName === 'root' && state.className ? state.className : '',
        slots[slotName] || '',
        ...modifierClasses,
        ...enumClasses,
      ]
        .filter(Boolean)
        .join(' ');
    }

    return resolvedClasses as ClassDictionary;
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

/**
 * Helper to take a css module map and translate it into { slots, modifiers,  enums } where
 * slots are a matched name in the slotNames array, enums have underscores splitting the matched
 * name/value, and modifiers are everything else. Creating this split definition keeps runtime
 * resolution work to a minimum.
 */
function createResolvedMap(classes: ClassDictionary): ResolvedMap {
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
      if (key.charAt(0) === '_') {
        addClassTo(modifiers, key.substr(1), classValue);
      } else if (key.indexOf('_') >= 0) {
        // The class is an enum value. Add if the prop exists and matches.
        const parts = key.split('_');
        const enumName = parts[0];
        const enumValue = parts[1];

        enums[enumName] = enums[enumName] || {};
        addClassTo(enums[enumName], enumValue, classValue);
      } else {
        addClassTo(slots, key, classValue);
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
