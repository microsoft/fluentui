A Layer is a technical component that does not have specific Design guidance.

Layers are used to render content outside of a DOM tree, at the end of the document. This allows content to escape traditional boundaries caused by "overflow: hidden" CSS rules and keeps it on the top without using z-index rules. This is useful for example in ContextualMenu and Tooltip scenarios, where the content should always overlay everything else.

There are some special considerations. Due to the nature of rendering content elsewhere asynchronously, React refs within content will not be resolvable synchronously at the time the Layer is mounted. Therefore, to use refs correctly, use functional refs `ref={ (el) => { this._root = el; }` rather than string refs `ref='root'`. Additionally measuring the physical Layer element will not include any of the children, since it won't render it. Events that propagate from within the content will not go through the Layer element as well.

### React 17 event delegation

[Changes to event delegation in React 17](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#changes-to-event-delegation) can cause issues with event bubbling when using Layer. Setting `eventBubblingEnabled` to `true` will allow events to bubble out of Layer and should resolve event bubbling issues.
