---
id: listbox
title: fast-listbox
sidebar_label: listbox
custom_edit_url: https://github.com/microsoft/fast/edit/master/packages/web-components/fast-foundation/src/listbox/README.md
description: fast-listbox is a web component implementation of a listbox.
---

An implementation of a [listbox](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox). While any DOM content is permissible as a child of the listbox, only [`fast-option`](/docs/components/listbox-option) elements, `option` elements, and slotted items with `role="option"` will be treated as options and receive keyboard support.

The `listbox` component has no internals related to form association. For a form-associated `listbox`, see the [`fast-select` component](/docs/components/select).

## Setup

```ts
import { provideFASTDesignSystem, fastListbox, fastOption } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastListbox(), fastOption());
```

## Usage

```html live
<div>
  <label id="preferred-format">Preferred Format:</label>
  <br />
  <fast-listbox aria-labelledby="preferred-format" name="preferred-format">
    <fast-option value="vinyl">Vinyl Record</fast-option>
    <fast-option value="casette">Casette</fast-option>
    <fast-option value="cd">Compact Disc</fast-option>
    <fast-option value="digital">Digital</fast-option>
  </fast-listbox>
</div>
```

## Create your own design

### Listbox

```ts
import { Listbox, listboxTemplate as template } from '@microsoft/fast-foundation';
import { listboxStyles as styles } from './my-listbox.styles';

export const myListbox = Listbox.compose({
  baseName: 'listbox',
  template,
  styles,
});
```

### Option

See [listbox-option](/docs/components/listbox-option) for more information.

## API

### class: `FASTListboxElement`

#### Superclass

| Name          | Module                  | Package |
| ------------- | ----------------------- | ------- |
| `FASTListbox` | /src/listbox/listbox.js |         |

#### Fields

| Name               | Privacy   | Type                  | Default | Description                                          | Inherited From |
| ------------------ | --------- | --------------------- | ------- | ---------------------------------------------------- | -------------- |
| `multiple`         | public    | `boolean`             |         | Indicates if the listbox is in multi-selection mode. |                |
| `size`             | public    | `number`              |         | The maximum number of options to display.            |                |
| `length`           | public    | `number`              |         | The number of options.                               | FASTListbox    |
| `options`          | public    | `FASTListboxOption[]` |         | The list of options.                                 | FASTListbox    |
| `typeAheadExpired` | protected |                       |         |                                                      | FASTListbox    |
| `disabled`         | public    | `boolean`             |         | The disabled state of the listbox.                   | FASTListbox    |
| `selectedIndex`    | public    | `number`              | `-1`    | The index of the selected option.                    | FASTListbox    |
| `selectedOptions`  | public    | `FASTListboxOption[]` | `[]`    | A collection of the selected options.                | FASTListbox    |

#### Methods

| Name                 | Privacy | Description                                    | Parameters | Return | Inherited From |
| -------------------- | ------- | ---------------------------------------------- | ---------- | ------ | -------------- |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus. |            |        | FASTListbox    |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.    |            | `void` | FASTListbox    |

#### Attributes

| Name | Field    | Inherited From |
| ---- | -------- | -------------- |
|      | multiple | FASTListbox    |
|      | multiple | FASTListbox    |

<hr/>

### class: `FASTListbox`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name               | Privacy   | Type                  | Default | Description                           | Inherited From |
| ------------------ | --------- | --------------------- | ------- | ------------------------------------- | -------------- |
| `length`           | public    | `number`              |         | The number of options.                |                |
| `options`          | public    | `FASTListboxOption[]` |         | The list of options.                  |                |
| `typeAheadExpired` | protected |                       |         |                                       |                |
| `disabled`         | public    | `boolean`             |         | The disabled state of the listbox.    |                |
| `selectedIndex`    | public    | `number`              | `-1`    | The index of the selected option.     |                |
| `selectedOptions`  | public    | `FASTListboxOption[]` | `[]`    | A collection of the selected options. |                |

#### Methods

| Name                 | Privacy | Description                                    | Parameters | Return | Inherited From |
| -------------------- | ------- | ---------------------------------------------- | ---------- | ------ | -------------- |
| `selectFirstOption`  | public  | Moves focus to the first selectable option.    |            | `void` |                |
| `setSelectedOptions` | public  | Sets an option as selected and gives it focus. |            |        |                |

#### Attributes

| Name | Field    | Inherited From |
| ---- | -------- | -------------- |
|      | disabled |                |

#### Slots

| Name | Description                              |
| ---- | ---------------------------------------- |
|      | The default slot for the listbox options |

<hr/>

### class: `DelegatesARIAListbox`

#### Fields

| Name                   | Privacy | Type                                  | Default | Description                                                          | Inherited From |
| ---------------------- | ------- | ------------------------------------- | ------- | -------------------------------------------------------------------- | -------------- |
| `ariaActiveDescendant` | public  | `string or null`                      |         | See https://www.w3.org/TR/wai-aria-1.2/#listbox for more information |                |
| `ariaDisabled`         | public  | `"true" or "false" or string or null` |         | See https://www.w3.org/TR/wai-aria-1.2/#listbox for more information |                |
| `ariaExpanded`         | public  | `"true" or "false" or string or null` |         | See https://www.w3.org/TR/wai-aria-1.2/#listbox for more information |                |
| `ariaMultiSelectable`  | public  | `"true" or "false" or string or null` |         | See https://w3c.github.io/aria/#listbox for more information         |                |

<hr/>

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-listbox)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox/listbox.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox)
