## Supported Configurations

We test with the following screen readers, using the latest version:

- NVDA on Windows
- JAWS on Windows
- Narrator on Edge on Windows
- VoiceOver on macOS
- VoiceOver on iOS
- Talkback on Android

We do not support the following browsers, screen readers, or settings:

- Internet Explorer
- Narrator on any browser apart from Edge
- Orca
- Dolphin
- Static zoom to an effective screen resolution smaller than 320px by 256px
- legacy versions of any screen reader

Note: while we test in the listed screen readers, there may still be issues that root cause in browsers, accessibility APIs, or the screen reading software. If there are no authoring errors or workarounds contributing to an issue, the bug will end up being external to the browser or screen reader.

## Other Configurations

For other ATs such as Dragon, ZoomText/Fusion, braille displays, etc. we will still implement fixes if the bug is root causing in Fluent.

## Troubleshooting

1. For internal Microsoft employees, check our [v9 known bugs wiki](https://dev.azure.com/microsoftdesign/fluent-ui/_wiki/wikis/fluent-ui.wiki/334/Fluent-v9-known-issues) or [v8 known bugs wiki](https://dev.azure.com/microsoftdesign/fluent-ui/_wiki/wikis/fluent-ui.wiki/332/Fluent-v8-known-issues) before reporting an issue.

1. Check for duplicate issues! Many accessibility issues are reported multiple times. If they are caused by external factors such as screen reader issues they may take some time to resolve.

1. Verify that any reported accessibility tool errors are valid. For example, one oft-reported issue concerns buttons with a `role=gridcell`, which is now allowed. Consider checking accessibility tool repos for existing issues:

   1. [Accessibility Insights](https://github.com/microsoft/accessibility-insights-web/issues)
   1. [Axe Core](https://github.com/dequelabs/axe-core/issues) (used by Accessibility Insights)

1. Find a reference example implementing the same general [ARIA pattern](https://www.w3.org/WAI/ARIA/apg/patterns/) and see if the reference example exhibits the same behavior in the same browser/assistive tech combination.

   - Determine what `role` the component is using. This is most often accomplished by looking for `role` attribute value either in the source code or by inspecting the element's `role` attribute in a browser.
   - Find the ARIA pattern using the same `role`.
   - Test on the same device, with the same settings, browser, and screen reader or other assistive tech.
   - If the issue does happen with the ARIA Practices reference examples, this is a strong indicator that this is either the expected behavior or that there is a screen reader or browser issue and should be resolved as external.

1. Verify ARIA is implemented by Fluent UI React correctly. Note applicable references:

   - [ARIA Role Definitions](https://w3c.github.io/aria/#role_definitions) for determining component attribute behavior by component's `role` attribute.
   - [ARIA Attributes](https://w3c.github.io/aria/#state_prop_def) for determining required attributes and correct attribute behavior.
   - [ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/) for specifying component behavior, such as navigation behavior.

1. Use auditing tools such as [Accessibility Insights](https://accessibilityinsights.io/) to validate implementation.

## Fixing Issues

### [No ARIA is better than bad ARIA.](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)

Don't assume:

- That the role of a control is incorrect; instead, check whether the usage of the control is supported or if there is another control that would be a better fit.
- That any missing ARIA attribute is required.
- That any ARIA is better than no ARIA.
- That the issue is with Fluent UI React as opposed to MS Edge/Narrator/consuming app/third-party software.

Before modifying ARIA roles, attributes or component navigation behavior, make sure you check the [ARIA Role Definitions](https://w3c.github.io/aria/#role_definitions), [ARIA Attributes](https://w3c.github.io/aria/#state_prop_def), and [ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) to verify correct behavior.

## Example of Reported Issue

Let's say we have an issue that says `Switch` is not dictating its description AND `aria-label` must be added to `Switch` for voice dictation.

The first observation is that this is actually two different bugs, both of which should be verified. They are not necessarily related.

`Switch` has the `role` of `switch`. We can review the [`switch` role reference](https://w3c.github.io/aria/#switch) to find required attributes. It tells us that `aria-label` is **not** a required attribute.

We can review the [`aria-label` attribute reference](https://w3c.github.io/aria/#aria-label) to find the following:

> If the label text is visible on screen, authors SHOULD use aria-labelledby and SHOULD NOT use aria-label. There may be instances where the name of an element cannot be determined programmatically from the content of the element, and there are cases where providing a visible label is not the desired user experience. Most host languages provide an attribute that could be used to name the element (e.g., the title attribute in HTML), yet this could present a browser tooltip. In the cases where a visible label or visible tooltip is undesirable, authors MAY set the accessible name of the element using aria-label. As required by the text alternative computation, user agents give precedence to aria-labelledby over aria-label when computing the accessible name property.

What does this tell us?

- `aria-label` is **not** a required property
- We shouldn’t be providing `aria-label` if the description is available onscreen. Rather, we should be using `aria-labelledby` attribute or a label + `for`/`id` association.
- `aria-label` should **only be used** if no descriptive text is available elsewhere on the screen.

The Fluent [`Switch` documentation](https://react.fluentui.dev/?path=/docs/components-switch--default) additionally has documentation on how to provide a label with the `label` prop, as well as tips on how to write good label text. The built-in `label` prop handles `id` association under the hood, and no further ARIA or other work is required.

What can we conclude?

The true conclusion here is that `Switch` requires an accessible name, but not specifically `aria-label`. There are many instances of logged bugs asking for specific ARIA attributes, when in reality the best solution lies elsewhere. It is always worth taking specific ARIA recommendations in accessibility bugs with a healthy amount of skepticism.

- Since `Switch` provides an onscreen description already, it doesn't make sense to always provide `aria-label`.
- If `Switch` has a descriptive label on it, we should **NOT** be redundantly putting this information in `aria-label`. Instead, we should be using the built-in `label` prop to provide an accessible name.
- If `Switch` has an accessible name and is behaving similarly to the ARIA reference, we can also consider that this may be a browser or screen reader bug.

## References

- [ARIA Role Definitions](https://w3c.github.io/aria/#role_definitions) for determining component attribute behavior by component's `role` definition.
- [ARIA Attributes](https://w3c.github.io/aria/#state_prop_def) for determining required attributes and correct attribute behavior.
- [ARIA Design Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) for specifying component behavior, such as navigation behavior.

## Issue Reporting

To log a bug on Fluent, follow the guidance in our [Partner A11y Issue Filing Process wiki](https://dev.azure.com/microsoftdesign/fluent-ui/_wiki/wikis/fluent-ui.wiki/193/Partner-A11y-Issue-Filing-Process).

To log bugs on Edge, Narrator, or external browsers or external software, first create an isolated reproduction of the issue and then coordinate with the vendor testers to log the bug and track it.
