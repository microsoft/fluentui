import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _Button extends FASTElement {}
type _Button = FormAssociated;

/**
 * @beta
 */
export class FormAssociatedButton extends FormAssociated(_Button) {
  proxy = document.createElement('input');
}
