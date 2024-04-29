const isObject = o => o !== null && typeof o === 'object' && !Array.isArray(o);

export const objectKeyToValues = (input: Object, formatter: (string) => string = input => input) => {
  if (!isObject(input)) {
    return input;
  }
  const inner = (result, obj, prefix) => {
    Object.keys(obj).forEach(k => {
      if (isObject(obj[k])) {
        result[k] = {};
        inner(result[k], obj[k], `${prefix}${k}.`);
      } else {
        result[k] = formatter(`${prefix}${k}`);
      }
    });

    return result;
  };

  return inner({}, input, '');
};
