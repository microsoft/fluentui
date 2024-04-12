/**
 * Define all possible CSS display values.
 * @public
 */
export type CSSDisplayPropertyValue =
  | 'block'
  | 'contents'
  | 'flex'
  | 'grid'
  | 'inherit'
  | 'initial'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline-table'
  | 'list-item'
  | 'none'
  | 'run-in'
  | 'table'
  | 'table-caption'
  | 'table-cell'
  | 'table-column'
  | 'table-column-group'
  | 'table-footer-group'
  | 'table-header-group'
  | 'table-row'
  | 'table-row-group';

/**
 * A CSS fragment to set `display: none;` when the host is hidden using the [hidden] attribute.
 * @public
 */
export const hidden = `:host([hidden]){display:none}`;

/**
 * Applies a CSS display property.
 * Also adds CSS rules to not display the element when the [hidden] attribute is applied to the element.
 * @param display - The CSS display property value
 * @public
 */
export function display(displayValue: CSSDisplayPropertyValue): string {
  return `${hidden}:host{display:${displayValue}}`;
}
