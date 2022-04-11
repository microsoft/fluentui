import { FormAssociated } from '@microsoft/fast-foundation';
import { FASTElement } from '@microsoft/fast-element';

/* eslint-disable @typescript-eslint/naming-convention */
class _Button extends FASTElement {}
interface _Button extends FormAssociated {}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @internal
 */
export class FormAssociatedButton extends FormAssociated(_Button) {
  proxy = document.createElement('input');
}
