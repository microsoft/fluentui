## Basic Use

`@fluentui/react-docs` allows you to generate JSON for your components by importing the function `getComponentInfo` from it and then simply passing your component to the function. This will read through your standard React component and generate an object based on the props, attributes (displayName etc), and will also parse your JSdoc blocks into the return object. This object is fully serializable

`getComponentInfo(<component>)` will return an object that can be serialized and then used as need.

The simplest signature of `getComponentInfo` is as follows

```JSX
import { getComponentInfo } from '@fluentui/react-docs'
import { SomeComponent } from '.././SomeFileContainingSomeComponent'

const componentInfo = getComponentInfo(SomeComponent)
```

## Superset Resolver Callback

This package,`@fluentui/react-docs`, allows you to modify the JSON generated via the superset resolver callback.

`getComponentInfo(component, ignoredParentInterfaces, supersetCallback)`

## Errors

### Error: Could not find a component definition in "YourComponent.tsx".

This error occurs when your component file does not have a recognizable React component exported.

Supported component and export formats:

```jsx
const Component = React.createClass(<def>);
module.exports = Component

// or

class Component extends React.Component {
  // ...
}
module.exports = Component

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
