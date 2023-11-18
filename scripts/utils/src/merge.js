/**
 *
 * @param {Record<string,any>} obj1
 * @param {Record<string,any>} obj2
 */
function merge(obj1, obj2) {
  // eslint-disable-next-line prefer-object-spread
  const merged = Object.assign({}, obj1);

  // eslint-disable-next-line guard-for-in
  for (const prop in obj2) {
    const sourceValue = obj2[prop];
    const targetValue = obj1[prop];

    if (sourceValue && Array.isArray(sourceValue) && targetValue && Array.isArray(targetValue)) {
      merged[prop] = targetValue.concat(sourceValue);
    } else if (typeof targetValue === 'object' && typeof sourceValue === 'object') {
      merged[prop] = merge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }

  return merged;
}

exports.merge = merge;
