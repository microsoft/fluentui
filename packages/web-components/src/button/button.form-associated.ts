import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _Button extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _Button extends FormAssociated {}

/**
 * @beta
 */
export class FormAssociatedButton extends FormAssociated(_Button) {
  proxy = document.createElement('input');
}
