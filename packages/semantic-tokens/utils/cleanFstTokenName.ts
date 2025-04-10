/**
 * cleanFstTokenName is used to convert token names into a directory style format
 * It normalizes spaces, brackets, and dashes into slashes
 * running 'toCamelCase' on the output will result in the token's name
 */
export const cleanFstTokenName = (originalTokenName: string) => {
  // Ignore spaces, they shouldn't occur but may exist in brackets
  let newTokenName = originalTokenName.replace(/ /g, '');
  // Ensure opening brackets is replaced with a slash
  // Some tokens already have a slash between brackets, handle these first
  // Handle: '/(' -> '/' (prevents '//' duplicates if already slashed)
  newTokenName = newTokenName.replace(/\/\(/g, '/');
  // Handle: '(' -> '/' (base case, no slash and separator in brackets)
  newTokenName = newTokenName.replace(/\(/g, '/');
  // Handle: ')' -> '' (remove closing bracket, no separator)
  newTokenName = newTokenName.replace(/\)/g, '');

  // Convert any dashes into slashes
  newTokenName = newTokenName.replace(/\-/g, '/');

  return newTokenName;
};
