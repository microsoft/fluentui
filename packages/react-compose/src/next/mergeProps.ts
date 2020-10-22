import * as React from 'react';
import { css } from '@uifabric/utilities';
import { GenericDictionary } from './types';
import * as ReactIs from 'react-is';

// avoiding property accessors in hot code path loops for fastest times
const { isArray } = Array;
const { keys } = Object;
const isObject = (val: undefined | null | object): boolean => val !== null && typeof val === 'object' && !isArray(val);

// // concat className
// // merge style|(icon) (deep)
// // other = replace
//
// const classNames = () => null;
// const deepMerge = () => null;
//
// const newState = {
//   ...state,
//   className: classNames(state.className, props.className),
//   styles: deepMerge(state.styles, props.styles),
//   icon: {
//     ...deepMerge(state.icon, props.icon),
//     className: classNames(state.icon.className, props.icon.className),
//   },
//   content: deepMerge(state.content, props.content),
// };

/**
 * Helper which deep clones props, but respectively assigns JSX, object refs, and class names
 * appropriately.
 *
 * @param target - the target object to merge onto.
 * @param sources - one or more prop sets to deep merge onto the target.
 */
export const mergeProps = <TState = GenericDictionary>(
  target: GenericDictionary,
  ...sources: (GenericDictionary | undefined)[]
): TState => {
  for (const props of sources) {
    if (typeof props === 'undefined') {
      continue;
    }

    for (const key of keys(props)) {
      const val = props[key];

      if (typeof val === 'function') {
        console.log('function');
        target[key] = val;
        continue;
      }

      if (React.isValidElement(val)) {
        console.log('jsx', val);
        target[key] = val;
        continue;
      }

      // Heads Up!
      // We encounter className as a key of propTypes but it is a checker fn
      // Do not stringify function values, check that val is not a checker function.
      // TODO: We actually never can know which `className` keys are safe to merge.
      //       The key alone is not enough to know that it is an HTML className attribute that needs merged.
      //       It could be some config for example, at any level of the tree.
      if (key === 'className') {
        console.log('className');
        target[key] = css(target[key], val);
        continue;
      }

      // TODO: improve React Ref Object check here, can we use react-is?
      if (ReactIs.isForwardRef(val) || (isObject(val) && val.hasOwnProperty('current') && keys(val).length === 1)) {
        console.log('ref');
        target[key] = val;
        continue;
      }

      // if (key === 'style' || (isObject(val) && deepMerge.includes(key))) {
      // 1: { foo: target.bar }
      if (isObject(val)) {
        console.log('object');
        target[key] = target[key] || {};

        // TODO: this should preserve mutation of target but encounters infinite loop when doing so
        //       likely needs a stack to check for references before merging, see lodash deep merge
        //       https://github.com/lodash/lodash/blob/86a852fe763935bb64c12589df5391fd7d3bb14d/.internal/baseMergeDeep.js#L34
        // mergeProps(target[key], val);
        target[key] = mergeProps({}, target[key], val);
        continue;
      }

      console.log('unknown', typeof val);
      target[key] = val;
    }
  }

  return target as TState;
};
