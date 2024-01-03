# Dropdown

> A dropdown is a user interface component that presents a collapsible list of selectable options to users.

<br />

## **Design Spec**

[Link to Dropdown Design Spec in Figma](https://www.figma.com/file/pI5m9e9hsNkl1odWzxCxNd/Dropdown?node-id=1319-163&t=Hfpd1nwRmumsVKtL-0)

<br />

## **Engineering Spec**

The Fluent WC3 Dropdown is a form associated component that extends from the FAST Select [FAST Select](https://explore.fast.design/components/fast-select) and is intended to be as close to the Fluent UI React 9 Dropdown implementation as possible. However, due to the nature of web components there will not be 100% parity between the two.

<br />

## **Class:** `Dropdown`

<br />

### **Component Name:** `fluent-dropdown`

### Superclass

| Name                   | Module                                                                                                                                                  | Package                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `FormAssociatedSelect` | [select.form-associated.js](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/select/select.form-associated.ts) | `@microsoft/fast-foundation` |

<br />

### Static Fields

| Name                  | Privacy | Description                                         | Inherited Form                                                                                                             |
| --------------------- | ------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `slottedOptionFilter` |         | A static filter to include only selectable options. | [FASTListbox](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/README.md) |

<br />

### **Fields**

| Name              | Privacy | Type                                                                                                             | Default   | Description                                          |
| ----------------- | ------- | ---------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `appearance`      | public  | `{ outline: 'outline', underline: 'underline', filledDarker: 'filled-darker', filledLighter: 'filled-lighter' }` | `outline` | Sets style variations.                               |
| `cleanup`         | public  | `() => void`                                                                                                     |           | Cleanup function for the listbox positioner.         |
| `disabled`        | public  | `boolean`                                                                                                        |           | The disabled state of the listbox.                   |
| `displayValue`    | public  | `string`                                                                                                         |           | The value displayed on the button.                   |
| `length`          | public  | `number`                                                                                                         |           | The number of options.                               |
| `multiple`        | public  | `boolean`                                                                                                        |           | Indicates if the listbox is in multi-selection mode. |
| `open`            | public  | `boolean`                                                                                                        | `false`   | The open attribute.                                  |
| `options`         | public  | `FlunetListboxOption[]`                                                                                          |           | The list of options.                                 |
| `proxy`           | public  |                                                                                                                  |           |                                                      |
| `selectedIndex`   | public  | `number`                                                                                                         | `-1`      | The index of the selected option.                    |
| `selectedOptions` | public  | `FluentListboxOption[]`                                                                                          | `[]`      | A collection of the selected options.                |
| `size`            | public  | `number`                                                                                                         |           | The maximum number of options to display.            |
| `control-size`    | public  | `{ small: 'small', medium: 'medium', large: 'large' }`                                                           |           | Sets the size of the dropdown.                       |
| `value`           | public  | `string`                                                                                                         |           | Sets the value of the dropdown.                      |

<br />

### **Attributes**

| Name           | Field        | Inherited From                                                                                                                   |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `appearance`   | appearance   |                                                                                                                                  |
| `disabled`     | disabled     |                                                                                                                                  |
| `multiple`     | multiple     | [FASTListbox](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/listbox.spec.md) |
| `open`         | open         |                                                                                                                                  |
| `control-size` | control-size |                                                                                                                                  |

<br />

### **Methods**

| Name                 | Privacy | Description                                                                | Parameters | Return | Inherited From                                                                                                                   |
| -------------------- | ------- | -------------------------------------------------------------------------- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.                                |            | `void` | [FASTListbox](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/listbox.spec.md) |
| `setPositioning`     | public  | Calculate and apply listbox positioning based on available viewport space. |            | `void` |                                                                                                                                  |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus.                             |            |        | [FASTListbox](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/listbox.spec.md) |

<br />

### **Events**

| Name     | Type | Inherited From                                       |
| -------- | ---- | ---------------------------------------------------- |
| `change` |      | Fires a custom 'change' event when the value updates |
| `input`  |      | Fires a custom 'input' event when the value updates  |

<br />

### **CSS Parts**

| Name             | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `control`        | The element representing the select invoking element |
| `indicator`      | The element wrapping the visual indicator            |
| `listbox`        | The listbox element                                  |
| `selected-value` | The element wrapping the selected value              |

### **Slots**

| Name               | Description                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
|                    | the list of options, either <fluent-option> or elements with role="option".                                                         |
| `button-container` | contains the selected value and indicator slots inside the control element.                                                         |
| `content`          | the content of the button                                                                                                           |
| `end`              | often times a glyph, icon, or button follows the content                                                                            |
| `indicator`        | holds the glyph indicating that the select can be expanded. This slot is only available if the button-container slot is not filled. |
| `selected-value`   | displays the currently selected value text. This slot is only available if the button-container slot is not filled.                 |

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
| ----------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| `aria-activedescendant` |            | Indicates the currently active or focused child element within a composite component.                                                                                                |
| `aria-controls`         |            | Identifies the element(s) whose contents or presence are controlled by the current element, establishing a relationship between a controlling element and the controlled element(s). |
| `aria-expanded`         |            | Indicates the current state of a collapsible element.                                                                                                                                |
| `aria-haspopup`         | `listbox`  | Indicates that the current element has a popup context menu or submenu.                                                                                                              |
| `current-value`         |            | Stores the current value of an input element. [RFC](https://github.com/microsoft/fast/issues/5119)                                                                                   |
| `role`                  | `combobox` | Specifies the purpose or type of an element in the context of user interface components.                                                                                             |
| `tabindex`              | `0`        | Determines the order in which an element receives focus when navigated using the keyboard.                                                                                           |     |

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
| `<Option>`        | `<fluent-option>`       |

<br />

**Additional Deltas and Future Work**

`Persona` Component - The `Persona` component which can be used inside an `Option` to create additional styling for options is available in FUIRv9 but not yet in the FUI WC3 component library.

Option Grouping - Our dropdown component currently does not support option grouping. In order to provide this functionality, we need to add support for grouped options to the FAST implimentation.
