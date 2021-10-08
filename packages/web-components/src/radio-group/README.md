---
id: radio-group
title: fluent-radio-group
sidebar_label: radio-group
---

As defined by the [W3C](https://w3c.github.io/aria-practices/#radiobutton):

> A radio group is a set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time. Some implementations may initialize the set with all buttons in the unchecked state in order to force the user to check one of the buttons before moving past a certain point in the workflow.

While any DOM content is permissible as a child of the radiogroup, only `fluent-radio`'s and slotted content with a role of `radio` will receive keyboard support.

## Setup

```ts
import { providefluentDesignSystem, fluentRadio, fluentRadioGroup } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentRadio(), fluentRadioGroup());
```

## Usage

```html live
<fluent-radio-group value="mango" name="favorite-fruit">
  <fluent-radio value="apple">Apple</fluent-radio>
  <fluent-radio value="mango">Mango</fluent-radio>
  <fluent-radio value="orange">Orange</fluent-radio>
</fluent-radio-group>
```

## Create your own design

```ts
import { RadioGroup, radioGroupTemplate as template } from '@microsoft/fast-foundation';
import { radioGroupStyles as styles } from './my-radio-group.styles';

export const myRadioGroup = RadioGroup.compose({
  baseName: 'radio-group',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-radio-group)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/radio-group/radio-group.spec.md)
- [W3C Component Aria Practices](https://www.w3.org/TR/wai-aria/#radiogroup)
- [Open UI Analysis](https://open-ui.org/components/radio-button.research)
