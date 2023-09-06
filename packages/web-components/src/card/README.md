# Card

A `Card` is a container that holds information and actions related to a single concept or object, like a document or a contact.

A `Card` can give information prominence and create predictable patterns. While they're very flexible, it's important to use them consistently for particular use cases across experiences.

## **Design Spec**

[Link to Card in Figma](https://www.figma.com/file/berhUBA6mJV9sCPpjgfKRj/Card?type=design&node-id=6503-13927&mode=design&t=esnGps8mGKqly4I1-0)

<br />

## **Engineering Spec**

Fluent WC3 Card has feature parity with the Fluent UI React 9 Card implementation but not direct parity.

<br />

## Class: `Card`

<br />

### **Component Name**

`<fluent-card></fluent-card>`

<br />

### **Variables**

| Name              | Description                | Type                                                                                                  |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `cardSize`        | Control sizes for the Card | `{ small: "small", medium: "medium", large: "large" }`                                                |
| `cardAppearance`  | Appearances for the Card   | `{ filled: "filled", filledAlternative: "filled-alternative", outline: "outline", subtle: "subtle" }` |
| `cardOrientation` | Orientations for the Card  | `{ horizontal: "horizontal", vertical: "vertical" }`                                                  |

<br />

### **Events**

| Name                | Type | Description                                                       | Inherited From |
| ------------------- | ---- | ----------------------------------------------------------------- | -------------- |
| `onSelectionChange` |      | Emits a custom event when the selected state changes              |                |
| `onClick`           |      | Emits an onclick event when the card is `interactive` and clicked |                |

<br />

### **Attributes**

| Name              | Type                                                                     | Default    | Description                                                                      |
| ----------------- | ------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------------------------- |
| `orientation`     | `horizontal, veritcal`                                                   | `vertical` | Orientation of the card                                                          |
| `size`            | `small, medium, large`                                                   | `medium`   | Define the minimum size of the card. Smaller sizes only apply to horizontal card |
| `scale`           | `fixed, auto-width, auto-height, auto, fluid-width, fluid-height, fluid` | `auto`     | Manages how the card handles it's scaling depending on the content               |
| `appearance`      | `filled, filled-alternative, outline, subtle`                            | `filled`   | Sets the appearance of the card                                                  |
| `selected`        | `boolean`                                                                | `false`    | Set to `true` if card is selected                                                |
| `defaultSelected` | `boolean`                                                                | `false`    | Set to `true` if card is selected                                                |
| `disabled`        | `boolean`                                                                | `false`    | Determines whether card is disabled                                              |
| `selectable`      | `boolean`                                                                | `false`    | Determines whether card is selectable                                            |
| `interactive`     | `boolean`                                                                | `false`    | Determines whether card is interactive                                           |

### **Methods**

| Name                | Description                                     |
| ------------------- | ----------------------------------------------- |
| `onSelectionChange` | Callback called when the card selection changes |

### **Slots**

| Name              | Description                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `floating-action` | placeholder for a custom interactive element, such as a checkbox, that can be used to make the card form-connected and provide a more visually prominent interaction point. |
| `header`          | the header slot                                                                                                                                                             |
|                   | the default slot                                                                                                                                                            |
| `footer`          | the footer slot                                                                                                                                                             |

# Proposal for Interactive and Selectable Card Implementation

The Fluent UI Card component can exhibit "selectable" and "interactive" behaviors.

These behaviors can exist independently or in tandem, leading to four possible states for a Card:

<hr />

1. **Non-interactive and Non-selectable:** The Card acts purely as a content container, with no response to user interactions.

![image](https://github.com/microsoft/fluentui/assets/11062709/6de3c96a-71b4-45b5-84e2-587c01f96e47)

<hr />

2. **Interactive and Non-selectable:** The Card is responsive to user interactions, such as clicks, but does not have a selection state. This behavior is typically used for Cards that perform an action when clicked, but do not need to indicate a selected or unselected state.

![image](https://github.com/microsoft/fluentui/assets/11062709/5124cb7e-a26a-44cf-9e66-4997d6c2a908)

<hr />

3. **Non-interactive and Selectable:** The Card does not respond to general user interactions, but it can change its state or appearance to indicate selection, typically through a checkbox or similar control.

![image](https://github.com/microsoft/fluentui/assets/11062709/2eb178b2-f417-429d-943e-f7923cc91acd)

<hr />

4. **Interactive and Selectable:** The Card responds to user interactions and can also change its state or appearance to indicate selection. In this case, a user interaction such as a click can not only triggers an action but also toggles the selection state.

![image](https://github.com/microsoft/fluentui/assets/11062709/1dca9c90-909c-42ed-a44a-62854ac87a44)

<hr />

# Selectable Proposal

**React v9 Implementation**

The react-card component uses a floatingAction slot to render a floating action input and conditionally renders a default checkbox for selectable cards.
If a floatingAction element is provided, it will be rendered instead of the default checkbox.
The `selected`, `defaultSelected`, or `onSelectionChange` prop must be defined for the card to be selectable.

## Proposal

Dynamic Internal Checkbox Rendering in Fluent Card Component

## Objective

To add form connectedness to the Fluent Card component, aligning more closely with the react-card implementation.

## Implementation Details

**Internal Checkbox Rendering**

The Fluent Card component will feature an internal checkbox that is dynamically rendered within its template. This internal checkbox facilitates form connectivity when the selectable attribute is present.

**Floating-Action Slot Detection**

The component will be equipped with logic to detect the presence of an element in the floating-action slot.

**Conditional Rendering**

- Scenario 1: If an element is passed through the floating-action slot, the internal checkbox will not be rendered, giving precedence to the user's custom input.
- Scenario 2: If no element is passed through the floating-action slot and the selectable attribute is present, the internal checkbox will be rendered, ensuring the card remains form-connected.

## Proposed Deltas

**Selected Props v.s Selectable Attribute**

In the react-card component, selectability is determined by the presence of selected, defaultSelected, or onSelectionChange props. If any of these props are defined, the card is considered selectable and a checkbox is rendered to indicate selection state.

```ts
const isSelectable = [selected, defaultSelected, onSelectionChange].some(prop => typeof prop !== 'undefined');
```

In contrast, for the fluent-card web component, I'm proposing to use a `selectable` boolean attribute to control the selectability of the card. This approach is more semantically clear as it directly indicates the selectability of the card.

```ts
@attr({ mode: 'boolean' })
public selectable: boolean = false;
```

This change simplifies the API and makes it more intuitive to use.

## Benefits

- Flexibility: This approach allows users to either use the default internal checkbox or to provide their custom element through the floating-action slot, catering to a wider variety of use cases.
- Form Connectivity: Ensures that the card component maintains form connectivity in scenarios where the selectable attribute is utilized, without necessitating manual checkbox integration.

## Considerations

Documentation: Clear documentation would be required to guide users on how to effectively use the floating-action slot and selectable attribute in tandem.

# Interactive Proposal

**React v9 Implementation**

In the react-card component, interactivity is determined by the presence of certain event props such as onClick, onDoubleClick, onMouseUp, etc. If any of these props are defined, the card is considered interactive and can trigger the corresponding event. The interactivity also influences the styles applied to the card and its focus attributes.

## Proposal

For the fluent-card web component, I'm proposing to use an interactive boolean attribute to control the interactivity of the card. This approach is more semantically clear as it directly indicates the interactivity of the card.

## Objective

The objective is to align the Fluent Card component more closely with the react-card implementation, while providing a more intuitive and flexible API for controlling the card's interactivity.

## Implementation Details

The interactive attribute will be used to control the interactivity of the card. When the interactive attribute is set to true, the card becomes clickable and can trigger an onClick event. This is different from the selectable attribute, which controls whether the card can be selected or not.

```ts
@attr({ mode: 'boolean' })
public selectable: boolean = false;
```

## Proposed Deltas

The main difference between the react-card and the fluent-card implementations is how they determine the interactivity of the card. In the react-card, the interactivity is determined by the presence of certain event props, while in the fluent-card, it's controlled by a boolean attribute.

## **Preparation**

<br />

### **Fluent Web Component v3 v.s Fluent React 9**

<br />

**Component and Slot Mapping**

| Fluent UI React 9 | Fluent Web Components 3 |
| ----------------- | ----------------------- |
| `<Card>`          | `<fluent-card>`         |
| `<CardHeader>`    | `slot="header"`         |
| `<CardFooter>`    | `slot="footer"`         |

<br />
