import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Checkbox extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _Checkbox extends CheckableFormAssociated {}

/**
 * @beta
 */
export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
  proxy = document.createElement('input');
}
