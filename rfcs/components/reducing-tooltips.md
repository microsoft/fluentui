# RFC: Reduce instance of tooltips provided by default within Fluent components

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

Contributors: @smhigley

## Summary

This RFC proposes removing all built-in tooltips from our default shipped components, with the exception of icon text alternatives. For cases where we choose to include icon tooltips, the proposal is to use a custom tooltip rather than the `title` attribute.

## Background

Tooltips have a long history with overuse and poor accessibility, going back to their origin in early graphical OS's and web browsers. From the start, they were designed to work with a mouse and not much else. The end result is that now we have a bad habit of creating tooltip UI that is inaccessible, to a greater or lesser extent, with keyboard, non-mouse pointer, zoom, magnification, switch, and voice control.

Additionally, not all tooltips are equal: a tooltip on a static text container will never be accessible without a mouse, while a custom tooltip on an input could be made to work with mouse, keyboard, and other pointers. Tooltips that contain supplementary but unnecessary text do not cause as much harm when they cannot be accessed.

Tooltips used for truncation are often the worst of the bunch: they disproportionately impact people relying on zoom or small screens, and those people are also the ones who encounter more accessibility barriers interacting with them. Even without the accessibility barrier of the tooltip itself, truncation + tooltips creates a vastly more labor-intensive and unequal reading/skimming experience for people who need to increase text size. With WCAG 2.1's Reflow and Content on Hover/Focus criteria applying new requirements for zoom accessibility and tooltip accessibility, many of our current truncation tooltips will likely become compliance bugs in the near future as well.

Many of these forms of inaccessibility are not tested for, so we are continuing to harm people without catching it. Some of them are tested for, and we have difficult-to-resolve bugs against Fluent v7 and v8. Those include tooltips used in Persona/FacePile, DatePicker, DetailsList, Nav, picker options, and SwatchColorPicker.

The problems with the `title` attribute are even worse: the tooltip UI shipped by browsers is not keyboard-accessible at all, it cannot be dismissed on demand, it is not persistent, it does not scale with zoom or OS/browser font size settings, and does not respond to other font and color customizations.

There is more detailed information on tooltip accessibility problems and requirements in this [tooltip talk](https://www.youtube.com/watch?v=lb0_v7D4kbs) and [tooltip article](https://sarahmhigley.com/writing/tooltips-in-wcag-21/).

In addition to tooltip accessibility, adding Tooltip as a dependency of other components also increases the bundle size for those components.

## Problem statement

Our out-of-the-box experience in multiple components relies on tooltips to convey necessary information (e.g. the name of a persona in FacePile), or to enable truncation (e.g. Nav, pickers, Combobox). By choosing this UI pattern as our default, we are pushing authors to build less accessible experiences as well as creating more bugs, technical/UX debt, and higher maintenance costs for ourselves.

## Detailed Design or Proposal

Our current built-in tooltips fall into the following categories:

- Present because static text may be conditionally truncated (Nav links, grid cells, picker/combo options)
- As the text alternative for an icon of equivalent meaning (DatePicker, close buttons)
- As the text alternative for a graphic that is not equivalent on its own (Persona name, SwatchColorPicker colors)

I propose we approach these in three different ways:

1. Tooltips as an alternative for truncation pose the highest accessibility barrier, and we should avoid shipping these by default. We can style text to wrap instead, and if authors find a use case where they absolutely need both truncation and reveal-on-hover behavior, then they still have the ability to add tooltips if they wish to.
2. Most of the icons in Fluent's own UI are common enough that tooltip text is truly supplementary. We can bring them to Controls Club for a cross-Microsoft accessibility review, and either remove the tooltip entirely (e.g. on close icons) or keep current tooltips as-is, with maybe a little editing for brevity. If we keep some, we should include documentation about the expected limitations of these tooltips and why they still remain. For example, on a Toolbar example, we can show tooltips on custom icon buttons, alongside a "help" toolbar button that shows general info + a legend for tooltips.
3. Wherever we have tooltips used as the only visible text (e.g. for small Personas or color swatches), we should either work with designers on ways to provide the same information through another means, or on producing author guidance for adding alternative access to the same information outside the Fluent component in question.

### Pros and Cons

#### Pros:

- We ship components that are more accessible out-of-the box, with fewer hidden gotchas
- We help push more inclusive design patterns and practices across the company
- Fewer accessibility bugs on us, and decreased future a11y maintenance time
- Smaller bundle sizes for the components that do not have to ship with an internal Tooltip dependency
- Other UI libraries (e.g. Bootstrap's nav and table, and kendo's grid cells) implement wrapping and other non-truncation overflow styles by default, so we will be moving towards already-established UI patterns.

#### Cons:

- Some teams are going to want tooltips anyway, and may not like the extra work to include them
