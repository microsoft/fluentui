import { CheckableFormAssociated } from '@microsoft/fast-foundation';
import { FASTElement } from '@microsoft/fast-element';

/* eslint-disable @typescript-eslint/naming-convention */
class _Radio extends FASTElement {}
interface _Radio extends CheckableFormAssociated {}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * A form-associated base class for the Radio component.
 *
 * @internal
 */
export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
  proxy = document.createElement('input');
}
