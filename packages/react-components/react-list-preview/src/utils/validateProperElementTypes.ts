/**
 * Validates that the List and ListItem elements are compatible
 * @param listRenderedAs - the type of the parent element
 * @param listItemRenderedAs - the type of the child element
 */
export function validateProperElementTypes(listRenderedAs?: string, listItemRenderedAs?: string) {
  if (listItemRenderedAs === 'div' && listRenderedAs !== 'div') {
    throw new Error('ListItem cannot be rendered as a div when its parent is not a div.');
  }
  if (listItemRenderedAs === 'li' && listRenderedAs === 'div') {
    throw new Error('ListItem cannot be rendered as a li when its parent is a div.');
  }
}
