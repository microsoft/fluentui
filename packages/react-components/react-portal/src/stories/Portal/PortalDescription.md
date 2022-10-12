A portal renders content outside of a DOM tree, at the end of the document.

This allows content to escape traditional boundaries caused by "overflow: hidden" CSS rules and keeps it on the top without using z-index rules.
This is useful for example in Menu and Tooltip scenarios, where the content should always overlay everything else.

`Portal` component is a thin wrapper around React's [`ReactDOM.createPortal()`](https://reactjs.org/docs/portals.html).
