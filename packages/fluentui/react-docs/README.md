## Errors

### Error: Could not find a component definition in "YourComponent.tsx".

This error occurs when your component file does not have a recognizable React component exported.

Supported component and export formats:

```jsx
const Component = React.createClass(<def>);
module.exports = Component;

// or

class Component extends React.Component {
  // ...
}
module.exports = Component;

// or

const Component = (props) => {
  // ...
}
export default Component
```

**NOT** supported formats

```jsx
const Component = props => {
  // ...
};
module.exports = Component;

// or

const Component = () => {
  // ...
};
module.exports = Component;
// or
export default Component;
```
