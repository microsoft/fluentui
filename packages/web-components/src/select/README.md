---
id: select
title: fast-select
sidebar_label: select
custom_edit_url: https://github.com/microsoft/fast/edit/master/packages/web-components/fast-foundation/src/select/README.md
description: fast-select is a web component implementation of a select element.
---

An implementation of an [HTML select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) as a form-connected web-component.

## Setup

### Basic Setup

```ts
import { provideFASTDesignSystem, fastSelect, fastOption } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastSelect(), fastOption());
```

### Customizing the Indicator

```ts
import { provideFASTDesignSystem, fastSelect, fastOption } from '@microsoft/fast-components';

provideFASTDesignSystem().register(
  fastSelect({
    indicator: `...your indicator...`,
  }),
  fastOption(),
);
```

## Usage

```html live
<fast-select id="shirt-size">
  <fast-option value="s">Small</fast-option>
  <fast-option value="m">Medium</fast-option>
  <fast-option value="l">Large</fast-option>
  <fast-option value="xl">Extra Large</fast-option>
</fast-select>
```

## Create your own design

### Select

```ts
import { Select, SelectOptions, selectTemplate as template } from '@microsoft/fast-foundation';
import { selectStyles as styles } from './my-select.styles';

export const mySelect = Select.compose<SelectOptions>({
  baseName: 'select',
  template,
  styles,
  indicator: `...default indicator...`,
});
```

### Option

See [listbox-option](/docs/components/listbox-option) for more information.

## API

### class: `FormAssociatedSelect`

#### Superclass

| Name      | Module                               | Package |
| --------- | ------------------------------------ | ------- |
| `_Select` | src/select/select.form-associated.ts |         |

#### Mixins

| Name             | Module                                  | Package |
| ---------------- | --------------------------------------- | ------- |
| `FormAssociated` | /src/form-associated/form-associated.js |         |

#### Fields

| Name               | Privacy   | Type                  | Default | Description                                          | Inherited From     |
| ------------------ | --------- | --------------------- | ------- | ---------------------------------------------------- | ------------------ |
| `proxy`            |           |                       |         |                                                      |                    |
| `multiple`         | public    | `boolean`             |         | Indicates if the listbox is in multi-selection mode. | FASTListboxElement |
| `size`             | public    | `number`              |         | The maximum number of options to display.            | FASTListboxElement |
| `length`           | public    | `number`              |         | The number of options.                               | FASTListbox        |
| `options`          | public    | `FASTListboxOption[]` |         | The list of options.                                 | FASTListbox        |
| `typeAheadExpired` | protected |                       |         |                                                      | FASTListbox        |
| `disabled`         | public    | `boolean`             |         | The disabled state of the listbox.                   | FASTListbox        |
| `selectedIndex`    | public    | `number`              | `-1`    | The index of the selected option.                    | FASTListbox        |
| `selectedOptions`  | public    | `FASTListboxOption[]` | `[]`    | A collection of the selected options.                | FASTListbox        |

#### Methods

| Name                 | Privacy | Description                                    | Parameters | Return | Inherited From |
| -------------------- | ------- | ---------------------------------------------- | ---------- | ------ | -------------- |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus. |            |        | FASTListbox    |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.    |            | `void` | FASTListbox    |

#### Attributes

| Name | Field    | Inherited From |
| ---- | -------- | -------------- |
|      | multiple | FASTListbox    |

<hr/>

### class: `FASTSelect`

#### Superclass

| Name                   | Module                                | Package |
| ---------------------- | ------------------------------------- | ------- |
| `FormAssociatedSelect` | /src/select/select.form-associated.js |         |

#### Fields

| Name               | Privacy   | Type                  | Default | Description                                          | Inherited From       |
| ------------------ | --------- | --------------------- | ------- | ---------------------------------------------------- | -------------------- |
| `open`             | public    | `boolean`             | `false` | The open attribute.                                  |                      |
| `placeholder`      | public    | `string`              |         | The placeholder attribute.                           |                      |
| `value`            | public    |                       |         | The value property.                                  |                      |
| `cleanup`          | public    | `() => void`          |         | Cleanup function for the listbox positioner.         |                      |
| `displayValue`     | public    | `string`              |         | The value displayed on the button.                   |                      |
| `proxy`            |           |                       |         |                                                      | FormAssociatedSelect |
| `multiple`         | public    | `boolean`             |         | Indicates if the listbox is in multi-selection mode. | FASTListboxElement   |
| `size`             | public    | `number`              |         | The maximum number of options to display.            | FASTListboxElement   |
| `length`           | public    | `number`              |         | The number of options.                               | FASTListbox          |
| `options`          | public    | `FASTListboxOption[]` |         | The list of options.                                 | FASTListbox          |
| `typeAheadExpired` | protected |                       |         |                                                      | FASTListbox          |
| `disabled`         | public    | `boolean`             |         | The disabled state of the listbox.                   | FASTListbox          |
| `selectedIndex`    | public    | `number`              | `-1`    | The index of the selected option.                    | FASTListbox          |
| `selectedOptions`  | public    | `FASTListboxOption[]` | `[]`    | A collection of the selected options.                | FASTListbox          |

#### Methods

| Name                 | Privacy | Description                                                                | Parameters                                  | Return | Inherited From |
| -------------------- | ------- | -------------------------------------------------------------------------- | ------------------------------------------- | ------ | -------------- |
| `setPositioning`     | public  | Calculate and apply listbox positioning based on available viewport space. |                                             | `void` |                |
| `multipleChanged`    | public  | Sets the multiple property on the proxy element.                           | `prev: boolean or undefined, next: boolean` |        |                |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus.                             |                                             |        | FASTListbox    |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.                                |                                             | `void` | FASTListbox    |

#### Events

| Name     | Type | Description                                          | Inherited From |
| -------- | ---- | ---------------------------------------------------- | -------------- |
| `input`  |      | Fires a custom 'input' event when the value updates  |                |
| `change` |      | Fires a custom 'change' event when the value updates |                |

#### Attributes

| Name          | Field       | Inherited From |
| ------------- | ----------- | -------------- |
| `open`        | open        |                |
| `placeholder` | placeholder |                |
|               | multiple    | FASTListbox    |

#### CSS Parts

| Name             | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `control`        | The element representing the select invoking element |
| `selected-value` | The element wrapping the selected value              |
| `indicator`      | The element wrapping the visual indicator            |
| `listbox`        | The listbox element                                  |

#### Slots

| Name               | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `start`            | Content which can be provided before the button content          |
| `end`              | Content which can be provided after the button content           |
| `button-container` | The element representing the select button                       |
| `selected-value`   | The selected value                                               |
| `indicator`        | The visual indicator for the expand/collapse state of the button |
|                    | The default slot for slotted options                             |

<hr/>

### class: `DelegatesARIASelect`

#### Fields

| Name           | Privacy | Type             | Default | Description                                                           | Inherited From |
| -------------- | ------- | ---------------- | ------- | --------------------------------------------------------------------- | -------------- |
| `ariaControls` | public  | `string or null` |         | See https://www.w3.org/TR/wai-aria-1.2/#combobox for more information |                |

<hr/>

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-select)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/select/select.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)
- [Open UI Analysis](https://open-ui.org/components/select.research)
- [Open UI Proposal](https://open-ui.org/components/select)
