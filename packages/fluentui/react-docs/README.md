<!-- TOC -->autoauto- [Basic Use](#basic-use)auto  - [Schema Resolver Callback](#schema-resolver-callback)auto  - [Errors](#errors)auto    - [Error: Could not find a component definition in "YourComponent.tsx".](#error-could-not-find-a-component-definition-in-yourcomponenttsx)auto    - [Error: Can't parse a value in "`componentName`.defaultProps.`propName`"](#error-cant-parse-a-value-in-componentnamedefaultpropspropname)autoauto<!-- /TOC -->

# Basic Use

`@fluentui/react-docs` allows you to generate JSON for your components by importing the function `getComponentInfo` from it and then simply passing your component to the function. This will read through your standard React component and generate an object based on the props, attributes (displayName etc), and will also parse your JSdoc blocks into the return object. This object is fully serializable

`getComponentInfo(<component>)` will return an object that can be serialized and then used as need.

The simplest signature of `getComponentInfo` is as follows

```JSX
import { getComponentInfo } from '@fluentui/react-docs'
import { SomeComponent } from '.././SomeFileContainingSomeComponent'

const componentInfo = getComponentInfo(SomeComponent)
```

## Schema Resolver Callback

```js
schemaResolverCallback(fileInfo, ignoredParentInterfaces, componentInfo);
```

_react-docs_ allows you to modify the object generated via the schema resolver callback. This callback receives information from _getComponentInfo_ about the component to parse.

| Arguments                           |                                                                                                                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<signature>`                       | (**fileInfo**, **ignoredParentInterfaces**, **componentInfo**)                                                                                                                                                        |
| fileInfo: `object`                  | absPath: `string` <br> dir: `string` <br> dirname: `string` <br> filename: `string` <br> filenameWithoutExt: `string` <br> info: `docgen.ComponentDoc`                                                                |
| ignoredParentInterfaces: `string[]` |                                                                                                                                                                                                                       |
| componentInfo: `object`             | constructorName: `string`<br>Component: `React.Component`<br>displayName: `string`<br>docblock `string`<br>filename `string`<br>filenameWithoutExt `string`<br>props `string[]`<br>repoPath `string`<br>type `string` |

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

### Error: Can't parse a value in "`componentName`.defaultProps.`propName`"

This error occures if you have a prop that is of an unrecognized type. Supported types are

- `array`
- `function`
- `number`
- `object`
- `string`
- `undefined`
- `null`

Values other than this will cause this error. If you must use some other type, try passing it within a function, object or array.
