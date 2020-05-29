import { ComposePreparedOptions, ClassDictionary } from './types';
import { MergePropsResult } from './mergeProps';

/**
 * Helper utility which takes in a classes array from compose options, resolves functions,
 * merges them into a final result, and distributes classnames to slotProps within the given
 * resolver result object.
 */
export function resolveClasses<TState>(
  result: MergePropsResult<TState>,
  classes: ComposePreparedOptions['classes'],
): MergePropsResult<TState> {
  const { state, slots, slotProps } = result;
  const classMap: Record<string, string[]> = {};
  const { className } = (state as unknown) as { className: string };

  Object.keys(result.slotProps).forEach((slotName: string) => {
    addToMapArray(classMap, slotName, result.slotProps[slotName].className);
  });

  for (const classFunctionOrObject of classes) {
    const classObj: ClassDictionary | undefined =
      // tslint:disable-next-line:no-any
      typeof classFunctionOrObject === 'function' ? classFunctionOrObject(state, slots as any) : classFunctionOrObject;

    if (classObj) {
      Object.keys(classObj).forEach((key: string) => {
        const classValue = classObj[key];

        if (classValue && slots[key]) {
          addToMapArray(classMap, key, classValue);
        }
      });
    }
  }

  // If a classname has been provided by the user, add it to the root array.
  if (className) {
    addToMapArray(classMap, 'root', className);
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
