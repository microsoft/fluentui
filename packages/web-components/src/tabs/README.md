---
id: tabs
title: fluent-tabs
sidebar_label: tabs
---

_Tabs_ are a set of layered sections of content that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel.

## Setup

```ts
import { providefluentDesignSystem, fluentTab, fluentTabPanel, fluentTabs } from '@fluentui/web-components';

providefluentDesignSystem().register(fluentTab(), fluentTabPanel(), fluentTabs());
```

## Usage

```html live
<fluent-tabs activeid="entrees">
  <fluent-tab id="apps">Appetizers</fluent-tab>
  <fluent-tab id="entrees">Entrees</fluent-tab>
  <fluent-tab id="desserts">Desserts</fluent-tab>
  <fluent-tab-panel id="appsPanel">
    <ol>
      <li><fluent-anchor href="#" appearance="hypertext">Stuffed artichokes</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Bruschetta</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Oven-baked polenta</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Salami and Fig Crostini with Ricotta</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Rosemary-Potato Focaccia with Goat Cheese</fluent-anchor></li>
    </ol>
  </fluent-tab-panel>
  <fluent-tab-panel id="entreesPanel">
    <ol>
      <li><fluent-anchor href="#" appearance="hypertext">Mushroom-Sausage Ragù</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Tomato Bread Soup with Steamed Mussels</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Grilled Fish with Artichoke Caponata</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Celery Root and Mushroom Lasagna</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Osso Buco with Citrus Gremolata</fluent-anchor></li>
    </ol>
  </fluent-tab-panel>
  <fluent-tab-panel id="dessertsPanel">
    <ol>
      <li><fluent-anchor href="#" appearance="hypertext">Tiramisu</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Spumoni</fluent-anchor></li>
      <li><fluent-anchor href="#" appearance="hypertext">Limoncello and Ice Cream with Biscotti</fluent-anchor></li>
    </ol>
  </fluent-tab-panel>
</fluent-tabs>
```

## Create your own design

### Tab

```ts
import { Tab, tabTemplate as template } from '@microsoft/fast-foundation';
import { tabStyles as styles } from './my-tab.styles';

export const myTab = Tab.compose({
  baseName: 'tab',
  template,
  styles,
});
```

### TabPanel

```ts
import { TabPanel, tabPanelTemplate as template } from '@microsoft/fast-foundation';
import { tabPanelStyles as styles } from './my-tab-panel.styles';

export const myTabPanel = TabPanel.compose({
  baseName: 'tab-panel',
  template,
  styles,
});
```

### Tabs

```ts
import { Tabs, tabsTemplate as template } from '@microsoft/fast-foundation';
import { tabsStyles as styles } from './my-tabs.styles';

export const myTabs = Tabs.compose({
  baseName: 'tabs',
  template,
  styles,
});
```

## Additional resources

- [Component explorer examples](https://explore.fast.design/components/fast-tabs)
- [Component technical specification](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/tabs/tabs.spec.md)
- [W3C Component Aria Practices](https://w3c.github.io/aria-practices/#tabpanel)
- [Open UI Analysis](https://open-ui.org/components/tabs.research)
