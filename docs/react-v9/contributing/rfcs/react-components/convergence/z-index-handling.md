# RFC: z-index handling

---

[@marcosmoura](https://github.com/marcosmoura)

- [RFC: z-index handling](#rfc-z-index-handling)
  - [Summary](#summary)
  - [Background](#background)
  - [Problem statement](#problem-statement)
  - [Detailed Design or Proposal](#detailed-design-or-proposal)
  - [Layering/elevation concept](#layeringelevation-concept)
    - [What will be covered](#what-will-be-covered)
    - [What won't be covered](#what-wont-be-covered)
  - [Options](#options)
    - [Option A: Update tokens to include a map from layer to z-index](#option-a-update-tokens-to-include-a-map-from-layer-to-z-index)
      - [Option A1: Named layers](#option-a1-named-layers)
        - [Pros](#pros)
        - [Cons](#cons)
      - [Option A2: Leveled layers](#option-a2-leveled-layers)
        - [Pros](#pros-1)
        - [Cons](#cons-1)
      - [Issues](#issues)
    - [Option B: z-index handling context](#option-b-z-index-handling-context)

## Summary

This RFC outlines the ideas and implementation details for effectively handle z-index globally within Fluent UI components, with a particular focus on standardizing layers across the library.

## Background

In [v0](https://github.com/microsoft/fluentui/blob/c3f4b77f8160185518b1fea6d74be239519fba73/packages/style-utilities/src/styles/zIndexes.ts#L1-L11) and [v8](https://github.com/microsoft/fluentui/blob/c3f4b77f8160185518b1fea6d74be239519fba73/packages/fluentui/react-northstar/src/themes/teams/siteVariables.ts#L72-L79), naming conventions were defined to represent the z-index values for each layer. However, for v9, values were not used consistently across the library, leading to a lack of standardization and potential conflicts between components as well as with custom styles in the partner side.

## Problem statement

The current z-index handling in Fluent UI v9 is not consistent across components. This inconsistency can be observed by performing a simple code search in the repository:
![z-index inconsistencies](assets/arbitrary-z-index-values.png)

## Detailed Design or Proposal

The creation of a global z-index system will help to standardize the values across the library, making it easier to manage and avoid conflicts between components. This system will also provide a way to easily override the z-index values for custom components and applications.

## Layering/elevation concept

As stated by [Fluent 2 design guidelines](https://fluent2.microsoft.design/elevation), objects/components have a defined elevation value to express its importance and create the sense of hierarchy of layers. These layers should have well defined shadow and z-axis values. Currently, the library have [shadows already defined](https://github.com/marcosmoura/fluentui/blob/943d1f166c5929ff65a683fbed3885434f16f2b9/packages/tokens/src/utils/shadows.ts#L6), but lacking the z-axis values.

### What will be covered

This proposal utilize this elevation system to define layers that translate into z-axis values, and those can be used by the components. The concepts are:

- Each layer have a well-thought z-index number mapped to it
- Multiple components can ocupy the same layer, if they share the same importance level in the stack (e.g. Drawer and Nav)
- A component can be defined without a z-index. Its placement fallbacks to its position within the [stack context](https://web.dev/learn/css/z-index/#stacking-context).

### What won't be covered

- Negative z-indexes. Components can define negative z-index values to represent background objects. Since this is very subjective, it'll be up to the component to define its own negative z-index values.
- Correlation between shadows and z-indexes. Even though it is related, this is out of the scope of this proposal. If necessary, it can be covered by a follow-up RFC.

## Options

### Option A: Update tokens to include a map from layer to z-index

Exposes a map of layers to z-index values. This map can be used by components to define their z-index values.
This would required the creation of a new file and export under `@fluentui/tokens`, to make the new tokens available.

#### Option A1: Named layers

The map exported would be named, creating groups of UI elements.
The layers can be defined as follows:

```ts
// packages/tokens/src/global/zIndexes.ts

import { ZIndexes } from '../types';

/**
 * Global z-index values for elements
 */

// Ordered according to Fluent V2 guidelines
const levels = [
  0, // Elevation 0
  1, // Elevation 2
  1000, // Elevation 4
  2000, // Elevation 8
  3000, // Elevation 16
  4000, // Elevation 28
  5000, // Elevation 64
  6000, // High priority elements
];

export const zIndexes: ZIndexes = {
  background: levels[0], // default
  content: levels[1], // content - header, footer, sidebar
  overlay: levels[2], // overlay elements - drawer, nav
  popup: levels[3], // popup layers - popups, modals, dialogs
  messages: levels[4], // communication elements - banners, messages, toasts, snackbar
  floating: levels[5], // floating elements - dropdowns, teaching
  priority: levels[6], // priority elements - tooltips
  debug: levels[7], // debug - error overlays, debug messages
};
```

<!-- FIXME: Update section after alignment with designers -->

_NOTE: The names above are not final and only serve as an example. As of the moment this RFC was introduced, there are ongoing discussions with the Design team to define all the layers. This RFC will be updated before the final approval to include the definitive names._

##### Pros

- 👍 Clear separation by group of UI elements
- 👍 Easy to override, extend and update

##### Cons

- 👎 Naming convention can be hard

#### Option A2: Leveled layers

The map exported would be leveled, creating an order for a stack of UI elements.
The layers can be defined as follows:

```ts
// packages/tokens/src/global/zIndexes.ts

import { ZIndexes } from '../types';

/**
 * Global z-index values for elements
 * Ordered according to Fluent V2 guidelines
 */
export const indexes: ZIndexes = {
  level0: 0, // Elevation 0
  level1: 1, // Elevation 2
  level2: 1000, // Elevation 4
  level3: 2000, // Elevation 8
  level4: 3000, // Elevation 16
  level5: 4000, // Elevation 28
  level6: 5000, // Elevation 64
  level7: 6000, // High priority elements
};
```

##### Pros

- ❌ Honestly, none.

##### Cons

- 👎 Hard to understand the layering context. e.g: What level3 means in comparison with level2 or level4?
- 👎 Doesn't allow future changes if a level needs to be introduced in between. level2.5?

#### Issues

This approach only standardize the layers and define z-index values for them. This is great for the current state of our components that define arbitrary values, but won't solve a very specific problem: Defining priority for similar UI elements. e.g. Two Dialogs are created. Which of them should have higher priority and therefore be displayed on top?

### Option B: z-index handling context

---

TODO: Add more options

```tsx
const { setPriority, getIndex } = useZIndex();

const element1 = useRef<HTMLDivElement>(null);
const element2 = useRef<HTMLDivElement>(null);

React.useEffect(() => {
  setPriority('popup', [element1, element2]);
}, [element1, element2]);

const getElement1Index = React.useCallback(() => {
  const index = getIndex(element1);

  console.log(index);

  return index;
}, [element1]);
```
