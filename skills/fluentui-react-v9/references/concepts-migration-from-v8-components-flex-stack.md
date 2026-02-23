# @fluentui/react - Stack

## Default state

Stack's approach to layout is slightly different from Northstar's Flex, and CSS Flexbox, and a column layout is the default arrangement. For a clean usage scenario of Stack, these are the required CSS properties to achieve the same result:

### Render

### make-styles

### React

### React

MDN documentation:

- [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
- [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
- [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
- [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
- [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)
- [flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)

---

## as

The `as` property strictly replaces which element type will be rendered as the root node. The default value for this is `div`.

---

## disableShrink

### React

### React

MDN documentation:

- [flex-shrink](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink)

---

## gap

_`10px` is used below as an example value_

### React

### React

If you want to replicate the exact behavior of the prop, you'll have to keep in mind the following:

- For horizontal layouts, you need to apply the margin to either left or right.
- For vertical layouts, you need to apply the margin to either top or bottom.

To keep the margin only between the items, you can prevent it from being applied to the last (or first) element. Heres an example with an horizontal layout and margin-right:

_`10px` is used below as an example value_

### React

### React

As an alternative to this implementation, you can also use the CSS `gap` property. However, keep in mind that this is not the implementation in Stack, given that CSS `gap` is not supported by Internet Explorer 11, and might produce different results. If you do not have this limitation, you can use the following CSS:

_`10px` is used below as an example value_

### React

### React

MDN documentation:

- [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
- [margin](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
- [gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

---

## grow

### React

### React

MDN documentation:

- [flex-grow](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow)

---

## horizontal

### React

### React

MDN documentation:

- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)

---

## horizontalAlign / verticalAlign

horizontalAlign/verticalAlign change which props they affect depending on your `flex-direction`.

Here is a table you can follow for which prop to use for alignment:

| Direction  | `flex-direction` | Horizontal alignment | Vertical alignment |
| ---------- | ---------------- | -------------------- | ------------------ |
| default    | column           | align-items          | justify-content    |
| horizontal | row              | justify-content      | align-items        |

You can also refer to [this MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container) for a great in depth explanation about how alignment works in flex container.

MDN documentation:

- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)
- [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
- [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)

---

## maxHeight

_`10px` is used below as an example value_

### React

### React

MDN documentation:

- [max-height](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)

---

## maxWidth

_`10px` is used below as an example value_

### React

### React

MDN documentation:

- [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)

---

## padding

_`10px` is used below as an example value_

### React

### React

MDN documentation:

- [padding](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)

---

## reversed

`reversed` will append "reverse" to your `flex-direction` CSS prop. Below is a table to reflect what you should use:

| Alignment  | CSS    | With `reversed` prop |
| ---------- | ------ | -------------------- |
| default    | column | column-reverse       |
| horizontal | row    | row-reverse          |

Example usage for an horizontal layout:

### React

### React

MDN documentation:

- [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)

---

## verticalFill

### React

### React

MDN documentation:

- [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)

---

## wrap

The `wrap` prop will also change the rendering. As such find below the styles and rendering being applied:

### Render

### make-styles

### React

### React

MDN documentation:

- [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)
- [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
- [width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
- [max-width](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)
