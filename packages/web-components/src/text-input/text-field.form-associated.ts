import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _TextField extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _TextField extends FormAssociated {}

/**
 * @beta
 */
export class FormAssociatedTextField extends FormAssociated(_TextField) {
  proxy = document.createElement('input');
}
