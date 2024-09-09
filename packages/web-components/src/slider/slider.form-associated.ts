import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '../form-associated/form-associated.js';

class _Slider extends FASTElement {}
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
interface _Slider extends FormAssociated {}

/**
 * @beta
 */
export class FormAssociatedSlider extends FormAssociated(_Slider) {
  proxy = document.createElement('input');
}
