import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _TextField extends FASTElement {}
type _TextField = FormAssociated;

/**
 * @beta
 */
export class FormAssociatedTextField extends FormAssociated(_TextField) {
  proxy = document.createElement('input');
}
