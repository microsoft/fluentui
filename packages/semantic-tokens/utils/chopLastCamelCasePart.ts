export const chopLastCamelCasePart = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .slice(0, -1)
    .join('');
