# ListboxOption

> An option component is a user interface element that represents a selectable item in a listbox. It provides users with a visual and interactive way to choose from a set of available options. The option component typically includes text or other content that describes the option, and may also include additional metadata or visual cues, such as icons or checkboxes, to help users make informed choices. When selected, the option component triggers an action or updates the state of the listbox or other related components.

<br />

## **Engineering Spec**

Fluent WC3 `<fluent-option>` component will only provide internals related to form association when used within a form-associated component such as `fluent-select`.

<br />

### Component Name: `<fluent-option>`

<br />

### Class: `ListboxOption`

<br />
<br />

### **Fields**

<br />

| Name                | Privacy   | Type                                                                                                           | Default | Description                                                                                                                                                                          |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checked`           | public    | `boolean or undefined`                                                                                         |         | The checked state is used when the parent listbox is in multiple selection mode. To avoid accessibility conflicts, the checked state should not be present in single selection mode. |
| `content`           | public    | `Node[]`                                                                                                       |         | The default slotted content.                                                                                                                                                         |
| `defaultSelected`   | public    | `boolean`                                                                                                      | `false` | The defaultSelected state of the option.                                                                                                                                             |
| `disabled`          | public    | `boolean`                                                                                                      | `false` | The disabled state of the option.                                                                                                                                                    |
| `selectedAttribute` | public    | `boolean`                                                                                                      |         | The selected attribute value. This sets the initial selected value.                                                                                                                  |
| `selected`          | public    | `boolean`                                                                                                      |         | The checked state of the control.                                                                                                                                                    |
| `dirtyValue`        | public    | `boolean`                                                                                                      |         | Track whether the value has been changed from the initial value                                                                                                                      |
| `initialValue`      | protected | `string`                                                                                                       |         | The initial value of the option. This value sets the `value` property only when the `value` property has not been explicitly set.                                                    |
| `label`             | public    |                                                                                                                |         |                                                                                                                                                                                      |
| `text`              | public    | `string`                                                                                                       |         |                                                                                                                                                                                      |
| `value`             | public    | `string`                                                                                                       |         |                                                                                                                                                                                      |
| `form`              | public    | `HTMLFormElement or null`                                                                                      |         |                                                                                                                                                                                      |
| `proxy`             |           | <code>new Option(&#96;${this.textContent}&#96;, this.initialValue, this.defaultSelected, this.selected)</code> |         |                                                                                                                                                                                      |

<br />

### **Methods**

<br />

| Name                       | Privacy   | Description                                                         | Parameters                                | Return | Inherited From |
| -------------------------- | --------- | ------------------------------------------------------------------- | ----------------------------------------- | ------ | -------------- |
| `checkedChanged`           | public    | Updates the ariaChecked property when the checked property changes. | `prev: boolean or unknown, next: boolean` | `void` |                |
| `defaultSelectedChanged`   | protected |                                                                     |                                           | `void` |                |
| `disabledChanged`          | protected |                                                                     | `prev: boolean, next: boolean`            | `void` |                |
| `selectedAttributeChanged` | protected |                                                                     |                                           | `void` |                |
| `selectedChanged`          | protected |                                                                     |                                           | `void` |                |
| `initialValueChanged`      | public    |                                                                     | `previous: string, next: string`          | `void` |                |

<br />

### **Attributes**

<br />

| Name       | Field             |
| ---------- | ----------------- |
|            | disabled          |
| `selected` | selectedAttribute |
| `value`    | initialValue      |

<br />

### **CSS Parts**

<br />

| Name      | Description                      |
| --------- | -------------------------------- |
| `content` | Wraps the listbox option content |

<br />

### **Slots**

<br />

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
|         | The default slot for listbox option content.                     |
| `start` | Content which can be provided after the listbox option content.  |
| `end`   | Content which can be provided before the listbox option content. |

<br />
<hr />
<br />

### **Suggested Template**

<br />

`listboxOptionTemplate()` from `FASTFoundation`

<br />
<hr />
<br />

## **Accessibility**

[W3 Option Spec](https://w3c.github.io/aria/#option)

<br />

### **WAI-ARIA Roles, Methods, and IDL Properties**

<br/>

### Class: `DelegatesARIAListboxOption`

<br/>

**Fields**

| Name           | Reflected ARIA Content Attribute | Privacy | Type                                  | Description                                                          | Default |
| -------------- | -------------------------------- | ------- | ------------------------------------- | -------------------------------------------------------------------- | ------- |
| `ariaChecked`  | `aria-checked`                   | public  | `"true" or "false" or string or null` | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |         |
| `ariaPosInSet` | `aria-posinset`                  | public  | `string or null`                      | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |         |
| `ariaSelected` | `aria-selected`                  | public  | `"true" or "false" or string or null` | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |         |
| `ariaSetSize`  | `aria-setsize`                   | public  | `string or null`                      | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |         |

<br />

**Functions**
| Name | Description | Parameters | Return |
| ----------------- | ---------------------------------------------------- | ---------------------- | --------------------- |  
| `isListboxOption` | Determines if the element is a (ListboxOption:class) | `el: Element, element` | `el is ListboxOption` |

<br />
<hr />
<br />
