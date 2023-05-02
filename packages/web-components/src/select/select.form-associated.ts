import { FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '@microsoft/fast-foundation';

class _Select extends FASTElement {}
type _Select = FormAssociated

/**
 * A form-associated base class for the Fluent Select web component.
 *
 * @beta
 */
export class FormAssociatedSelect extends FormAssociated(_Select) {
  proxy = document.createElement('select');
}
