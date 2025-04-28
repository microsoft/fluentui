/**
 * cleanFstTokenName is used to convert token names into a directory style format
 * It normalizes spaces, brackets, and dashes into slashes
 * running 'toCamelCase' on the output will result in the token's name
 */
export const cleanFstTokenName = (originalTokenName: string) => {
  return originalTokenName.replace(/\s+|\)/g, '').replace(/\/?\(|-+/g, '/');
};
