import { ComposePreparedOptions, ClassDictionary, GenericDictionary } from './types';
import { MergePropsResult } from './mergeProps';
import { appendClasses } from './appendClasses';

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

  for (const classFunctionOrObject of classes) {
    const classObj: ClassDictionary | undefined =
      // tslint:disable-next-line:no-any
      typeof classFunctionOrObject === 'function' ? classFunctionOrObject(state, slots as any) : classFunctionOrObject;

    if (classObj) {
      for (const slotName of Object.keys(classObj)) {
        if (classObj[slotName] && slots[slotName]) {
          appendToSlotClassName(slotProps, slotName, classObj[slotName]);
        }
      }
    }
  }

  // tslint:disable-next-line:no-any
  appendToSlotClassName(slotProps, 'root', (state as any).className);

  return result;
}

export function appendToSlotClassName(
  slotProps: Record<string, GenericDictionary>,
  slotName: string,
  className: string,
) {
  if (className) {
    const slot = (slotProps[slotName] = slotProps[slotName] || {});
    slot.className = appendClasses(slot.className, className);
  }
}
