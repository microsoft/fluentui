const isObject = o => o !== null && typeof o === 'object' && !Array.isArray(o);
const isValid = k => k !== '__proto__' && k !== 'prototype' && k !== 'constructor';

// Heads Up!
// Changes here need to consider breaking all object references.
// Merging should result in a themes that are non-mutated and have broken references.
export const deepmerge = (...sources) => {
  const inner = (target, source) => {
    Object.keys(source).forEach(k => {
      if (isValid(k)) {
        if (isObject(source[k])) {
          if (!isObject(target[k])) {
            target[k] = {};
          }

          inner(target[k], source[k]);
        } else {
          target[k] = source[k]; // TODO: do deep clone for arrays? We currently do not have any deep arrays in variables
        }
      }
    });
    return target;
  };
  return sources.filter(Boolean).reduce((acc, src) => inner(acc, src), {});
};
