import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Radio extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _Radio extends CheckableFormAssociated {}

/**
 * @beta
 */
export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
  proxy = document.createElement('input');
}
