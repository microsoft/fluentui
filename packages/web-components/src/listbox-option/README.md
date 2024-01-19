---
id: listbox-option
title: fast-option
sidebar_label: option
custom_edit_url: https://github.com/microsoft/fast/edit/master/packages/web-components/fast-foundation/src/listbox-option/README.md
description: fast-option is a web component implementation of an option.
---

An implementation of an [option](https://w3c.github.io/aria/#option). To avoid namespace collisions with the [Option() constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option), the component class is `ListboxOption`, and our implementation is named `fast-option`.

The `<fast-option>` component will only provide internals related to form association when used within a form-associated component such as [`fast-select`](/docs/components/select) or [`fast-combobox`](/docs/components/combobox). It will not provide these capabilities when used only with a [`fast-listbox`](/docs/components/listbox).

## Setup

```ts
import { provideFASTDesignSystem, fastOption } from '@microsoft/fast-components';

provideFASTDesignSystem().register(fastOption());
```

## Usage

See [`fast-select`](/docs/components/select), [`fast-combobox`](/docs/components/combobox), or [`fast-listbox`](/docs/components/listbox).

## Create your own design

```ts
import { ListboxOption, listboxOptionTemplate as template } from '@microsoft/fast-foundation';
import { optionStyles as styles } from './my-listbox-option.styles';

export const myOption = ListboxOption.compose({
  baseName: 'option',
  template,
  styles,
});
```

## API

### class: `FASTListboxOption`

#### Superclass

| Name          | Module | Package                 |
| ------------- | ------ | ----------------------- |
| `FASTElement` |        | @microsoft/fast-element |

#### Fields

| Name                | Privacy   | Type                      | Default                                                                                           | Description                                                                                                                                                                          | Inherited From |
| ------------------- | --------- | ------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `checked`           | public    | `boolean or undefined`    |                                                                                                   | The checked state is used when the parent listbox is in multiple selection mode. To avoid accessibility conflicts, the checked state should not be present in single selection mode. |                |
| `content`           | public    | `Node[]`                  |                                                                                                   | The default slotted content.                                                                                                                                                         |                |
| `defaultSelected`   | public    | `boolean`                 | `false`                                                                                           | The defaultSelected state of the option.                                                                                                                                             |                |
| `disabled`          | public    | `boolean`                 |                                                                                                   | The disabled state of the option.                                                                                                                                                    |                |
| `selectedAttribute` | public    | `boolean`                 |                                                                                                   | The selected attribute value. This sets the initial selected value.                                                                                                                  |                |
| `selected`          | public    | `boolean`                 |                                                                                                   | The checked state of the control.                                                                                                                                                    |                |
| `dirtyValue`        | public    | `boolean`                 | `false`                                                                                           | Track whether the value has been changed from the initial value                                                                                                                      |                |
| `initialValue`      | protected | `string`                  |                                                                                                   | The initial value of the option. This value sets the \`value\` property only when the \`value\` property has not been explicitly set.                                                |                |
| `label`             | public    |                           |                                                                                                   |                                                                                                                                                                                      |                |
| `text`              | public    | `string`                  |                                                                                                   |                                                                                                                                                                                      |                |
| `value`             | public    | `string`                  |                                                                                                   |                                                                                                                                                                                      |                |
| `form`              | public    | `HTMLFormElement or null` |                                                                                                   |                                                                                                                                                                                      |                |
| `proxy`             |           |                           | `` new Option( `${this.textContent}`, this.initialValue, this.defaultSelected, this.selected ) `` |                                                                                                                                                                                      |                |

#### Methods

| Name                       | Privacy   | Description                                                         | Parameters                                | Return | Inherited From |
| -------------------------- | --------- | ------------------------------------------------------------------- | ----------------------------------------- | ------ | -------------- |
| `checkedChanged`           | public    | Updates the ariaChecked property when the checked property changes. | `prev: boolean or unknown, next: boolean` | `void` |                |
| `defaultSelectedChanged`   | protected |                                                                     |                                           | `void` |                |
| `disabledChanged`          | protected |                                                                     | `prev: boolean, next: boolean`            | `void` |                |
| `selectedAttributeChanged` | protected |                                                                     |                                           | `void` |                |
| `selectedChanged`          | protected |                                                                     |                                           | `void` |                |
| `initialValueChanged`      | public    |                                                                     | `previous: string, next: string`          | `void` |                |

#### Attributes

| Name       | Field             | Inherited From |
| ---------- | ----------------- | -------------- |
|            | disabled          |                |
| `selected` | selectedAttribute |                |
| `value`    | initialValue      |                |

#### CSS Parts

| Name      | Description                      |
| --------- | -------------------------------- |
| `content` | Wraps the listbox option content |

#### Slots

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| `start` | Content which can be provided before the listbox option content |
| `end`   | Content which can be provided after the listbox option content  |
|         | The default slot for listbox option content                     |

<hr/>

### class: `DelegatesARIAListboxOption`

#### Fields

| Name           | Privacy | Type                                  | Default | Description                                                          | Inherited From |
| -------------- | ------- | ------------------------------------- | ------- | -------------------------------------------------------------------- | -------------- |
| `ariaChecked`  | public  | `"true" or "false" or string or null` |         | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |                |
| `ariaPosInSet` | public  | `string or null`                      |         | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |                |
| `ariaSelected` | public  | `"true" or "false" or string or null` |         | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |                |
| `ariaSetSize`  | public  | `string or null`                      |         | See https://www.w3.org/TR/wai-aria-1.2/#option for more information. |                |

<hr/>

### Functions

| Name              | Description                                              | Parameters             | Return                    |
| ----------------- | -------------------------------------------------------- | ---------------------- | ------------------------- |
| `isListboxOption` | Determines if the element is a (FASTListboxOption:class) | `el: Element, element` | `el is FASTListboxOption` |

<hr/>

## Additional resources

- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/listbox-option/listbox-option.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria/#option)
