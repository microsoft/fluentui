# Tab List

A tab list provides single selection from tabs. When a tab is selected, the application displays content associated with the selected tab and hides other content.

Each tab typically contains a text header and often includes an icon.

## Tab List api

[Link to Fluent React API](https://react.fluentui.dev/?path=/docs/components-tablist--default)


| name                       | desctiption                                                                                                                  | type                           | default       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------- |
| appearance                 | optional - "subtle": Minimizes emphasis. "transparent": No background and border styling                                     | 'transparent' \| 'subtle'      | 'transparent' |
| reserve-selected-tab-space | optional - Tab size may change between unselected and selected states. The default scenario is a selected tab has bold text. | boolean                        | true          |
| default-selected-value     | optional - The value of the tab to be selected by default.                                                                   | TabValue: unknown              | undefined     |
| disabled                   | optional - A tab list can be set to disable interaction                                                                      | boolean                        | false         |
| selected-value             | optional - for setting the selected tab.                                                                                     | TabValue: unknown              | undefined     |
| size                       | optional - small, medium or large sizes                                                                                      | 'small' \| 'medium' \| 'large' | 'medium'      |
| vertical                   | optional - to arrange the tab list vertically                                                                                | boolean                        | false         |

## Tab List - api to Fast mappings:

[Link to FAST Web Component API](https://www.fast.design/docs/components/tabs/#class-tab)

| fluent api name | fast api Equivalent |
| --------------- | ------------------- |
| selected-value  | activeid            |
| vertical        | orientation         |

## Tab list events

| name   | desctiption                                   | type               | default |
| ------ | --------------------------------------------- | ------------------ | ------- |
| change | Change event fires on keyboard or mouse click | html event handler | -       |


## Merging the APIs of the FAST and Fluent React controls could work in two ways:

## Option 1 - Tab List example - more closely resembles Fast component

Component works like this:

- User sets the selected value in the tab list attribute.
- The Component handles the logic of what is shown and hidden when user clicks on the tabs. The dev only provides the matching panel ids
- Tab Panels must be children of tab-list.

```html
<fluent-tab-list selected-value="tab-one">
  <fluent-tab value="tab-one">One / Left</fluent-tab>
  <fluent-tab value="tab-two">Two / Middle</fluent-tab>
  <fluent-tab value="tab-three">Three / Right</fluent-tab>

  <fluent-tab-panel id="tab-one-panel"></fluent-tab-panel>
  <fluent-tab-panel id="tab-two-panel"></fluent-tab-panel>
  <fluent-tab-panel id="tab-two-panel"></fluent-tab-panel>
</fluent-tab-list>
```

## Option 2 - Tab List - more closely resembles FluentUI React v9 tab-list

Adds aditional component `fluent-tab-panel-group`.

Component works like this:

- It's up to the user to control which panel is selected by utilizing their own mechanism (display: none, conditional rendering, ect).
- User passes in a click handler to the tab list. The click handler can either be defined on the tab-list html or can be added via element selector and javascript `element.addEventListener("click", function(){})` (just like regular HTMLElement allows for)

```html
<fluent-tab-list selected-value="tab-one" onclick="onTabSelect(event, selectedValue)">
  <fluent-tab value="tab-one">One / Left</fluent-tab>
  <fluent-tab value="tab-two">Two / Middle</fluent-tab>
  <fluent-tab value="tab-three">Three / Right</fluent-tab>
</fluent-tab-list>

<fluent-tab-panel-group>
  <fluent-tab-panel id="tab-one-panel" class="tabpanel"></fluent-tab-panel>
  <fluent-tab-panel id="tab-two-panel" class="tabpanel"></fluent-tab-panel>
  <fluent-tab-panel id="tab-three-panel" class="tabpanel"></fluent-tab-panel>
</fluent-tab-panel-group>
```

One simple way to hide and show panels:

```javascript
/**
 * onTabSelect
 * sets the target panel to display block. sets all the others to display none
 */
function onTabSelect(event, value) {
  const panels = document.getElementsByClassName('tabpanel');
  panels.style.display = 'none';
  const tab = document.getElementById(value);
  tab.style.display = 'block';
}
```
