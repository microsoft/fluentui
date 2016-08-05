# Component design

## Build many smaller components and composite them together.

Often we want to build something complex, like a CommandBar. We see a picture of what we want and we build one giant component that does this. Then we find other scenarios that have overlaps. The CommandBar contains a SearchBox, a set of left side collapsable links and right side links. We may find we have other cases that just want a set of links, without the extra overhead. We may also find cases where we just want a single command bar item with a dropdown menu.

This is an example where instead of building a single large component, we should build more atomic building blocks that are puzzled together. While it may be more effort to think in smaller blocks, it makes the code easier to reuse and often simpler to maintain.

## Use a .Props.ts file to extract out the public contracts that should be supported and documented.

A props file contains all of the interface contracts that the user should know about to use the component. It is the "contract" for the component. When we evaluate semversioning, we look through the changes at Props files to determine if the change is a major, minor, or patch.

The props files are also auto documented. All JSDoc comments will be extracted and shown on the demo site for documentation.

When your component exposes public methods/properties, define an interface for the component in the props file and implement the interface. The auto documentation will interpret the I{Component} interface as the class contract and show it in the documentation as the class definition.

```typescript
interface IButton {
  /**
   * Sets focus to the button element.
   */
  focus(): void;
}
```

## Extend from BaseComponent instead of React.Component in most cases.

In the common folder, there exists a BaseComponent class. For simple components, it may be unnecessary to use.

If you extend this, you get a few useful utilities:

_events: An instance of the EventGroup, scoped to the component. It will auto dispose on component unmounting so that you don't forget.

_async: A collection of utilities for performing async operations, scoped to the component. This includes setTimeout/setInterval helpers as well as utilities for generating throttled/debounced wrappers. Again, anything you use here will be automatically cleaned up on unmounting.

_disposables: An array of IDisposable instances. If you have things you want disposed, you can push them into this.

autoBindCallbacks: A helper method that will automatically bind _on methods, to simplify the manual binding of event callbacks.

Another interesting thing is that when exceptions occur within React's methods, things tend to silently fail. With the BaseComponent, we
make all methods "safe" meaning that if an exception occurs, we send the exception to a global callback which can be hooked up to a telemetry post. By default however, we forward the exception to console.error with the exact class/method that threw the exception so that there is an obvious hint what went wrong.

There are some cases where it may be overkill to subclass from this; a simple Button wrapper for example really doesn't need to be more than a simple stateless component and doesn't need extra imports, which would result in making Button's dependency graph heavier. Use your best judgement.

## Use React eventing, unless you need to use native.

Be aware that React eventing and DOM eventing are two different systems. They do not play well with each other. DOM event handlers will always fire BEFORE React events, regardless of the DOM structure. This can introduce unexpected bugs in code that mixes both React and native DOM eventing.

Unfortunately there are plenty of scenarios where we must mix the two systems together; for example, you may need to listen for application-wide clicks that bubble up to window in order to implement a light-dismiss behavior. Or perhaps you need to listen for window resizes. Or maybe you need to observe scroll events so that you can hide/show something.

We use the EventGroup object for abstracting native eventing. It is simple to use; there is an "on" method and an "off" method that wrap calling addEventListener in modern browsers (or attachEvent in legacy IE.) Again if you're using the BaseComponent, it is already available to you via the _events property.

## Root elements should have a component class name.

Every component's root element should have a ms-Component class name. Additinally the user should be able to provide their own className via prop that should be added to the class list of the root element.

If specific component elements need special classnames injected, add more classNames to props.

A component's SCSS file should ONLY include files applicable to the component, and should not define styles for any other component.

# Class name guidelines

TODO: include our class name guidelines.

Example:

ms-Component-area--flags

# Style guidelines

## Every component must be RTL friendly.

Be conscious of RTL support. In scss, do not hardcode left/right alignemnts and instead use the RTL macros:

```scss
.ms-Foo {
  @include float(left);
}
```

This will output the following rules in the output:

```css
html[dir=ltr] .ms-Foo {
  float: left;
}

html[dir=rtl] .ms-Foo {
  float: right;
}
```

Additionaly try to have symetrical paddings rather than using padding-right or left specifics.

## Do not use core fabric classnames, but instead use core fabric scss mixins.

E.g. using ms-font-s classname in a component is forbidden. It makes overriding CSS rules really painful. Instead, use @include ms-font-m;

# Example page guidelines

Examples should follow a naming convention: Component.Desc.Example.ts

The root of the test component should use ms-ComponentDescExample as the root class.

Examples should not re-define component styles.
