import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _Slider extends FASTElement {}
type _Slider = FormAssociated;

/**
 * @beta
 */
export class FormAssociatedSlider extends FormAssociated(_Slider) {
  proxy = document.createElement('input');
}
