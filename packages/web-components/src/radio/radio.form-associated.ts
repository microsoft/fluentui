import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Radio extends FASTElement {}
type _Radio = CheckableFormAssociated;

/**
 * @beta
 */
export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
  proxy = document.createElement('input');
}
