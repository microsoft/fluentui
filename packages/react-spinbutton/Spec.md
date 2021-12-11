# @fluentui/react-spinbutton Spec

## Background

SpinButtons are used to allow numeric input bounded between minimum and maximum values with button controls to increment and decrement the input value by some step amount.

## Prior Art

- Open UI research: https://github.com/openui/open-ui/pull/431
- Github Epic: https://github.com/microsoft/fluentui/issues/20930
- WAI-ARIA Toolbar Example (font size selector): https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html

### [SpinButton in v8/Fabric](https://developer.microsoft.com/en-us/fluentui#/controls/web/spinbutton)

### [SpinButton in v0/Northstar](https://fluentsite.z22.web.core.windows.net/0.59.0/components/input/definition)

Northstar lacks a dedicated `SpinButton` component, rather in has `Input` which takes a `type` prop that can be set to `"number"` making the component equivalent of [<input type="number">](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).

Given that Northstar is only providing the native web platform number input with custom styling applied it will not be considered further. In its place the native number input will be considered as it has behavior similar to `SpinButton`.

### [<input type="number">](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)

This is a standard HTML control for entering numbers. It includes built-in validation to reject non-numeric values and _optionally_ provides stepper arrows to increment or decrement the value.

#### Element Attributes

This is not an exhaustive list of attributes for this element but a curated list of relevant attributes. For a complete list [see the MDN page for `<input type="number">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#additional_attributes)

| Attribute | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| list      | Allows the input to be associated with a `datalist` to provide suggested values |
| max       | Maximum acceptable value. Must be greater than or equal to `min`                |
| min       | Minimum acceptable value. Must be less than or equal to `max`                   |
| step      | The granualarity of the value when incrementing or decrementing                 |

Despite supporting both `min` and `max` attributes a native number input will allow users to enter values outside the specified bounds. This situation is resolved via a process called [constraint validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation) that adds CSS pseudo classes to the element for styling purposes and raises validation events.

There are very few options for cross-browser styling of native number inputs. The [::-webkit-inner-spin-button](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-inner-spin-button) pseudo element allows for selecting the spin buttons of a number input but only supported by Webkit and Blink based browsers.

Native number inputs are meant strictly for number input but what constitutes number input is inconsistent across browsers ([see this Bugzilla issue for details](https://bugzilla.mozilla.org/show_bug.cgi?id=1398528)). You can easily see this on [MDN's simple example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#a_simple_number_input). In Edge 96 you can enter exponential numbers like "1e+343434" but not arbitrary strings like "cats". On the same example in Firefox 95 you can enter both "1e+343434" and "cats".

Inspecting a native number input with devtools shows that it implements the [spinbutton ARIA attributes as described by WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#spinbutton)

#### Examples

- [Controlling Step Size](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#controlling_step_size)
- [Specifying Minimum and Maximum Values](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#specifying_minimum_and_maximum_values)
- [Allowing Decimal Values](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#allowing_decimal_values)
- [Offering Suggested Values](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#offering_suggested_values)

## Sample Code

_Provide some representative example code that uses the proposed API for the component_

## Variants

_Describe visual or functional variants of this control, if applicable. For example, a slider could have a 2D variant._

## API

_List the **Props** and **Slots** proposed for the component. Ideally this would just be a link to the component's `.types.ts` file_

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)
