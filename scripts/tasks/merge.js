module.exports = merge;

/**
 *
 * @param {Record<string,any>} obj1
 * @param {Record<string,any>} obj2
 */
function merge(obj1, obj2) {
  const merged = Object.assign({}, obj1);

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
