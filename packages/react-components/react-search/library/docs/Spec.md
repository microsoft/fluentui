# @fluentui/react-search Spec

## Background

`SearchBox` is a text input field abstracting `<input type="search" />`.

## Prior Art

- [Ant Design](https://ant.design/components/input)
- [Carbon](https://carbondesignsystem.com/components/search/usage/)
- [Lightning Design](https://www.lightningdesignsystem.com/components/input/)
- [Material UI](https://mui.com/material-ui/react-text-field/)
- [Spectrum](https://react-spectrum.adobe.com/react-spectrum/SearchField.html)

In prior art, searchboxes are often integrated within an input or text component. These searchboxes often have a search icon that precedes the input and a clear button that follows the input. However, they lack support for additional content.

### Comparison of v8 and v0

#### v8

The v8 SearchBox component is implemented as a text input field that lacks a type attribute.

The v8 component supports:

- a customizable leading icon, with the default being a search icon
- hiding the leading icon when the search box is in focus by default, to allow the search content to span the entire width of the search box
- animation of the disappearance and reappearance of the leading icon, sliding in and out from the left side of the search box
- a clear button that appears at the end of the search bar, present in the tab order, when the component is in focus and the search box is not empty
- flipping of elements in right-to-left locales

The v8 component spans the entire width of its parent component. There are two visual variants of the v8 component: default and underlined. The v8 component can be disabled.

[Documentation for v8 SearchBox](https://developer.microsoft.com/en-us/fluentui#/controls/web/searchbox)

```
<SearchBox
    ariaLabel="SearchBox"
    placeholder="Search"
    onSearch={newValue => console.log('value is ' + newValue)}
/>
```

#### v0

Because v0 does not have a designated search component, search functionalities fall upon the Input component. The v0 Input component is implemented as a text input field with `type="text"`. If the input is search, the input will include `role="search"`.

The v0 component supports:

- an icon positioned at either the beginning or the end of the input
- if the input is clearable, the clear icon will replace the custom icon when there is content in the input box and it is in focus
- being used inline with text
- input labels, which can be placed outside, inline, or inside of the component
- flipping of elements in right-to-left locales

The v0 component has a fixed width that can be changed to span the length of its parent component. Visual variants of the v0 component can be controlled using props. The v0 component can be disabled.

[Documentation for v0 Input](https://fluentsite.z22.web.core.windows.net/0.59.0/components/input/definition)

#### Conclusion

- The v9 component will support a leading icon that is a search icon by default.
- There will be support for a clear button that appears at the end of the search bar when the component is in focus and the search box is not empty.
- Flipping of elements in right-to-left locales will be supported.

## Sample Code

```
<SearchBox
  appearance="underline"
  className="rootClass"
  input={{ className: 'searchBoxClass' }}
  id="searchBox1"
  value="something"
  onChange={(ev, data) => console.log(data.value)}
  contentBefore={<SearchIcon />}
  contentAfter={<MicIcon />}
  dismiss={<ClearIcon />}
/>
```

## Variants

### Visual variants

Search supports the same appearance variants as Input, as follows:

- `outline` (default): the field has a full outline, with a slightly darker underline on the bottom
- `underline`: the field has an underline on the bottom only
- `filledDarker`: the field has a gray background and no underline/outline
- `filledLighter`: the field has a white background and no underline/outline (for use on top of gray/colored backgrounds)

## API

See [SearchBox.types.ts](../src/components/SearchBox/SearchBox.types.ts)

## Structure

SearchBox uses Input as its root element, making`input` the primary slot. Per the [native element props/primary slot RFC](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/native-element-props.md), this means that most top-level props will go to `input`, but the top-level `className` and `style` will go to the actual root element.

The `contentAfter` and `dismiss` are bundled into one div and used as

Notes on the HTML rendering:

- Using `span` rather than `div` prevents nesting errors if the Input is rendered inline within a `<p>`.
- The root is visually styled as the input (with borders etc) and the `contentBefore`, `contentAfter`, and actual `input` elements are positioned inside it.\

## Migration

See [MIGRATION.md](./MIGRATION.md)

## Behaviors

The input behavior is inherited from the native `<input>` element.

The component has the following interactive states:

- Rest
- Hover: change stroke color
- Pressed: apply focus border style as animation
- Focused: currently indicated by a thick brand color stroke on the bottom border only (regardless of whether focus was by keyboard or mouse)

Keyboard, cursor, touch, and screen reader interaction will be handled automatically by the internal `<input>`.

The dismiss button will appear when the component is in focus. When pressed, it will clear the value in the input. Note that this button is not in the tab order.

We don't implement enter to search, this would come from the consuming team.

## Accessibility

Most interaction and screen reader behavior will be handled automatically by the internal `<input type="search">`.

- The `<input>` is visible and shows the placeholder or value text.
- The component doesn't provide a built-in label, so it's important for the user to pass in appropriate attributes such as `id` (associated with a label using `htmlFor`), `aria-label`, or `aria-labelledby`.
- The clear button is not in the tab order and should not recieve focus; otherwise, no features in the initial implementation require manipulation of focus, tab order, or key handling.
- Visual states for focus and hover will be applied to `root` rather than the `<input>` itself (which is rendered without a border and only used to show the text), because the `contentBefore`, `contentAfter`, and `dismiss` slots need to visually appear to be within the input.
- Authors using SearchBox for a top-level site search are encouraged to wrap the component in a landmark with `role="search"`
- Keyboard users can use keyboard shortcuts to clear the value.
- The clear button is exposed to voice control and screen reader users.
