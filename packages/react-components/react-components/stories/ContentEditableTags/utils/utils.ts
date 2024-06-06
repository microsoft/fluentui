export const isKeyCharacter = event => {
  const isNumeric = typeof event.which === 'number' && event.which > 0 && event.which !== 8;
  const isModifier = event.key.length > 1 || event.ctrlKey || event.metaKey || event.altKey;
  if (isNumeric && !isModifier) {
    return true;
  }
  return false;
};
