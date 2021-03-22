# RFC: [First Rule of ARIA](https://w3c.github.io/using-aria/#rule1) for converged components

---

@bsunderhus
@smhigley

## Summary

This RFC proposes to promote using semantic elements as default and providing
options to opt-out of semantic elements through Shorthand props.

For the moment this RFC does not provide any form of API, is just a pattern to be followed. Perhaps in the future some internal API could be developed to better support this.

## Background

This idea appeared during discussions of the implementation of [Accordion converged component](https://github.com/microsoft/fluentui/tree/master/packages/react-accordion). Some controversial opinions came up during A11y discussions, coming up with plausible ideas of how the Accordion component should be to ensure not only A11y but to avoid usage of ARIA if possible. This proposal is the generalization of those ideas as a whole for all converged components.

## Problem statement

The first rule of accessibility is that it is impossible to predict how a user will attempt to interact with your interface. We test some basics: screen readers, static zoom, high contrast mode, and keyboard access, but this utterly fails to capture the wide variety of tools and access methods used in the real world. From extreme red light filters to custom switch setups to a browser's reader mode to eye gaze and voice control, what access looks like in practice is often messy and unpredictable. Disabilities often overlap, and assistive tech is frequently used in ways we do not test for.

As a very limited example, we currently test a few common screen readers under the assumption that the people using them are blind, on a modern device, and reasonably proficient with the software. Here are some ways people use screen readers that do not fit our current test criteria:

- As a supplement to low vision, used primarily to read text, while sight + mixed mouse & keyboard input is still used to understand and navigate the UI
- To assist in reading and navigating by someone who has perfect vision, but has migraines that are exacerbated by concentrating on screens
- To read text by someone with perfect vision, as an aid for a cognitive disability like dyslexia
- With a braille display, by someone who is deafblind
- With a screen magnifier, e.g. ZoomText Fusion

None of these use cases are particularly unusual, and there are certainly many more uses that I'm not personally aware of. And there is even more diversity found in assistive tech beyond screen readers. On the more well-known end, we have tools like voice control software, zoom/text enlarging, Windows High Contrast Mode and other color-altering software, and switch devices. But then we also have tools like Edge's Immersive Reader, browser extensions to pause auto-playing gifs and videos, eye control, and even adblockers are a form of assistive tech to the right person. Each of these can be just as vital for accessing the web as screen readers are.

All this diversity of interaction introduces the problem of how to support it, particularly since it's impossible to test everything. As a general rule, the best way to create robustly accessible UI is to rely on features and interaction built into the web platform. This essentially means using semantic HTML whenever possible, and relying on browsers to translate that UI into a usable experience across platforms and tech. As soon as we create a custom interactive control with ARIA instead of HTML, we take on full responsibility for ensuring that interaction works across all access tools. That task is often difficult, and sometimes impossible.

Some examples of where `<div>`s + ARIA fall down vs. semantic HTML include:

- Some of the most popular voice control software has very limited support for ARIA
- Windows High Contrast Mode only assigns color based on HTML semantics, not ARIA
- Certain touch-based screen reader interactions do not trigger standard DOM events, so a control like `<input type="range">` is actually impossible to recreate accessibly with `<div>`s + ARIA (touch-based screen readers will not increment/decrement an ARIA slider)
- Here's a thread that covers some of the differences between a `<textarea>` and a `<div role="textbox" contenteditable>`: https://twitter.com/codingchaos/status/1157001879991152640?s=20
- A `<select>` element cannot be recreated with ARIA in a way that works seemlessly across platforms: mobile browsers often have completely custom rendering of the options list, and the platform API mappings are actually different between Windows, macOS, and iOS/Android.
- Sometimes live regions are used to make up for differences between native behavior and custom ARIA widgets. This technique usually falls spectacularly flat on braille displays, where live regions have notably flaky support, particularly when they conflict with interaction.

The difficulty replicating the robust nature of HTML with custom scripting and ARIA is why the [First Rule of ARIA](https://w3c.github.io/using-aria/#rule1) is "don't use ARIA".

## Detailed Design or Proposal

The proposal is a pattern in favor of using semantic elements as default for every convergence component. This is particularly important for interactive elements like buttons, links, inputs, radios, etc.

The specific recommended steps to take are:

- Whenever a semantic HTML element exists that covers the desired semantics and interaction, it should be used if at all possible.
- Whenever we want to provide options beyond what HTML allows in an interactive widget, we should provide authors an option to use a semantic HTML version (e.g. Dropdown should have an author option to use a `<select>` element, even if we also allow a custom version with a stylable extendable options list).
- When creating form components, use a `<label for="id">` element instead of `aria-label` or `aria-labelledby`.
- When creating a component that does not exist in HTML like a tab control, try to make the base interactive controls using semantic HTML elements augmented with ARIA (so `<button role="tab">` instead of `<div role="tab">`) whenever it makes sense to do so.

For example a table following semantic elements would look like:

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableCell colSpan={2}>
        The table header
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        The table body
      </TableCell>
      <TableCell>
        with two columns
      </TableCell>
    </TableRow>
  </TableBody>
</Table>


// renders to

<table>
  <thead>
    <tr>
      <th colspan="2">The table header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The table body</td>
      <td>with two columns</td>
    </tr>
  </tbody>
</table>
```

Since table is a common example of virtualization scenarios, where elements, content, headers, etc,. can be added on the go by JS code, the structural behavior provided by semantic elements can be easily compromised. For example in the case where a div is added between `tbody` and `tr` for scrolling purposes.

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableCell colSpan={2}>
        The table header
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <div>
      <TableRow>
        <TableCell>
          The table body
        </TableCell>
        <TableCell>
          with two columns
        </TableCell>
      </TableRow>
    </div>
  </TableBody>
</Table>

<table>
  <thead>
    <tr>
      <th colspan="2">The table header</th>
    </tr>
  </thead>
  <tbody>
    <!-- This div breaks the markup, since tbody cannot contain  -->
    <div>
      <tr>
        <td>The table body</td>
        <td>with two columns</td>
      </tr>
    </div>
  </tbody>
</table>
```

The idea of going for semantic first approach is to ensure that in the default cases, where the user of the lib simply doesn't care about edge cases such as `a` element inside of a `button` element, semantic elements will be used ensuring a better overall experience across different environments, and in the edge cases there's an option to dispose the semantic element for something more generic and ARIA.

The example above could easily be converted to ARIA:

```tsx
// This as="div" is informs all compound components to opt-out of semantic-first approach
<Table as="div">
  <TableHead>
    <TableRow>
      <TableCell colSpan={2}>
        The table header
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <div>
      <TableRow>
        <TableCell>
          The table body
        </TableCell>
        <TableCell>
          with two columns
        </TableCell>
      </TableRow>
    </div>
  </TableBody>
</Table>

<div role="table">
  <div role="rowgroup">
    <div role="row">
      <span role="columnheader" aria-colspan="2">The table header</span>
    </div >
  </div>
  <div role="rowgroup">
    <div>
      <div role="row">
        <span role="cell">The table body</span>
        <span role="cell">with two columns</span>
      </div>
    </div>
  </div>
</div>
```

This proposal does not introduce any API, is just a pattern to be followed when creating converged components, and valid to add that in extreme cases, like the table, that semantic first approach is simply not viable, than this should be ignored.

### Explain if not possible to implement

In the case of components that simply cannot follow this pattern a session in the Spec of that component
should be dedicated to explain why this pattern hasn't being followed, to avoid future attempts of converting the component for the pattern.

### Pros and Cons

#### Pros

- Better support overall for A11y

#### Cons

- Styles override to remove styles from semantic elements will be necessary
- In cases of heading, a lvl attribute might be required
- In cases of virtualization, semantic elements are not recommended (big problem for lists, menus, tables, and other components that depend on a group of items)

## Other Solutions

Instead of going "semantic first" the total opposed approach would be going with generic elements as `div` with ARIA to ensure behavior as default and using Shorthand Props in cases that user wants to use semantic elements.

This is also a valid implementation, and if this solution is more desired than "semantic first" than the proposal should adapt to that. Open to discussion.
