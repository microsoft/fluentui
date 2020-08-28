import { GenericDictionary, ClassDictionary } from './types';
import { appendClasses } from '../appendClasses';
import { createResolvedMap } from '../createClassResolver';

export const makeClasses = (classes: ClassDictionary) => {
  // This is in creation time, so this will happen once per css file.
  const { slots, modifiers, enums } = createResolvedMap(classes);

  return function useClasses(state: GenericDictionary) {
    let modifierClasses = '';
    let enumClasses = '';

    for (const modifierName of Object.keys(modifiers)) {
      if (state[modifierName]) {
        modifierClasses = appendClasses(modifierClasses, modifiers[modifierName]);
      }
    }

    for (const enumName of Object.keys(enums)) {
      const enumValues = enums[enumName];
      // if we have a class which matches the enumName and current state value, add it.
      if (enumValues[state[enumName]] !== undefined) {
        enumClasses = appendClasses(enumClasses, enumValues[state[enumName]]);
      }
    }

    state.className = appendClasses(state.className, slots.root, modifierClasses, enumClasses);

    for (const slotName of Object.keys(slots)) {
      if (slotName !== 'root') {
        state[slotName] = state[slotName] || {};
        state[slotName].className = appendClasses(state[slotName]?.className, slots[slotName]);
      }
    }
  };
};
