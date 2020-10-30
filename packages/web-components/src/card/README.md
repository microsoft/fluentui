---
id: card
title: fluent-card
sidebar_label: card
custom_edit_url: https://github.com/microsoft/fluentui/edit/master/packages/web-components/src/card/README.md
---

The `fluent-card` component is a visual container and design system provider. By default `fluent-card` applies `neutralFillCard` to its background that is calculated from its parent design system provider. If a custom background color is desired the attribute `card-background-color` is available, this will reset the cards design system to that value. Cards are snapshots of content that are typically used in a group to present collections of related information.

## Usage

```html live
<fast-design-system-provider use-defaults>
  <fast-card>
    <h3>Card title</h3>
    <p>
      At purus lectus quis habitant commodo, cras. Aliquam malesuada velit a tortor. Felis orci tellus netus risus et
      ultricies augue aliquet.
    </p>
    <fast-button>Learn more</fast-button>
  </fast-card>
</fast-design-system-provider>

<fast-design-system-provider use-defaults>
  <fast-card card-background-color="#FF0000">
    <h3>Card title</h3>
    <p>
      At purus lectus quis habitant commodo, cras. Aliquam malesuada velit a tortor. Felis orci tellus netus risus et
      ultricies augue aliquet.
    </p>
    <fast-button>Learn more</fast-button>
  </fast-card>
</fast-design-system-provider>
```
