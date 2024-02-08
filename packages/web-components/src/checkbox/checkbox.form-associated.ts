import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Checkbox extends FASTElement {}
type _Checkbox = CheckableFormAssociated;

/**
 * @beta
 */
export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
  proxy = document.createElement('input');
}
