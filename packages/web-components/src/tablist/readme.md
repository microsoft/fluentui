# Tablist

Tablists allow for navigation between two or more content views and relies on text headers to articulate the different sections of content. Tablist wraps a set of Tab components and manages the roving tabindex (aka "focusgroup") around the elements.

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

- [activeid: unknown] - the selected value of the currently selected tab

### Events

- change: html event handler - event fires on keyboard or mouse click

### Slots

- default - slot for the tab controls

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

By default Tablists are arranged horizontally. The developer sets `activeid` Tablist attribute. The Component handles the logic of what is shown and hidden when user clicks on the tabs. For switching to work correctly the tab list requires that the indexing of the tabs and tab-panels be organized to correspond to their matching items - the order of the tabs must match the order of the tab panels:

```html
<fluent-tablist>
  <fluent-tab>One / Left</fluent-tab>
  <fluent-tab>Two / Middle</fluent-tab>
  <fluent-tab>Three / Right</fluent-tab>
</fluent-tablist>
```

### Controlled

If the developer wants to control the selected tab, tab values can be provided.

```html
<fluent-tablist activeid="tab-one">
  <fluent-tab id="tab-one">One / Left</fluent-tab>
  <fluent-tab id="tab-two">Two / Middle</fluent-tab>
  <fluent-tab id="tab-three">Three / Right</fluent-tab>
</fluent-tablist>
```

### Vertical

```html
<fluent-tablist orientation="vertical">
  <fluent-tab>One / Left</fluent-tab>
  <fluent-tab>Two / Middle</fluent-tab>
  <fluent-tab>Three / Right</fluent-tab>
</fluent-tablist>
```
