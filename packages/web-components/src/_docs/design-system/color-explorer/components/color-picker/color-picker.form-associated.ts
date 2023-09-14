import { FormAssociated, FoundationElement } from '@microsoft/fast-foundation';

/* eslint-disable */
class _ColorPicker extends FoundationElement {}
interface _ColorPicker extends FormAssociated {}
/* eslint-enable */

/**
 * A form-associated base class for the component.
 *
 * @internal
 */
export class FormAssociatedColorPicker extends FormAssociated(_ColorPicker) {
  proxy: HTMLInputElement = document.createElement('input');
}
