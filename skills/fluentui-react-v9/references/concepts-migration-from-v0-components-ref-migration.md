# Ref component Migration guide

The `Ref` component from V0 is deprecated as it used the deprecated `findDomNode` utility from React. All V9 components support ref forwarding, so you can simply use `useRef` to the component.

Before:

After:
