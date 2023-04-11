# Dropdown

> A dropdown is a user interface component that presents a collapsible list of selectable options to users.

<br />

## **Design Spec**

[Link to Dropdown Design Spec in Figma](https://www.figma.com/file/pI5m9e9hsNkl1odWzxCxNd/Dropdown?node-id=1319-163&t=Hfpd1nwRmumsVKtL-0)

<br />

## **Engineering Spec**

Fluent WC3 Dropdown is a form associated component that extends from the FAST Select [FAST Select](https://explore.fast.design/components/fast-select) and is intended to be as close to the Fluent UI React 9 Dropdown implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## Class: `Dropdown`

<br />

### **Component Name**

<br />

`fluent-dropdown`

<br />

### **Fields**

| Name              | Privacy | Type                                                                                                             | Default   | Description                                          |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `open`            | public  | `boolean`                                                                                                        | `false`   | The open attribute.                                  |
| `value`           | public  |                                                                                                                  |           | The value property.                                  |
| `cleanup`         | public  | `() => void`                                                                                                     |           | Cleanup function for the listbox positioner.         |
| `displayValue`    | public  | `string`                                                                                                         |           | The value displayed on the button.                   |
| `proxy`           | public  |                                                                                                                  |           |                                                      |
| `multiple`        | public  | `boolean`                                                                                                        |           | Indicates if the listbox is in multi-selection mode. |
| `size`            | public  | `{ small: 'small', medium: 'medium', large: 'large' }`                                                           | `medium`  | The maximum number of options to display.            |
| `length`          | public  | `number`                                                                                                         |           | The number of options.                               |
| `options`         | public  | `FlunetListboxOption[]`                                                                                          |           | The list of options.                                 |
| `disabled`        | public  | `boolean`                                                                                                        |           | The disabled state of the listbox.                   |
| `selectedIndex`   | public  | `number`                                                                                                         | `-1`      | The index of the selected option.                    |
| `selectedOptions` | public  | `FluentListboxOption[]`                                                                                          | `[]`      | A collection of the selected options.                |
| `appearance`      | public  | `{ outline: 'outline', underline: 'underline', filledDarker: 'filled-darker', filledLighter: 'filled-lighter' }` | `outline` | Sets style variations.                               |

<br />

### **Methods**

| Name                 | Privacy | Description                                                                | Parameters                                  | Return | Inherited From |
| -------------------- | ------- | -------------------------------------------------------------------------- | ------------------------------------------- | ------ | -------------- |
| `setPositioning`     | public  | Calculate and apply listbox positioning based on available viewport space. |                                             | `void` |                |
| `multipleChanged`    | public  | Sets the multiple property on the proxy element.                           | `prev: boolean or undefined, next: boolean` |        |                |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus.                             |                                             |        | FASTListbox    |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.                                |                                             | `void` | FASTListbox    |

<br />

### **Events**

| Name     | Type | Inherited From                                       |
| -------- | ---- | ---------------------------------------------------- |
| `input`  |      | Fires a custom 'input' event when the value updates  |
| `change` |      | Fires a custom 'change' event when the value updates |

<br />

### **Attributes**

| Name         | Field      |
| ------------ | ---------- |
| `open`       | open       |
| `multiple`   | multiple   |
| `appearance` | appearance |

<br />

### **CSS Parts**

| Name             | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `control`        | The element representing the select invoking element |
| `selected-value` | The element wrapping the selected value              |
| `indicator`      | The element wrapping the visual indicator            |
| `listbox`        | The listbox element                                  |

### **Slots**

| Name               | Description                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| default            | the list of options, either <fluent-option> or elements with role="option".                                                         |
| `start`            | used to display content like glyphs or icons inside the button, before the control.                                                 |
| `end`              | often times a glyph, icon, or button follows the content                                                                            |
| `button-container` | contains the selected value and indicator slots inside the control element.                                                         |
| `selected-value`   | displays the currently selected value text. This slot is only available if the button-container slot is not filled.                 |
| `indicator`        | holds the glyph indicating that the select can be expanded. This slot is only available if the button-container slot is not filled. |
| `content`          | the content of the button                                                                                                           |

<br />
<hr />
<br />

### **Suggested Template**

<br />

`selectTemplate` from FastFoundation

<br />
<hr />
<br />

## **Accessibility**

[W3 Select Spec](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-select-element.html)

<br />

### **WAI-ARIA Roles, States, and Properties**

<br/>

**`<fluent-dropdown>`**

| Attributes              | value      | Description                                                                                                                                                                          |
| ----------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `aria-activedescendant` |            | Indicates the currently active or focused child element within a composite component.                                                                                                |
| `aria-controls`         |            | Identifies the element(s) whose contents or presence are controlled by the current element, establishing a relationship between a controlling element and the controlled element(s). |
| `aria-expanded`         |            | Indicates the current state of a collapsible element.                                                                                                                                |
| `aria-haspopup`         | `listbox`  | Indicates that the current element has a popup context menu or submenu.                                                                                                              |
| `role`                  | `combobox` | Specifies the purpose or type of an element in the context of user interface components.                                                                                             |
| `tabindex`              | `0`        | Determines the order in which an element receives focus when navigated using the keyboard.                                                                                           |
| `current-value`         |            | Stores the current value of an input element. [RFC](https://github.com/microsoft/fast/issues/5119)                                                                                   |

<br />

**`<div class="listbox".. />`**

| Attributes | value     | Description                                                                              |
| ---------- | --------- | ---------------------------------------------------------------------------------------- |
| `role`     | `listbox` | Specifies the purpose or type of an element in the context of user interface components. |

<br />
<hr />
<br />

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Dropdown>`      | `<fluent-dropdown>`     |

<br />
