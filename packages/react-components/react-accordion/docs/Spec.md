# Accordion

## Background

### Definition

This spec defines the default function of an `Accordion` as a vertically stacked set of interactive panels that each contain a title and content snippet.

An accordion is a vertically stacked group of collapsible sections. An accordion is composed of grouped buttons and panels. When a user selects an accordion button, its corresponding panel should switch between 'open' and 'collapsed' states.

Accordions follow many consistent patterns but do allow for some variability in behavior. For example, some accordions only allow one panel to be open at a time, where others may allow multiple or all panels to be open simultaneously. Similarly, many accordions will allow all panels to be simultaneously collapsed, while others may require one panel to be open at all times.

If you are familiar with the disclosure pattern, an accordion will feel very similar. The key distinction is that a disclosure is a standalone component that consists of a single button-panel-group. Because of this, you cannot navigate between different disclosures with a keyboard the same way you can with an accordion.

## Prior art

As a part of the spec definitions in Fluent UI, a research effort has been made through [Open UI](https://open-ui.org/). The current research proposal is available as an open source contribution undergoing review ([research proposal](https://github.com/WICG/open-ui/pull/263))

## Comparison of `@fluentui/react` and `@fluentui/react-northstar`

- All mentions of v7 or v8 == `@fluentui/react` ([docsite](https://developer.microsoft.com/en-us/fluentui#/))
- All mentions of v0 == `@fluentui/react-northstar` ([docsite](https://fluentsite.z22.web.core.windows.net/))

There's no comparison to be done between the two libraries, since v8 hasn't implemented this component.

## API

The `Accordion` should implement a `children` based API as is the standard across all the surveyed alternatives as a part of Open UI research in [Prior Art](#prior-art). The component will leverage the use of React's Context API in the interaction and data flows of child components.

Sample usages will be given in the following section of this document [Sample code](#sample-code)

### Accordion

The root level component serves context and common API between all children.

```ts
export type AccordionProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Indicates if keyboard navigation is available and gives two options,
     * linear or circular navigation
     */
    navigation?: 'linear' | 'circular';
    /**
     * Indicates if Accordion support multiple Panels opened at the same time
     */
    multiple?: boolean;
    /**
     * Indicates if Accordion support multiple Panels closed at the same time
     */
    collapsible?: boolean;
    /**
     * value indicating the items that are opened
     * If used, the component will be in controlled mode
     */
    openItems?: AccordionItemValue | AccordionItemValue[];
    /**
     * Index indicating the panels that are opened
     */
    defaultOpenItems?: AccordionItemValue | AccordionItemValue[];
    /**
     * Size of spacing in the heading
     */
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    /**
     * The component to be used as button in the heading
     */
    button?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
    /**
     * Expand icon slot rendered before (or after) children content in heading
     */
    expandIcon?: ShorthandProps<AccordionHeaderExpandIconProps>;
    /**
     * The position of the expand  icon slot in heading
     */
    expandIconPosition?: 'start' | 'end';
    /**
     * Extra icon slot rendered before children content in heading
     */
    icon?: ShorthandProps<AccordionHeaderIconProps>;
    /**
     * Indicates if the AccordionHeader should be inline-block
     */
    inline?: boolean;
    onToggle?(event: AccordionToggleEvent, data: AccordionToggleData): void;
  };
```

### AccordionItem

Each Combination of `AccordionHeader` and `AccordionPanel` should be inside an `AccordionItem`, and The `Accordion` component should contain one or more `AccordionItem`.

```ts
export type AccordionItemProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Disables opening/closing of panel inside the item
     */
    disabled?: boolean;
    /**
     * required value that identifies this item inside an Accordion component
     */
    value: AccordionItemValue;
  };
```

### AccordionHeader

Label for or thumbnail representing a section of content that also serves as a control for showing, and in some implementations, hiding the section of content

```ts
export type AccordionHeaderProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Size of spacing in the heading
     */
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    /**
     * The component to be used as button in heading
     */
    button?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
    /**
     * Expand icon slot rendered before (or after) children content in heading
     */
    expandIcon?: ShorthandProps<AccordionHeaderExpandIconProps>;
    /**
     * The position of the expand  icon slot in heading
     */
    expandIconPosition?: 'start' | 'end';
    /**
     * Extra icon slot rendered before children content in heading
     */
    icon?: ShorthandProps<AccordionHeaderIconProps>;
    /**
     * Indicates if the AccordionHeader should be inline-block
     */
    inline?: boolean;
  };
```

### AccordionPanel

Section of content associated with an accordion header.

## Sample code

The below samples do not represent the definitive props of the final implemented component, but represent the ideal final implementations. Can be subject to change during the implementation phase.

### Basic Accordion

```tsx
const accordion = (
  <Accordion>
    <AccordionItem>
      <AccordionHeader>
        First Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the first Panel
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        Second Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the second Panel
      </AccordionPanel>
    </AccordionItem>
  <Accordion>
)
```

Expected DOM output

```html
<div>
  <div role="heading">
    <div role="button" aria-expanded="false" aria-controls="sect1" id="accordion1">
      <svg>Chevron Icon</svg>
      First Panel
    </div>
  </div>
  <div id="sect1" role="region" aria-labelledby="accordion1">This is the content of the first Panel</div>
  <div role="heading">
    <div role="button" aria-expanded="false" aria-controls="sect2" id="accordion2">
      <svg>Chevron Icon</svg>
      Second Panel
    </div>
  </div>
  <div id="sect2" role="region" aria-labelledby="accordion2">This is the content of the second Panel</div>
</div>
```

### One panel opened Accordion

```tsx
const accordion = (
  <Accordion open={0}>
    <AccordionItem>
      <AccordionHeader>
        First Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the first Panel
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        Second Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the second Panel
      </AccordionPanel>
    </AccordionItem>
  <Accordion>
)
```

Expected DOM output

```html
<div>
  <div role="heading">
    <div role="button" aria-expanded="true" aria-controls="sect1" id="accordion1">
      <svg>Chevron Icon</svg>
      First Panel
    </div>
  </div>
  <div id="sect1" role="region" aria-labelledby="accordion1">This is the content of the first Panel</div>
  <div role="heading">
    <div role="button" aria-expanded="false" aria-controls="sect2" id="accordion2">
      <svg>Chevron Icon</svg>
      Second Panel
    </div>
  </div>
  <div id="sect2" role="region" aria-labelledby="accordion2">This is the content of the second Panel</div>
</div>
```

### Opened Accordion

To have multiple panels opened at the same time an Accordion must use the `multiple` property.

```tsx
const accordion = (
  <Accordion open={[0, 1]} multiple>
    <AccordionItem>
      <AccordionHeader>
        First Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the first Panel
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader>
        Second Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the second Panel
      </AccordionPanel>
    </AccordionItem>
  <Accordion>
)
```

Expected DOM output

```html
<div>
  <div role="heading">
    <div role="button" aria-expanded="true" aria-controls="sect1" id="accordion1">
      <svg>Chevron Icon</svg>
      First Panel
    </div>
  </div>
  <div id="sect1" role="region" aria-labelledby="accordion1">This is the content of the first Panel</div>
  <div role="heading">
    <div role="button" aria-expanded="true" aria-controls="sect2" id="accordion2">
      <svg>Chevron Icon</svg>
      Second Panel
    </div>
  </div>
  <div id="sect2" role="region" aria-labelledby="accordion2">This is the content of the second Panel</div>
</div>
```

### Custom icon Accordion panel

```tsx
const accordion = (
  <Accordion expandIconPositon="end">
    <AccordionItem>
      <AccordionHeader expandIcon={<CustomIcon/>}>
        First Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the first Panel
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader expandIcon={<AnotherCustomIcon/>}>
        Second Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the second Panel
      </AccordionPanel>
    </AccordionItem>
  <Accordion>
)
```

Expected DOM output

```html
<div>
  <div role="heading">
    <div role="button" aria-expanded="false" aria-controls="sect1" id="accordion1">
      First Panel
      <svg>CustomIcon</svg>
    </div>
  </div>
  <div id="sect1" role="region" aria-labelledby="accordion1">This is the content of the first Panel</div>
  <div role="heading">
    <div role="button" aria-expanded="false" aria-controls="sect2" id="accordion2">
      Second Panel
      <svg>AnotherCustomIcon</svg>
    </div>
  </div>
  <div id="sect2" role="region" aria-labelledby="accordion2">This is the content of the second Panel</div>
</div>
```

### Custom heading Accordion panel

```tsx
const accordion = (
  <Accordion>
    <AccordionItem>
      <AccordionHeader as="h1">
        First Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the first Panel
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionHeader as="h1">
        Second Panel
      </AccordionHeader>
      <AccordionPanel>
        This is the content of the second Panel
      </AccordionPanel>
    </AccordionItem>
  <Accordion>
)
```

Expected DOM output

```html
<div>
  <h1>
    <div role="button" aria-expanded="false" aria-controls="sect1" id="accordion1">
      <svg>Chevron Icon</svg>
      First Panel
    </div>
  </h1>
  <div id="sect1" role="region" aria-labelledby="accordion1">This is the content of the first Panel</div>
  <h1>
    <div role="button" aria-expanded="false" aria-controls="sect2" id="accordion2">
      <svg>Chevron Icon</svg>
      Second Panel
    </div>
  </h1>
  <div id="sect2" role="region" aria-labelledby="accordion2">This is the content of the second Panel</div>
</div>
```

## Behaviors

- Keyboard navigation should be optional and native tabbing used by default.
- Circular Navigation should be optional and disabled by default.

### Useful references

The below references were used to decide an appropriate keyboard interactions from an a11y perspective.

- https://www.w3.org/TR/wai-aria-practices/#accordion
- https://www.w3.org/TR/wai-aria-practices/#example
- https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction

### Accordion panel open/close

An accordion panel can be open/close by the following user interactions on the heading. Not all interactions should be supported at the same time, but the component must be able to support combinations of the below interactions.

As a general rule, once the accordion is closed the focus should return to the heading element once the accordion is closed unless the interaction would involve another focusable element.

| Type     | Action     | Result      | Details                                                     |
| -------- | ---------- | ----------- | ----------------------------------------------------------- |
| Mouse    | Click      | Open        | Click on a closed heading                                   |
| Mouse    | Click      | Close       | Click on an opened heading                                  |
| Keyboard | Enter      | Open        | Pressed with focus on a closed heading                      |
| Keyboard | Enter      | Close       | Pressed with focus on an opened heading                     |
| Keyboard | Space      | Open        | Pressed with focus on a closed heading                      |
| Keyboard | Space      | Close       | Pressed with focus on an opened heading                     |
| Type     | Action     | Result      | Details                                                     |
| Keyboard | Down Arrow | Moves Focus | Moves focus to the next panel heading (may be circular)     |
| Keyboard | Up Arrow   | Moves Focus | Moves focus to the previous panel heading (may be circular) |
| Keyboard | Home       | Moves Focus | Moves focus to the first panel heading                      |
| Keyboard | End        | Moves Focus | Moves focus to the last panel heading                       |

## Accessibility

Accessibility behavior is built into the spec as much as possible. This section addresses specific issues that don't fit well with the standard definition of the component.

### No heading level on `AccordionHeader` by default

As described on [WAI-ARIA Roles, States, and Properties](https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties) documentation for accordion:

> Each accordion header button is wrapped in an element with role heading that has a value set for aria-level that is appropriate for the information architecture of the page.

Every `AccordionHeader` should have as its root a semantic heading element: `h1`, `h2`, `h3`, `h4`, `h5` or `h6`. Alternatively `role="heading"` and a proper `aria-level` attribute. This behavior is not implemented by default on `AccordionHeader` as it's impossible to predict which heading level will be required by the user. Requiring manual addition of such ARIA requirement.

```tsx
{/* No heading level by default */}
<AccordionHeader>This is a header</AccordionHeader>
{/* Generated html */}
<div>
  <button>This is a header</button>
</div>

{/* as semantic heading */}
<AccordionHeader as="h4">This is a header</AccordionHeader>
{/* Generated html */}
<h4>
  <button>This is a header</button>
</h4>

{/* if no semantic heading can be used */}
<AccordionHeader role="heading" aria-level="4">This is a header</AccordionHeader>
{/* Generated html */}
<div role="heading" aria-level="4">
  <button>This is a header</button>
</h4>
```
