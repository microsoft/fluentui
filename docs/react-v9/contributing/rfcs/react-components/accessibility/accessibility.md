# RFC: Accessibility

---

Contributors:
@jurokapsiar

## Summary

Fluent UI components are designed to support various aspects of accessibility, so that they can be used with different input methods (mouse, touch, keyboard, screen readers) as well as fulfill different rendering and layout requirements (theming, zoom, contrast).

## Background

The [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) and [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/) are community-driven standards for accessible web pages and applications. They provide a basic framework allowing consistent usage of web pages and applications with or without assistive technologies.

## Problem statement

Fluent UI components aim to fully respect both WCAG and ARIA and the Fluent UI team is working with the community to improve them. From a technical point of view, three main challenges were identified:

1. Accessibility is a complex field that is often not taught and left behind in planning, design, development, and testing. It can be hard to achieve high quality user experiences and easy to regress them.
2. Each screen reader and browser works differently, often making it hard or even impossible to achieve high quality user experience for all combinations. One of the biggest reasons behind this is that browsers and screen readers are often updated, with each update having the potential to change the user experience from one version to the next.
3. Not all UI/UX designs can be sufficiently represented with the existing ARIA roles and patterns.

## Detailed Design or Proposal

To address these challenges, the following principles will be followed:

- Challenge 1: Sufficient test coverage will be provided, with understandable and documented tests.
- Challenge 2: Components will be created based on well tested prototypes or existing components. We will report and track issues with browsers and assistive tech vendors.
- Challenge 3: We will work with the community to improve standards. We will maintain a set of best practices and validations that help consumers design accessible user interfaces.

### Target accessibility areas

- DOM structure that provides semantical value either by using correct element types or roles
- ARIA attributes that are valid for elements/roles used and provide correct state information about the component or element
- Keyboard navigation (navigation by tabbing, arrow keys, pagination or letter keys, click and right click (Enter/Space, Shift+F10), and close (Escape)) applied based on the component
- Screen reader navigation (Virtual Cursor/Browse mode/Scan mode/VoiceOver keys)
- Touch interaction
- Focus handling when the component is able to move the focus in a predictable way - mostly when opening menus, popups or dialogs (autofocus) or dismissing them using Esc. Focus trap for Dialog and popups
- Sufficient color contrast
- Light, Dark and High Contrast themes
- Displaying focus indicator when keyboard is used to interact with them
- Tested against visual inconsistencies/bugs on a zoom up 400%

Fluent UI components will use [tabster](https://github.com/microsoft/tabster) for focus handling functionality, so that they can be easily integrated with application-level tabster functionality such as delooser and cross-iframe focusing.

### Out of scope

Internationalization, globalization, keyboard shortcuts and language detection are deliberately not part of Fluent UI and should be handled by the hosting application.

Focus handling (except of the points mentioned above) on an application level needs to be handled by the application, preferably using [tabster](https://github.com/microsoft/tabster).

### Component development process

1. Fill in Accessibility section of the [component specification](https://github.com/microsoft/fluentui/blob/master/scripts/create-package/plop-templates-react/Spec.md.hbs)
2. Create prototype or base functionality of the component or reference an existing Fluent UI React or Fluent UI React Northstar component as model example
3. Perform an initial test on prototype, model component or when converged component functionality is available (all supported screen reader/browser combinations, including user testing)
4. Incorporate test results in the component implementation
5. Create [component behavior tests](https://github.com/microsoft/fluentui/tree/master/packages/a11y-testing/src/definitions) and [axe-core tests](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-northstar/test/specs/commonTests/htmlIsAccessibilityCompliant.ts)
6. Document best practices (includes Do's and Don'ts)
7. Document known issues, including links if they are tracked by browsers or screen readers
8. Create validation rules for component - help to identify accessibility issues early in the development phase (or even design with UI Builder)
9. Schedule trusted user test
10. Resolve issues found in the trusted user test

### Testing

Fluent UI components will be tested both automatically and manually:

_Automated tests_ will contain:

- Testing using [accessibility behaviors](https://github.com/microsoft/fluentui/blob/master/packages/a11y-testing/src/definitions/Button/buttonBehaviorDefinition.ts)
- E2E tests using [cypress](https://www.cypress.io/) and [axe-core](https://github.com/dequelabs/axe-core)

_Manual tests_ will be executed on small isolated pages which show different accessibility scenarios. For each component, suitable scenarios will be defined and implemented. They will be then tested by experienced trusted accessibility testers and real users.
Axe-core test will be also executed on each of the scenarios.

As a first step, accessibility scenarios will be introduced as [hidden Storybook stories](https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/authoring-stories.md#10-internal-stories-for-testing).

Later, after descriptions, best practices and other relevant information will be added, they can be made public, so that consumers of the library can use them as validated patterns when creating their own user experiences.

### Pros and Cons

The main negative point is that the described process is quite heavy and it might take longer to fully implement a component.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

## Open Issues

<!-- Optional section, but useful for first drafts. Use this section to track open issues on unanswered questions regarding the design or proposal.  -->
