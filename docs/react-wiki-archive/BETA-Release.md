# React Components for Beta

### Beta quality controls required (in @fluentui/react-components)

_(Phase 1 & 2)_

- Accordion
- Avatar
- Badge
- Button (and variants MenuButton , ToggleButton`)
- Icon
- Link
- Divider
- FluentProvider
- Menu
- Popover
- Text
- Tooltip

**Additional to include in the beta release if ready before release.**

_(Phase 3 - Control candidates to be considered by the team as extra)_

- Label
- Checkbox

## Browser support matrix for beta

Fluent UI React supports many commonly used web browsers such as Internet Explorer, Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. For browsers outside of this matrix, proper behavior of the components may be good but is not guaranteed.

| Browser                             | Supported | Not supported |
| ----------------------------------- | --------- | ------------- |
| Microsoft Edge Chromium             | X         |               |
| Microsoft Edge Legacy               |           | X             |
| Internet Explorer 11                |           | X             |
| Internet Explorer 10                |           | X             |
| Internet Explorer 9                 |           | X             |
| Google Chrome (latest 2 versions)   | X         |               |
| Mozilla Firefox (latest 2 versions) | X         |               |
| Apple Safari (latest 2 versions)    | X         |               |
| **Mobile**                          |
| Edge Chromium on Mobile             | X         |               |
| Google Chrome on Mobile             | X         |
| iOS Safari (latest version)         | X         |               |
| Android Safari (latest version)     | X         |               |

Beta packages are the first official version available. This means that the API has not been examined beyond initial implementation. Beta packages may or may not have documentation, however they have had a basic level of testing across a number of different devices.

We will not be fixing bugs in beta unless there is a high priority partner escalation that will cause a legal problem. Follow-up work that include (fixes, tests) is scheduled After Beta.

## Definition of Done for Beta

1. **Design Spec:**
   - [x] a) Signed Off.
2. Engineering Spec:
   - [x] a) Signed Off
3. **Individual component package is tagged:**
   - [x] a) Has the "beta" tag on it (or the correct semver thing on it)
4. **Component must be in the suite package:**
   - [x] a) i.e. @fluentui/react-components
5. **Component must have a Storybook story that includes at least the following:**
   - [x] a) Component name and description
   - [x] b) At least one code example - Code example should include all a11y/aria props if needed. In the past, our fluent examples didn't set things like aria-label etc. So, if there are a11y patterns, we would want folks to copy and paste from our examples that should be in.
   - [x] c) Output of the API - Should be easily done with the Control Add-in
   - [x] b) [Optional] A link that points to known issues or bugs with the component on GitHub.
6. **Passes all conformance tests:**
   - [x] a) Passes all the current/required testing: i.e. Regression, bundling, unit tests..
7. Component has been tested. against our Browser Matrix:
   - [x] a) See above
8. **Supports a11y:**
   - [x] a) High Contrast Mode
   - [x] b) Narrator - As defined by our AT/Browser Matrix (see above)
   - [x] c) Keyboarding
9. **Supports Design Tokens/Theming:**
   - [x] a) Light Mode
   - [x] b) Dark Mode
   - [x] c) Supports all current out of the box Themes
10. **Supports Build-time CSS optimizations:**
    - [x] a) Supports the current CSS optimizations we have in place.
11. **Supports SSR:**
    - [x] a) Supports the current SSR test we have in place.
