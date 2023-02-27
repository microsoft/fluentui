# Avatar

The Avatar component represents a person or entity. It displays the person's image, initials, or an icon, and can be either circular or square.

## **Design Spec**

[Link to Avatar in Figma](https://www.figma.com/file/3SlxyaJA3tpLs5rVZ4oTVj/Avatar?node-id=0%3A1&t=Ugsg41JLdURbxd7i-1)

<br />

## **Engineering Spec**

Fluent WC3 Avatar has feature parity with the Fluent UI React 9 Accordion implementation but not direct parity.

<br />

## Class: `Avatar`

<br />

### **Component Name**

`<fluent-avatar></fluent-avatar>`

<br />

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Avatar>`        | `<fluent-avatar>`       |

<br />

**Property Mapping**
| Fluent UI React 9 | Fluent Web Components 3 | Description of difference |
| ------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------- |
| `idForColor: string`| `colorId: string` | both are strings, the delta here is primarily verbosity. In web components attributes need to follow HTML syntax for attributes. The property of `colorId` maps to `color-id`. Were we to map directly we would have an attribute of `id-for-color` which seems overly verbose. Almost all HTML attributes are at max hyphenated once. This proposes an attribute which is less verbose and only requires a single `-`. |
| `size` | `size` | |
| `shape` | `shape` |
| `active` | `active` | The only delta here is that the web components are aligning to the resolved RFC to use `undefined` for fields which are intended to "unset" attributes |
| `activeAppearance` | `appearance` | The delta here is semantic only, unless we need to reserve the appearance namespace, brevity seems preferred here |
| `name` | `name` |
| `initials` | `initials` |

**Additional Deltas:**

The FUIR9 implementation seems to utilize several "slots", whereas with the web component implementation includes two primary slots.

1. Default slot - When a name or initials is provided, the default slot projects the initials generated via name or initials. If an image is slotted into the default slot, the image will be shown. If an SVG is slotted into the default slot an SVG will project overriding any other value. If name and initials are not provided and nothing is slotted, the default avatar svg is projected.
2. Badge - The slot for the badge
