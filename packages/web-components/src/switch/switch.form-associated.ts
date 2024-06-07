import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Switch extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _Switch extends CheckableFormAssociated {}

/**
 * @beta
 */
export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
  proxy = document.createElement('input');
}
