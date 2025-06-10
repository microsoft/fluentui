/**
 * Determines the current language code of an element.
 *
 * @param rootNode - the HTMLElement to begin the query from, usually "this" when used in a component controller
 * @returns the language code of the element
 *
 * @public
 */
export function getLanguage(rootNode: HTMLElement): Intl.UnicodeBCP47LocaleIdentifier {
  return rootNode.closest<HTMLElement>('[lang]')?.lang ?? 'en';
}
