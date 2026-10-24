# Fluent v8 sunsetting bug process

This document outlines the updated standards for addressing bugs on Fluent v8 in its sunsetting phase. This covers the bar for addressing bugs until v8 is fully deprecated in July 2026, at which point only critical / sev0 bugs will be addressed on a case-by-case basis.

## Timeline

- July 2025: Fluent v8 began its sunsetting phase in as [announced in our newsletter](https://outlook.office.com/newsletters/newsletters/a2e6ab48b33a3341a4ec2ac99108eebb23). Bug handling is described in this document.
- July 2026: v8 will be fully in maintenance mode, only critical bugs will be considered on a case-by-case basis.

From FY26 onward, all existing surfaces should be scheduled for migrations and all new development should use Fluent UI React v9.

## Will fix bugs:

1. Security issues
2. Severity 1 accessibility issues, which is _not_ determined by vendor severity tags. Accessibility issues are considered sev1 if they:
   - Have no user workaround at all. Workarounds could either be built into the component, or be achieved through using an entirely different component, linked page, or user flow.
   - Have no possible workaround or fix from the authoring team
   - The component with the bug must be part of a core scenario in a product from a partner team, and necessary for users to complete that core scenario.
   - If the bug is part of a newly applied standard, it will not be fixed

## Will not fix:

1. New feature requests
2. Changes to longstanding functionality (for example, non-freeform ComboBox handles typing oddly, but that behavior will not be changed in v8)
3. PRs that have an appreciable risk of introducing breaking changes. Breaking changes can include (but are not limited to):
   - Changes to tokens used in styles
   - Style updates that involve colors, especially for text, background, and border (which can impact high contrast in unexpected ways, e.g. link style updates breaking their appearance within DetailsList)
   - Anything that meaningfully touches core functionality of the library (e.g. positioning, layers, FocusZone and FocusTrapZone, ThemeProvider, etc.)
4. Low-severity issues

## May fix / will consider

To ease the transition process for partner teams, we will continue accepting easy fixes and contributions on a case-by-case basis through the end of 2025. By July 2026, Fluent v8 will be fully in maintenance mode, and only accepting security and sev1 accessibility fixes.

1. Some sev2 accessibility issues will be considered based on the following criteria:
   - They are directly requested by a partner team who cannot currently move to v9
   - They are relatively recent regression
   - They fall under an accessibility standard no later than WCAG 2.2, or a law in place earlier than May 2025
   - At the discretion of the Fluent team
2. PRs contributed by partner teams and third parties will be considered if they:
   - Are not covered by the “will not fix” criteria
   - Do not introduce additional changes to the user-facing experience, except for the bug in question
   - At the discretion of the Fluent team
