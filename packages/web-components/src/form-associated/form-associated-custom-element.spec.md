# Form Associated Custom Elements

## Overview

This spec regards a general implementation for components that should be form-associated, including checkboxes, radios, text inputs, and other components which store user input and should be captured during form submission.

### Definitions and acronyms:

- FACE: form-associated custom elements

### Background

Components that are intended to replace a native form element (input, textarea, select) should generally behave like their native counterpart. One key aspect to this is associating the element with the parent form. To do this, we will expose a mechanism to expose form-association to custom elements that can be shared across implementations with maximum re-use.

### Use Cases

Any custom element that should associate a value to a form.

## Design

The implementation will be an _abstract class_ that will extend `FASTElement`. The class will expose implementations for all of the common form element capabilities. It will also expose and manage an implementation for when the FACE APIs are not available.

Another possible implementation is a decorator, but there are a few challenges with that approach:

1. decorators cannot augment the class type directly, so we would need to use a pattern similar to https://www.typescriptlang.org/docs/handbook/mixins.html to gain accurate type definitions
2. Decorators cannot (easily?) provide a _default_ implementation that can be overridden by the extending class. Using an abstract class allows straight overrides of implementation or merging of implementation with super

The implementation will standardize an interface between two common cases: browsers with FACE API support and browsers without.

### Browsers with FACE support

For browsers _with_ support, methods and properties will generally proxy to the `ElementInternals` implementation.

### Browsers with FACE support

The implementation will manage a "proxy" element that will be appended to the light-dom. This proxy element will serve as the custom-element's association to the form. All relevant properties will be forwarded to this element, and certain API calls will retrieve data from it.

### API

#### IDL attributes

- `public static formAssociated: boolean`
  - Requirement of FACE API. This will feature-detect the API and resolve a value corresponding to feature-support.
- `public readonly validity: ValidityState`
  - Returns the [validity](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the component.
- `public readonly form: HTMLFormElement | null`
  - The associated form element.
- `public readonly validationMessage: string`
  - The current validation message of the element.
- `public readonly labels: Node[]`
  - Labels associated to the element. See [risks and challenges](#retrieving-labels).
- `protected abstract proxy: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement`
  - A proxy element that will be appended to the DOM when FACE APIs are unavailable. It will server as the custom-elements connection to the form.
- `protected elementInternals: ElementInternals`
  - Provides form-association through dedicated APIs.
- `protected setFormValue(value: File | string | FormData | null, state?: File | string | FormData): void`
  - When using `elementInternals`, this will set the value in the form. With no FACE support, this will do nothing because the value will automatically be associated by the proxy element. This can be overridden as necessary by components with more advanced behavior.
- `protected handleKeyPress(): void`
  - Will trigger implicit submission when `enter` key is pressed to match standard input behavior. Can be overridden or extended.
- `protected setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;`
  - With form association support, will set the validity of the component. With no form association, this will do nothing unless a message is passed. If a message is passed, the proxy element's `setCustomValidity` method will be invoked with the value of the message.

#### Content attributes

- `id: string`
  - The id attribute of the component. Used for label association.
- `value: string | File | FormData`
  - When provided as a content attribute, value must be a string. When provided as an IDL property, value can be a `string`, `File`, or `FormData`
- `disabled: boolean`
  - Boolean attribute. Disables the form control, ensuring it doesn't participate in form submission
- `name: string`
  - The name of the element. Allows access by name from the associated form.
- `required: boolean`
  - Boolean attribute.

### Risks and Challenges

#### Retrieving labels

Accessing the [`labels`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels) property of a native input returns a `NodeList`. In cases where the FACE APIs are available, the implementation from `ElementInternals.labels` works as expected. In cases where we implement a proxy element though, we need to construct the label set from the following:

1. any parent `<label>`element. Can be retrieved from the proxy element's `labels` property
2. any `<label>` element with `[for="$id"]`, where $id is the `id` attribute _of the custom element_. Because the custom element does not reflect it's `id` attribute to the proxy element (that would result in two elements with the same ID in the DOM), the labels are not automatically associated to the `labels` property of the proxy.

`NodeList`s are not constructable in JavaScript, thus this property is standardized to `Node[]` due to the need to construct the label when implementing with a proxy element. The use of Node[] is intended to map as close to `NodeList` as possible.

#### Clicking labels

Clicking a label of a native input element can have several side effects. First (and in general) it will focus the element. In cases like radio and checkbox, it changes the value of the input. There are likely other side-effects.

How this works under the hood seems to be that clicking the label _also_ invokes a click event on the element the label _labels_.

However, because (in proxy element cases) the label's aren't _actually_ associated to the element, the click event on the custom element isn't ever fired. This is the case for all label's using the `for` attribute to make the association. _Wrapping_ labels (`<label><custom-element></label>`) _do_ seem to fire the click event on the custom element.

See (next steps)[#next-steps].

### Accessibility

No accessibility concerns for this utility. Accessibility will be the concern of the implementing class.

### Globalization

No globalization concerns.

### Security

No new security concerns. Form data sanitation will be the responsibility of the consuming application.

### Performance

Potentially using a MutationObserver to attach new click handlers to label elements. TBD on if we want to do this.

### Dependencies

No Dependencies

### Test Plan

TBD. Form association APIs are very new so JSDOM is not likely to expose the feature. It might make sense to do in-browser tests against browsers both with and without support to ensure parity.

## Resources

- [Form Participation API Explained](https://docs.google.com/document/d/1JO8puctCSpW-ZYGU8lF-h4FWRIDQNDVexzHoOQ2iQmY/edit?pli=1)
- [Creating a form-associated custom element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example)
- [More capable form controls](https://web.dev/more-capable-form-controls/)
- [Implicit submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission)

### Next Steps

- We will solve label-clicking for browsers with no FACE support in the future. A promising approach would be to catch click events on the parent form and delegate focus from there. The edge-case this does not address is elements that are not a descendent of the form element but are still associated using the [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefform) content attributes.
- Determine how autofocus needs to be handled
- Determine how to react to fieldset / form disabling in non-FACE browsers
