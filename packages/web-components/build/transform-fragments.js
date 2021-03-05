const onlySpace = /^\s+$/g;
const spaceBetforeTagClose = /\s+(>)/g;
const spaceBetweenTags = /(>)\s+(<)/g;
const spaceBetweenAttrs = /(["'\w])(?!\s*>)\s+/g;
const openEnded = /(?:[^="'\w])?(["'\w])\s*$/g;

export function transformHTMLFragment(data) {
  // if the chunk is only space, collapse and return it
  if (data.match(onlySpace)) {
    return data.replace(onlySpace, ' ');
  }

  // remove space before tag close
  data = data.replace(spaceBetforeTagClose, '$1');

  // remove space between tags
  data = data.replace(spaceBetweenTags, '$1$2');

  // remove space between attributes
  data = data.replace(spaceBetweenAttrs, '$1 ');

  if (data.match(openEnded)) {
    return data.trimStart();
  }

  return data.trim();
}

const newlines = /\n/g;
const separators = /\s*([\{\};])\s*/g;
const lastProp = /;\s*(\})/g;
const extraSpaces = /\s\s+/g;
const endingSpaces = / ?\s+$/g;

export function transformCSSFragment(data) {
  // newlines
  data = data.replace(newlines, '');

  // Remove extra space, but not too much
  data = data.replace(separators, '$1');

  // Remove semicolons followed by property list end
  data = data.replace(lastProp, '$1');

  // space might be between property values or between selectors
  data = data.replace(endingSpaces, ' ');

  return data.replace(extraSpaces, ' ');
}
