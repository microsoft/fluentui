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

## Root elements should have a component class name.

Every component's root element should have a ms-Component class name. Additinally the user should be able to provide their own className via prop that should be added to the class list of the root element.

If specific component elements need special classnames injected, add more classNames to props.

A component's SCSS file should ONLY include files applicable to the component, and should not define styles for any other component.

# Example page guidelines

Examples should follow a naming convention: Component.Desc.Example.ts

The root of the test component should use ms-ComponentDescExample as the root class.

Examples should not re-define component styles.
