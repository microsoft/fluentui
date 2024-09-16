## Supported Configurations

- Microsoft Edge & Narrator

## Other Configurations

Issues that do not reproduce in Edge & Narrator should be filed with the respective screen reading software, not the Fluent UI repo.

## Troubleshooting

1. Check for duplicate issues! Many accessibility issues are reported multiple times. If they are caused by external factors such as screen reader issues they may take some time to resolve.

1. Verify that any reported accessibility tool errors are valid. For example, one oft-reported issue concerns contrast against disabled text, and disabled text does not have a contrast requirement. Consider checking accessibility tool repos for existing issues:

   1. [Accessibility Insights](https://github.com/microsoft/accessibility-insights-web/issues)
   1. [Axe Core](https://github.com/dequelabs/axe-core/issues) (used by Accessibility Insights)

1. Find a reference example implementing the same [ARIA `role`](https://www.w3.org/TR/wai-aria-1.1/#role_definitions) and see if the reference exhibits the same behavior.

   - Examples are usually found with a simple search of terms of "aria _role_ example", such as ["aria grid example"](https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html).
   - Determine what `role` the component is using. This is most often accomplished by looking for `role` attribute value either in the source code or by inspecting the element's `role` attribute in a browser.
   - The easiest way to find a reference is to search for `aria role x` or `aria attribute y` where `x` is the component role and `y` is the attribute name. For example searching `aria grid role` brings up some reference implementations for various grid implementations.

1. Test the ARIA reference example with Microsoft Edge and Narrator.

   - If the issue does happen with Microsoft Edge and Narrator with ARIA reference examples, this is a strong indicator of a Microsoft Edge or Narrator issue and should be resolved as external.
   - If the issue does not happen with Microsoft Edge and Narrator:
     - If the issue is reported against JAWS, NVDA, or another browser, the issue is with the screen reader or browser and should most likely be resolved as external.
     - If the issue is reported against Microsoft Edge & Narrator, then continue trubleshooting below.

1. Verify ARIA is implemented by Fluent UI React correctly. Note applicable references:

   - [ARIA Role Definitions](https://www.w3.org/TR/wai-aria-1.1/#role_definitions) for determining component attribute behavior by component's `role` attribute.
   - [ARIA Attributes](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def) for determining required attributes and correct attribute behavior.
   - [ARIA Design Patterns](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex) for specifying component behavior, such as navigation behavior.

1. Use auditing tools such as [Accessibility Insights](https://accessibilityinsights.io/) to validate implementation.

## Fixing Issues

### [No ARIA is better than bad ARIA.](https://www.w3.org/TR/wai-aria-practices-1.1/#no_aria_better_bad_aria)

Don't assume:

- That any missing ARIA attribute is required.
- That any ARIA is better than no ARIA.
- That the issue is with Fluent UI React as opposed to MS Edge/Narrator/consuming app/third-party software.

Before modifying ARIA roles, attributes or component navigation behavior, make sure you check the [ARIA Role Definitions](https://www.w3.org/TR/wai-aria-1.1/#role_definitions), [ARIA Attributes](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def), and [ARIA Design Patterns](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex) to verify correct behavior.

## Example of Reported Issue

Let's say we have an issue that says `Toggle` is not dictating its description AND `aria-label` must be added to `Toggle` for voice dictation.

The first observation is that this is actually two different bugs, both of which should be verified. They are not necessarily related.

`Toggle` has the `role` of `switch`. We can review the [`switch` role reference](https://www.w3.org/TR/wai-aria-1.1/#switch) to find required attributes. It tells us that `aria-label` is **not** a required attribute.

We can review the [`aria-label` attribute reference](https://www.w3.org/TR/wai-aria-1.1/#aria-label) to find the following:

> If the label text is visible on screen, authors SHOULD use aria-labelledby and SHOULD NOT use aria-label. There may be instances where the name of an element cannot be determined programmatically from the content of the element, and there are cases where providing a visible label is not the desired user experience. Most host languages provide an attribute that could be used to name the element (e.g., the title attribute in HTML), yet this could present a browser tooltip. In the cases where a visible label or visible tooltip is undesirable, authors MAY set the accessible name of the element using aria-label. As required by the text alternative computation, user agents give precedence to aria-labelledby over aria-label when computing the accessible name property.

What does this tell us?

- `aria-label` is **not** a required property
- We shouldn’t be providing `aria-label` if the description is available onscreen. Rather, we should be using `aria-labelledby` attribute.
- `aria-label` should **only be used** if no descriptive text is available elsewhere on the screen.

What can we conclude?

- Since `Toggle` provides an onscreen description already, it doesn't make sense to always provide `aria-label`.
- If `Toggle` has a descriptive label on it, we should **NOT** be redundantly putting this information in `aria-label`. Instead, we should be using `aria-labelledby` to point to the existing label text.
- We should make sure `Toggle` has an `aria-labelledby` attribute pointing to the existing onscreen description. Users should be able to optionally set `aria-label` for instances where an onscreen description is not available.
- If `Toggle` is doing what it should according to the ARIA reference, we can also consider that this may be a browser or screen reader bug.

## References

- [ARIA Role Definitions](https://www.w3.org/TR/wai-aria-1.1/#role_definitions) for determining component attribute behavior by component's `role` definition.
- [ARIA Attributes](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def) for determining required attributes and correct attribute behavior.
- [ARIA Design Patterns](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex) for specifying component behavior, such as navigation behavior.

## Issue Reporting

### Microsoft Edge

1. Sign into https://issues.microsoftedge.com with your account.
1. Check for a pre-existing issue, hit `Me too` under `Reports` on the issue if it exists. Otherwise, `Open new issue`.
1. Please provide the Windows build number (`Settings` > `System` > `About`), which screen readers replicate the issue, detailed steps to reproduce the issue, and a simplified test case, such as a JS Fiddle.

### Narrator

The best way to file feedback is via the feedback hub built into Windows. Put `Accessibility` and `Narrator` in the feedback item for increased visibility.
