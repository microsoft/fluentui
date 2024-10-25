import { observable } from '@microsoft/fast-element';

import { AbstractListbox } from '../patterns/abstract-listbox.js';
import type { Option } from '../option/option.js';

/**
 * Base class for a DropdownList custom element.
 *
 * @public
 */
export class BaseDropdownList extends AbstractListbox {
  /**
   * The option elements.
   *
   * @readonly
   * @public
   */
  @observable
  public override options!: Option[];
}

/**
 * A DropdownList custom element.
 *
 * @public
 */
export class DropdownList extends BaseDropdownList {}
