import { CheckableFormAssociated } from '@microsoft/fast-foundation';
import { FASTElement } from '@microsoft/fast-element';

/* eslint-disable @typescript-eslint/naming-convention */
class _Checkbox extends FASTElement {}
interface _Checkbox extends CheckableFormAssociated {}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 *
 * @internal
 */
export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
  proxy = document.createElement('input');
}
