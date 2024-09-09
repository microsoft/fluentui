## Favor composition over inheritance

Even as the ES6 Javascript standard is giving us the "class" keyword, we should stay away from inheritance as a model for extending functionality. Inheritance forces a single linear path within which to extend functionality. Functionality from different aspects or domains are added in arbitrary nodes along this path. Eventually, the functionality of the subclasses is muddied with multiple responsibilities. Rather, given a composition model, each composed type can focus on its own purpose without compromising on flexibility. Further, it is easier to test each of these composed units rather than subclasses that are mixed in purpose.

Inheritance also doesn't work with the new hooks-based function components.

## Prefer function components in new code

React 16.8 added support for [hooks in function components](https://reactjs.org/docs/hooks-intro.html). Hooks allow using state and most other React features without writing a class. They allow for much greater reusability and composability of behavior. Therefore, we recommend using function components in new code (but using classes is still allowed as well).

## Ref usage

React exposes a special [`ref` prop](https://reactjs.org/docs/refs-and-the-dom.html) for components. Its behavior is different between intrinsic elements, class components, and function components:

- For **intrinsic/native elements** such as `<div>` or `<a>`, it returns a reference to the underlying HTML/DOM element object, allowing you access to its API.
- For **class components**, it exposes the class instance and its public API.
- For **function components**, it returns nothing by default, but Fluent UI components use [`React.forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) to expose a reference to the component's root DOM element.

Although it's possible to access a class component's public API using `ref`, we don't recommend this:

1. It will stop working if the component is converted to a function component
2. It's more error-prone:
   - If the component wraps itself in a higher order component or decorator, the `ref` will return the wrapper component rather than what you intended to access.
   - Accessing the full component's public methods is probably not desirable. It isn't exactly intended to access `public render` or to allow the consumer to call `componentWillUnmount`, despite these being publicly exposed to React.

### Consuming a component's public API

There ARE limited cases where a component should expose a public API contract. It's recommended to do things declaratively in React, but there are some scenarios which are perhaps easier to do imperatively:

1. Exposing a `focus` method (or similar)
2. Accessing current values of uncontrolled prop values (such as the current value of a `TextField`)

In Fluent UI React, we do the following for components which expose an imperative API surface:

1. Define an `I{ComponentName}` interface which only exposes the methods intended to be supported.
2. Add a prop `componentRef?: IRefObject<IComponentName>`

In the consuming code, you can create a ref with `React.createRef` (class components) or `React.useRef` (function components) and pass it as the `componentRef` prop.

Example usage of `componentRef` to access the `ITextField` interface:

```tsx
const FooFunc: React.FunctionComponent = () => {
  const textField = React.useRef<ITextField>(null);

  React.useEffect(() => {
    textField.current?.focus();
    console.log(textField.current?.value);
  }, []);

  return <TextField componentRef={textField} />;
};

class FooClass extends React.Component {
  private _textField = React.createRef<ITextField>(null);

  public render() {
    return <TextField componentRef={this._textField} />;
  }

  public componentDidMount() {
    this._textField.current?.focus();
    console.log(this._textField.current?.value);
  }
}
```

### Setting up the componentRef

This section is about how to set up `componentRef` for a new component, not how to use it.

For function component, use `useImperativeHandle`. (As a bonus, this example also shows how to use `forwardRef`.) For class components, use `initializeComponentRef`.

```tsx
import { IRefObject } from '@fluentui/react/lib/Utilities';

interface IFoo {
  focus(): void;
  otherMethod(): number;
  readonly someValue: string;
}

interface IFooProps extends React.RefAttributes<HTMLDivElement> {
  componentRef?: IRefObject<IFoo>;
}

const FooFunc: React.FunctionComponent<IFooProps> = React.forwardRef<HTMLDivElement, IFooProps> => {
  React.useImperativeHandle(props.componentRef, () => ({
    focus: () => /* do stuff to focus */,
    otherMethod: () => /* do stuff */,
    someValue: /* value here */
  }));

  return <div>...</div>;
}

import { initializeComponentRef } from '@fluentui/react/lib/Utilities';

class FooClass extends React.Component {
  constructor(props) {
    super(props);
    // must be inside the constructor
    initializeComponentRef(this);
  }

  public get someValue() {
    // return value here
  }

  public focus() {
    // do stuff to focus
  }

  public otherMethod() {
    // do stuff
  }
}
```

**We no longer recommend using BaseComponent due to its negative performance and bundle size implications.**
