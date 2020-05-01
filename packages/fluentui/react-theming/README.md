# Summary

`react-compose` provides a set of tools for creating themable components. The `compose` tool takes a functional component and, given default options and contextual overrides provided through React context, computes injected props including `classes`, `slots`, and `slotProps`. Styles are computed only when encountering unique theme objects per component, resulting in optimized performance.

Example:

```
import { SliderBase } from './Slider.base';
import { compose } from '@fluentui/react-theming';

export const Slider = compose(SliderBase, {
  // the themable name of the component
  name: 'Slider'

  // the set of replacement tokens to be injected into the styles
  tokens,

  // The css styling to be injected as a `classes` prop
  styles

  // A dictionary of React components representing the actual subcomponents to be used by the Slider
  slots
});

// Composed components can be recomposed to offer slightly different permutations.
export const RedSlider = compose(Slider, {
  tokens: { railColor: 'red' }
});
```

Theming can be achieved through applications using a `ThemeProvider` component, also provided in the library:

```tsx
// Create a theme with a token override for the Slider.
const theme = createTheme({
  components: {
    Slider: {
      tokens: {
        railColor: 'green',
      },
    },
  },
});

// Render the slider using the theme.
const App = () => (
  <ThemeProvider theme={theme}>
    <Slider />
  </ThemeProvider>
);
```

## Principles

`compose` follows 3 principles:

- Prefer faster components over more flexible components (if a decision between the 2 must be made.)

- Decouple theming/styling from implementation in order to ensure the styling approach can be replaced without rewriting the component.

- Keep it simple; avoid adding too many concepts for developers to learn.

## Who is `compose` for?

Components created with `compose` are meant for use by anyone.

`compose` itself is primarily intended for use by component authors; it provides a consistent means of attaching to a "themed context".

`compose` can also be used by application developers to enable a greater level of customization when the "theme" does not provide enough flexibility.

## When should I use `compose`?

- When creating a component that should be themeable.
- When overriding major details of an existing component. (Explained
  later in \"Overriding (tokens\|slots) with a new component\".)

## What\'s in a theme?

A Fluent UI theme contains several major sections. At at high level, it
contains detail about colors, types, effects, spacing, and animation.
Furthermore, a theme has the ability to override major details about
each and every component\'s look and feel as well as behavior.

> TODO: document theme

# Using components created with `compose`

There is no requirement around using components build with `compose`. If you use them without a theme, they will render with whichever default token/styling values, if any, are provided.

It is recommended the default styling provide very limited styling, leaving tokens as the preferred method for customizing the component.

## Styling components with a theme

Default styling and tokens can always be overridden using theme.

> TODO: how would one replace styling completely, instead of overriding it?

## Customizing with tokens

Frequently, individual products design needs conflict with that of the
base style. To accomodate necessary changes, `Tokens` exist to allow easy
modification of most all aspects of look and feel.

A token is a key that corresponds to a value, usually from from the
applied theme. Examples of tokens might be `fontSize`, `fontFamily`,
`borderRadius`, `animationDuration`, and `labelHoveredbBackground`.

### Setting tokens with a theme

To understand the set of tokens that a specific component understands,
refer to the documentation of that component. For this example, we will
assume that a `Button` component exists that supports the following
tokens:

- `backgroundColor`
- `fontSize`
- `backgroundHoverColor`

To override any (or all) of the Button\'s tokens, an object should be
provided within the theme under:

```{.json}
{
  "components": {
    "Button": {
      "tokens": {
        "values": "here..."
      }
    }
  }
}
```

Tokens are represented by the following:

1.  Function

    A functional token is the preferred method of adjusting look and
    feel. Functional tokens reference values in the applied theme.

    ```{.javascript org-language="js"}
    {
      "components": {
        "Button": {
          "tokens": {
            "fontSize": t => t.fonts.base,
            "backgroundColor": t => t.colors.brand[2]
          }
        }
      }
    }
    ```

2.  Literal value

    A literal value allows a token to be hard-coded. It is considered
    the least desirable (as it will never be affected by other changes
    in the theme).

    A literal token in practice looks like:

    ```{.json}
    {
      "components": {
        "Button": {
          "tokens": {
            "fontSize": 12
          }
        }
      }
    }
    ```

3.  Dependent value

    There are several cases where the value of a token is based on a
    calculation of another value. For instance, the background hover
    color of a button might be desired to be a shade lighter than the
    default background color of the button. (In order to specify this,
    assume we have a `lighten()` function available.)

    ```{.javascript org-language="js"}
    {
      "components": {
        "Button": {
          "tokens": {
            "backgroundHoverColor": {
              dependsOn: ['backgroundColor'],
              value: ([backgroundColor: Color]) => lighten(backgroundColor)
            }
          }
        }
      }
    }
    ```

### Customizing tokens by creating variants

If adjusting all instances of a component with a token override is not
desirable, then it is possible to create a component variant using
`compose`.

For instance, it might be the case that most `Button` instances should
look a certain way, but `Button` instances in a toolbar should not
inherit the same tokens.

The solution is to create a component that can apply different tokens,
but retains the same underlying behavior.

To create a new component that can be targeted separately from the base
component, simply call `compose` and optionally provide new tokens.

```{.javascript org-language="js"}
const ToolbarButton = compose(Button, {
  tokens: {
    fontSize: t => t.font.small
  }
});
```

## Customizing with slots

While tokens affect the look and feel of rendered elements, `slots`
provides a way to make more significant adjustments to a component\'s
structure and behavior.

A slot is a rendered DOM element or higher level control that can be
replaced at runtime.

As an example, a `Checkbox` might choose to render a `label` element to
hold descriptive text. If a use-case called for a proprietary
`<MyLabel />` control instead of a `label`, that slot could be targeted
for replacement.

### Overriding slots with a theme

To override a slot from a theme, specify a reference to the component in
the theme.

```{.javascript org-language="js"}
import { MyLabel } from 'my-library';
{
  "components": {
    "Checkbox": {
      "slots": {
        "label": MyLabel
      }
    }
  }
}
```

### Overriding slots with a new component

`compose` can also specify slot assignments directly.

```{.javascript org-language="js"}
import { MyLabel } from 'my-library';

const MyCheckbox = compse(Checkbox, {
  slots: {
    label: MyLabel
  }
});
```

# Creating a component meant for use with `compose`

Components that work well with compose consist of 2 parts: an unstlyled
based component and a composed layer that glues look and feel to the
base component.

This section first describes how tokens and styles are calculated, then
explains what an unstyled base component must do in order to be a good
citizen in the compose world.

## Understanding tokens

Tokens are the exclusive means of getting data from a theme into a
component. Tokens should be specified for every aspect of a control\'s
look and feel.

Tokens should be named according to the following anatomy:

    {slot (or none for root)}{property}{state (or none for default)}

Examples:

- `thumbSizeHovered`
- `backgroundColor`
- `labelBorderDisabled`

TODO: Exhaustive description of token declarations

## Understanding styles

After evaluating tokens, the tokens are passed to a `style` function.
The `style` function should return an object which can be rendered by
`JSS`.

Example:

```{.javascript org-language="js"}
const styles = (tokens: MyComponentTokens) => {
  return {
    root: {
      backgroundColor: tokens.backgroundColor,
      '&:hover': {
        backgroundColor: tokens.backgroundHoverColor
      }
    },
    widget: {
      borderColor: tokens.borderColor
    }
  };
}
```

## Understanding slots

Components should define a set of logical elements that are reasonable
to replace. Additionally, sensible defaults should be provided. Slots
provide an opportunity for callers to late-bind sections for
replacement.

TODO: examples of more slots

## Writing the base component

Any functional component can be used with `compose`. However, there are
several conventions that should be respected in order to make the user
experience predictable.

A good base component deviates from a run-of-the-mill component in 3
ways:

- It should have no built-in opinion of styling. When styled via
  `compose`, class names will be passed in via `slotProps` to provide
  styling.
- It accepts a prop named `slots`, which define the component to use
  for subcomponents.
- It accepts a prop named `slotProps`, which will be handed off to
  subcomponents.

### States

Each component should ennumerate the possible set of states as a set of
boolean flags.

For instance, a checkbox might declare these flags:

- `checked`
- `readonly`
- `disabled`
- `labeled`

**NB:** States should be **boolean** values only.

These states affect what classNames are selected to render on the root
element of a component.

For instance, in the case of a checkbox, the previous states would cause
those selectors to appear on the root making them available to all
downlevel slots.

### Slots

TODO: Describe how to interact with slots

### Slot Props

TODO: Describe how to interact with slotProps

### Building in practice

A simple base component that renders a button might look like the
following:

```{.javascript org-language="js"}
interface Props {
  slots;
  slotProps;
  children;
  onClick;
}
const BaseButton: React.FunctionComponent<Props> = (props: Props) => {

  // First, define the slots
  // define `Root` as a const which renders the root.
  // Default to a button element.
  const { root: Root = 'button' } = props.slots || {};

  // Break out slot props to be passed to various components.
  // Mix in the props specified directly in props.
  const { root: rootProps } = props.slotProps || {};

  const resolvedRootProps = { ...rootProps, onClick: props.onClick };

  // Finally, render the component
  return <Root {...resolvedRootProps}>{props.children}</Root>
}
```

As components grow and become more complex, it is expected that hooks
will be developed to resolve state and intelligently merge `props` into
`slotProps`.

## Conformance

TODO: Describe how to run conformance tests to make sure that base
components appropriately react to theme changes.
