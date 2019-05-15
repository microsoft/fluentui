/**
 * Converts a string to URL-compatible "kebab case": converts to lowercase, replaces spaces with dashes,
 * and removes non-letter/number characters.
 *
 * For example, "I'm some awesome text!" becomes "im-some-awesome-text".
 *
 * @param str Text to convert
 */
export function slugify(str: string): string {
  return (str || '')
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Converts a string to camel case.
 * @param str Text to convert
 */
export function camelize(str: string): string {
  return (str || '')
    .replace(/[^\w]+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter: string, index: number) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to Pascal case.
 * @param str Text to convert
 */
export function pascalize(str: string): string {
  return (str || '')
    .replace(/[^\w]+/g, ' ')
    .replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to Title case.
 * @param str Text to convert
 */
export function titleCase(str: string): string {
  return (str || '').replace(/[^\w]+/g, ' ').replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
