# RFC: dir attribute handling

---

## Contributors

@jurokapsiar

## Summary

`dir` attribute specifies the text direction of the element's content.
As some of the applications need to handle bi-directional texts and handling of it is not obvious to most of the developers, `dir` needs to be handled automatically when possible.

## Background

Based on the language, `dir` attribute needs to be set either on the `<body>` or `<html>` element of the HTML page to explicit values (`ltr` or `rtl`). This is out of scope of the component library, however it works together with RTL styles transformation that is being applied for some of the languages.

Adding explicit direction to the top level element ensures that the UI is laid out correctly depending on the language. In most cases, it also ensures that the text is aligned correctly. But in cases when there is LTR content inside of RTL application or the other way around, setting a global direction attribute is not sufficient.

Example: User has Hebrew language set in an email application. He receives an email from a French user, so the element that displays the sender's name needs to be aligned in LTR.

[W3C Inline markup and bidirectional text in HTML](https://www.w3.org/International/articles/inline-bidi-markup/)

## Problem statement

Applications need to display bidirectional text. HTML does not ensure it out of the box. Component library can significantly help by handling the most common cases.

For example, French user names need to be aligned correcrly, even if the application language is Hebrew.

## Detailed Design or Proposal

Besides adding `dir='ltr'` or `dir='rtl'` on the root element (html or body), each leaf element that has plain text as child node, needs to have `dir='auto'` set by default. Developer can override it, if the direction is known. This will allow the browser to evaluate the direction of the text.

This is mandatory for components where we expect user input to be displayed.
It might not be mandatory for components where we expect system strings to be displayed, like buttons with action names. However, making a distinction between these two types of components is problematic.

### Pros and Cons

Con: Having `dir='auto'` on each leaf node is in most cases (French app language / French text) redundant
Pro: Developers do not need to be aware of the particularities of bidirectional text in most cases
Con: There are cases where texts are composed of multiple substrings. This happens in most cases for parametrized translations. Proposal: for parametrized translations, let the translation framework be responsible for setting the direction.

## Discarded Solutions

## Open Issues
