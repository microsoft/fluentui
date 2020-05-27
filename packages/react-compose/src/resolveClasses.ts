import { ComposePreparedOptions, ClassDictionary } from './types';
import { OptionsResolverResult } from './createOptionsResolver';

/**
 * Helper utility which takes in a classes array from compose options, resolves functions,
 * merges them into a final result, and distributes classnames to slotProps within the given
 * resolver result object.
 */
export function resolveClasses(
  classes: ComposePreparedOptions['classes'],
  result: OptionsResolverResult,
): OptionsResolverResult {
  const { state, slots, slotProps } = result;
  const classMap: Record<string, string[]> = {};

  Object.keys(result.slotProps).forEach((slotName: string) => {
    addToMapArray(classMap, slotName, result.slotProps[slotName].className);
  });

  for (const classFunctionOrObject of classes) {
    const classObj: ClassDictionary | undefined =
      // tslint:disable-next-line:no-any
      typeof classFunctionOrObject === 'function' ? classFunctionOrObject(state, slots as any) : classFunctionOrObject;
    for (const key in classObj) {
      if (classObj.hasOwnProperty(key)) {
        const className = classObj[key];
        if (className && slots[key]) {
          addToMapArray(classMap, key, className);
        }
      }
    }
  }

  // If a classname has been provided by the user, add it to the root array.
  if (state.className) {
    addToMapArray(classMap, 'root', state.className);
  }

  for (const key in classMap) {
    if (classMap.hasOwnProperty(key)) {
      slotProps[key] = slotProps[key] || {};
      slotProps[key].className = classMap[key].join(' ');
    }
  }

  return result;
}

/**
 * Ensures that map[key] exists, or is initialized as any array, and pushes value to it.
 */
function addToMapArray(map: Record<string, string[]>, key: string, value: string) {
  if (value) {
    if (!map[key]) {
      map[key] = [value];
    } else {
      map[key].push(value);
    }
  }
}
