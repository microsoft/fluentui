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
- A `<select>` element cannot be recreated with ARIA in a way that works seamlessly across platforms: mobile browsers often have completely custom rendering of the options list, and the platform API mappings are actually different between Windows, macOS, and iOS/Android.
- Sometimes live regions are used to make up for differences between native behavior and custom ARIA widgets. This technique usually falls spectacularly flat on braille displays, where live regions have notably flaky support, particularly when they conflict with interaction.

The difficulty replicating the robust nature of HTML with custom scripting and ARIA is why the [First Rule of ARIA](https://w3c.github.io/using-aria/#rule1) is "don't use ARIA".

## Detailed Proposal

The proposal is a pattern in favor of using semantic elements as a default (with opt-out mechanisms) for convergence components. This is particularly important for interactive elements like buttons, links, inputs, radios, etc.

This proposal does not introduce any API, is just a pattern to be followed when creating converged components, and valid to add that in extreme cases, like table, that semantic first approach is simply not viable, than this should be ignored.

Converged components should follow these steps:

---

If is equivalent to native element - `Button`, `Link`, `Select`

- Should use native element by default
- Should implement [as-props](./as-props.md) to opt-out native element
- Should limit possible elements to opt-out (e.g: `Button` should opt-out from `button` for `div` and `span`)
- In case of opting-out element should implement required ARIA event listeners and attributes, such as `role`
- Provide authors an option to use a semantic HTML version (e.g. Dropdown should have an author option to use a `<select>` element, even if we also allow a custom version with a stylable extendable options list).

##### Button Example

```tsx
<Button>This is a Simple Button</Button>
<Button as="div">This is a div that looks and behaves as a Button</Button>
<Button as="div" role={undefined} tabIndex={undefined}>
  This is a div that looks like Button but doesn't behave as such
  therefore, I can add a <Link to="/somewhere">Link inside of it</Link>
</Button>
```

```html
<!-- Semantic version -->
<button class="button-class">This is a Simple Button</button>
<!-- Aria version -->
<div class="button-class" tabindex="0" role="button">This is a div that looks and behaves as a Button</div>
<!-- Style only -->
<div class="button-class">
  This is a div that looks like Button but doesn't behave as such therefore, I can add a
  <a href="/somewhere">Link inside of it</a>
</div>
```

---

If isn't equivalent to native elements but can benefit from using native elements in it's implementation - `Accordion`, `Carousel`, `Disclosure`, `MenuButton`, `Menu`, `MenuBar`, `Tabs`

- Should treat internal elements that could follow previous category as such (e.g: `Accordion` has an internal element with role `button`, this element should previous category)
- Provide authors an option to use a semantic HTML version (e.g. Dropdown should have an author option to use a `<select>` element, even if we also allow a custom version with a stylable extendable options list).

##### Accordion Example

```tsx
<Accordion>
  <AccordionItem>
    <AccordionHeader>Header</AccordionHeader>
    <AccordionPanel>Content</AccordionPanel>
  </AccordionItem>
</Accordion>

<Accordion>
  <AccordionItem as="div">
    <AccordionHeader button={{as: "div", role: undefined, tabIndex: undefined}}>
      Header <Link to="/somewhere">Link</Link>
    </AccordionHeader>
    <AccordionPanel>Content</AccordionPanel>
  </AccordionItem>
</Accordion>
```

```html
<!-- accordion header -->
<h3 class="header-class">
  <button id="header-1" aria-disabled="false" class="header-button-class" aria-controls="panel-1">Header</button>
</h3>
<!-- accordion panel -->
<div id="panel-1" role="region" aria-labelledby="header-1" class="panel-class">Content</div>

<!-- accordion header -->
<div role="heading" class="header-class">
  <div id="header-1" aria-disabled="false" class="header-button-class" aria-controls="panel-1">
    Header <a href="/somewhere">Link</a>
  </div>
</div>
<!-- accordion panel -->
<div id="panel-1" role="region" aria-labelledby="header-1" class="panel-class">Content</div>
```

---

If isn't equivalent to native elements and can detriment from using native elements in it's implementation - `Table`, `List`, `Tree View`, `Tree Grid`, `Grids`

- Should not follow 1st rule of ARIA
- In the case of components that simply cannot follow this pattern a session in the Spec of that component
  should be dedicated to explain why this pattern hasn't being followed, to avoid future attempts of converting the component for the pattern.

---

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
