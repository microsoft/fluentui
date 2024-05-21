# Tabs

## Description

Tabs allow for navigation between two or more content views and relies on text headers to articulate the different sections of content.

A note on the naming of this component. The closest equivalent from Fluent UI React is the TabList control. The Web Component Tabs control is named differently because the control comprises of Tabs, Tab List and a Tab Panel. Whereas the react equivalent does not include tab panels. Therefore, a fully equivalent name, in this case, would be inaccurate.

## Design Spec

[Link to Design Spec in Figma](https://www.figma.com/file/dK5AnDvvnSTWV9lduQWeDk/TabList?node-id=3942%3A9316&t=we0hQaRaKSJc6IeM-0)

## Engineering Spec

### Inputs

| attribute   | type                           | default       | description                                                             |
| ----------- | ------------------------------ | ------------- | ----------------------------------------------------------------------- |
| activeid    | string                         | -             | sets the selected tab                                                   |
| appearance  | "subtle" \| "transparent       | "transparent" | -                                                                       |
| disabled    | boolean                        | -             | blocks control and all tab children from all keyboard and mouse events. |
| size        | "small" \| "medium" \| "large" | "medium"      |                                                                         |
| orientation | "vertical" \| "horizontal"     | "horizontal"  | sets the orientation of the tab list to vertical display                |

### Outputs

- [selectedValue: unkown] - the selected value of the currently selected tab

### Events

- change: html event handler - event fires on keyboard or mouse click

### Slots

- start - content before the tab list
- end - content after the tab list
- tab - slot for the tab itself
- tabpanel - slot for tab panel

### CSS Variables

| state    | variant                           | destination               | css variable                      |
| -------- | --------------------------------- | ------------------------- | --------------------------------- |
| rest     | transparent, rest, selected       | background color          | --transparentBackground           |
| rest     | transparent, rest, selected       | content color             | --neutralForeground1              |
| rest     | transparent, rest, selected       | selection indicator color | --compoundBrandStroke1            |
| rest     | transparent, rest, selected       | icon color                | --compoundBrandForeground1        |
| -        | --                                | --                        | --                                |
| rest     | transparent, rest, unselected     | background color          | --transparentBackground           |
| rest     | transparent, rest, unselected     | content color             | --neutralForeground2              |
| rest     | transparent, rest, unselected     | selection indicator color | --transparentStroke               |
| rest     | transparent, rest, unselected     | icon color                | --neutralForeground2              |
| --       | --                                | --                        | --                                |
| hover    | transparent, hover, selected      | background color          | --transparentBackgroundHover      |
| hover    | transparent, hover, selected      | content color             | --neutralForeground1Hover         |
| hover    | transparent, hover, selected      | selection indicator color | --compoundBrandStroke1Hover       |
| hover    | transparent, hover, selected      | icon color                | --compoundBrandForeground1Hover   |
| --       | --                                | --                        | --                                |
| hover    | transparent, hover, unselected    | background color          | --transparentBackgroundHover      |
| hover    | transparent, hover, unselected    | content color             | --neutralForeground2Hover         |
| hover    | transparent, hover, unselected    | selection indicator color | --compoundBrandStroke1Hover       |
| hover    | transparent, hover, unselected    | icon color                | --compoundBrandForeground2Hover   |
| --       | --                                | --                        | --                                |
| pressed  | transparent, hover, selected      | background color          | --transparentBackgroundPressed    |
| pressed  | transparent, hover, selected      | content color             | --neutralForeground1Pressed       |
| pressed  | transparent, hover, selected      | selection indicator color | --compoundBrandStroke1Pressed     |
| pressed  | transparent, hover, selected      | icon color                | --compoundBrandForeground1Pressed |
| --       | --                                | --                        | --                                |
| pressed  | transparent, hover, unselected    | background color          | --transparentBackgroundPressed    |
| pressed  | transparent, hover, unselected    | content color             | --neutralForeground2Pressed       |
| pressed  | transparent, hover, unselected    | selection indicator color | --neutralStroke1Pressed           |
| pressed  | transparent, hover, unselected    | icon color                | --compoundBrandForeground1Pressed |
| --       | --                                | --                        | --                                |
| disabled | transparent, disabled, selected   | background color          | --transparentBackground           |
| disabled | transparent, disabled, selected   | content color             | --neutralForegroundDisabled       |
| disabled | transparent, disabled, selected   | selection indicator color | --neutralForegroundDisabled       |
| disabled | transparent, disabled, selected   | icon color                | --nuetralForegroundDisabled       |
| --       | --                                | --                        | --                                |
| disabled | transparent, disabled, unselected | background color          | --transparentBackground           |
| disabled | transparent, disabled, unselected | content color             | --neutralForegroundDisabled       |
| disabled | transparent, disabled, unselected | selection indicator color | --transparentStroke               |
| disabled | transparent, disabled, unselected | icon color                | --neutralForegroundDisabled       |

---

## Accessibility

- [x] Tabs WCAG's patterns: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
  - recommended that tabs activate on focus
  - content of table is preloaded
  - when tab list is aria-orientation vertical: `down arrow` performs as right arrow and `up arrow` performs as left arrow
  - Horizontal tab list does not listen for `down arrow` or `up arrow`
  - when tabpanel does not contain any focusable elements or the first element is not focusable the tab panel should set `tabindex="0"`
- [x] Are there any accessibility elements unique to this component? yes, many see link above.
- [x] List ARIA attributes: `role, aria-labelledby, aria-label, aria-controls, aria-selected, aria-haspopup, aria-orientation`
- [x] Does the component support 400% zoom?

## Preparation

- [x] [FAST Tabs Component](https://www.fast.design/docs/components/tabs/) this component will inherit from and document
- [x] [Check the Fluent UI React V9 Component Spec](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabs/docs/Spec.md)
  - React V9 TabList prefers event handler to be passed into component as a React Prop `onTabSelect`. This event handling will be removed in favor of the TabList web component taking control of the event handling.
  - React V9 `as` prop (to render the list as HTML element preferred by developer) will be omitted
  - React V9
- [x] [Fluent UI React V9 Storybook](https://react.fluentui.dev/?path=/docs/components-tablist--default)
- [x] [Open GitHub issues related to component](https://github.com/microsoft/fluentui/issues?q=is%3Aissue+is%3Aopen+TabList)
- [ ] (Optional) [Draft implementation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#draft-implementation)
  - [link to draft implementation, if applicable]
- [ ] [Component Spec authored](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#component-spec) and [reviewed](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#spec-review)

## Differences from Fluent UI to FAST

The Fluent/FAST web component differs from the Fluent React Control as follows:

| difference                                      | Tabs - Fluent Web Component                                                                                     | TabList - Fluent React Component                                                             |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| active indicator control / id control selection | managed by control                                                                                              | managed by user with application state                                                       |
| keyboard and focus selection                    | selects active tab on arrow key focus change                                                                    | reselects tab on space bar or enter after arrow refocus                                      |
| icon slotting                                   | favors composition (dev chooses how to slot which icon)                                                         | favors automation (dev supplies icon name and control handles the rendering of icon)         |
| icon slotting filled / unfilled icons           | favors composition over automated handling. requires dev to add interactivity to render filled or unfilled icon | favors automated handling of icons and provides filled and unfilled iconography on selection |
| tab-panels                                      | requires tab panel control to set content on tab selection                                                      | does not require or include a tab panel control / template                                   |
| reserve-selected-tab-space                      | has reserve selected tab space defaulting to true and gives user the option to set to false                     | removes attribute                                                                            |

[Link to FAST Web Component API](https://www.fast.design/docs/components/tabs/#class-tab)

| fluent api name | fast api Equivalent |
| --------------- | ------------------- |
| vertical        | orientation         |
| selected-value  | activeid            |
| value           | id                  |

## Implementation - Sample Code

### Default

By default Tabs are arranged horizontally. The developer sets `selected-value` Fluent-Tab-List attribute. The Component handles the logic of what is shown and hidden when user clicks on the tabs. For switcing to work correctly the tab list requires that the indexing of the tabs and tab-panels be organized to correspond to their matching items - the order of the tabs must match the order of the tab panels:

```html
<fluent-tab-list>
  <fluent-tab>One / Left</fluent-tab>
  <fluent-tab>Two / Middle</fluent-tab>
  <fluent-tab>Three / Right</fluent-tab>

  <fluent-tab-panel>Panel One</fluent-tab-panel>
  <fluent-tab-panel>Panel Two</fluent-tab-panel>
  <fluent-tab-panel>Panel Three</fluent-tab-panel>
</fluent-tab-list>
```

### Controlled

If the developer wants to control the selected tab, tab values can be provided.

```html
<fluent-tab-list activeid="tab-one">
  <fluent-tab id="tab-one">One / Left</fluent-tab>
  <fluent-tab id="tab-two">Two / Middle</fluent-tab>
  <fluent-tab id="tab-three">Three / Right</fluent-tab>

  <fluent-tab-panel>Panel One</fluent-tab-panel>
  <fluent-tab-panel>Panel Two</fluent-tab-panel>
  <fluent-tab-panel>Panel Three</fluent-tab-panel>
</fluent-tab-list>
```

### Vertical

```html
<fluent-tab-list orientation="vertical">
  <fluent-tab>One / Left</fluent-tab>
  <fluent-tab>Two / Middle</fluent-tab>
  <fluent-tab>Three / Right</fluent-tab>
</fluent-tab-list>
```

## Implementation

- [ ] Initial conformance and unit tests (validate basic functionality)
- [x] [Initial documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#documentation)
  - [x] [Storybook stories](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#storybook-stories)
  - [x] README.md covering basic usage
- [ ] [Component released as unstable](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#unstable-release) from `@fluentui/web-components/unstable`
- [x] Uses design tokens for styling
- [ ] Renders correctly in High Contrast mode

## Validation

- [ ] [Add tests](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#tests)
  - [ ] Unit and conformance tests
  - [ ] Bundle size fixtures
  - [ ] Performance test scenario
  - [ ] Accessibility behavior tests
  - [ ] Create an issue and run [manual accessibility tests](https://github.com/microsoft/fluentui/wiki/Manual-Accessibility-Review-Checklist): [link to issue]
- [ ] [Validate with partners](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#validation)
- [ ] [Finalize documentation](https://github.com/microsoft/fluentui/wiki/Component-Implementation-Guide#finalize-documentation)
  - [ ] Review and add any missing storybook stories
  - [ ] Finalize migration guide
  - [ ] In package.json: Remove the alpha/beta tag from the version number in package.json
  - [ ] In package.json: Change beachball's `disallowedChangeTypes` to `"major", "prerelease"`
- [x] [Fluent Design Guidelines](https://www.figma.com/file/dK5AnDvvnSTWV9lduQWeDk/TabList?node-id=3942%3A9316&t=0maCSaKYbXs7BoLo-1)
