import { FASTElement } from '@microsoft/fast-element';
import { CheckableFormAssociated } from '../form-associated/form-associated.js';

class _Switch extends FASTElement {}
type _Switch = CheckableFormAssociated;

/**
 * @beta
 */
export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
  proxy = document.createElement('input');
}
