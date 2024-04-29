# @fluentui/dom-utilities

**DOM Utilities for use within [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This package contains extensions for traversing DOM within Fluent components, which should generally be used instead of the native equivalents.
Fluent supports the concept of 'layers', which leverage React 'Portals' to project popups and other overlay content over other content.
However, since this is not a native DOM concept, this library provides functionality to traverse the DOM in a way which reflects the hierarchy established by the projections.
