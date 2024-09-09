# RFC: Theme Tokens

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

@miroslavstastny

## Summary

This RFC describes types of tokens available in a Theme, proposes theme override possibilities and **introduces on-demand component tokens**.

## Theme Structure

Fluent UI Components are themed using a Theme injected by `FluentProvider`. The `Theme` is an object which contains `tokens` - named variables. Instead of passing theme tokens directly to components, `FluentProvider` injects them as CSS variables into DOM, components then reference the CSS variables in their `makeStyles` calls:

```jsx
// Theme object
const theme = {
  global: {
    color: {
      black: '#000' // token value defined for global.color.black
    }
  }
}

// Application root - creates a div, injects --global-color-black: #000 to its styles
<FluentProvider theme={theme}>
  <ThemedComponent />
</FluentProvider>

// Fluent UI Themed Component
const useStyles = makeStyles([[
  null,
  theme => ({ // typed object which matches the theme object structure...
    color: theme.global.color.black // ...but value is a css variable reference: 'var(--global-color-black)'
  })
]]

const ThemedComponent = () => {
  const cls = useStyles({})
  return <div className={cls}>ThemedComponent</div>
}
```

Currently, there are two different kinds of tokens - **global** and **alias** tokens.

### Global tokens

Global tokens represent named raw values (constants). One name represents the same value no matter whether it is light, dark or high contrast theme.

```js
const theme = {
  global: {
    color: {
      black: '#000', // global.color.black will always be #000
    },
  },
};
```

_Currently, global tokens are the same across all the themes with brand color ramp being the only exception._

### Alias tokens

Alias tokens do not represent direct raw values, but are rather mapped to global tokens. The same alias token is mapped to different global tokens in different themes.

```js
const themeLight = {
  alias: {
    color: {
      brandForeground: brand.shade10,
    },
  },
};

const themeDark = {
  alias: {
    color: {
      brandForeground: brand.tint10, // different global token than in light
    },
  },
};
```

### Component tokens

There is nothing like component tokens in the Theme. Components use alias or global tokens directly.

## Theme Overrides

### For the whole application

If an application needs to tweak look and feel of Fluent UI components, it can change the theme for the whole application:

```js
const tweakedTheme = mergeThemes(teamsLightTheme, {
  global: {
    borderRadius: {
      medium: '6px', // change medium border radius to 6px for the whole application
    },
  },
});
```

This change will affect all instances of all Fluent UI components which use medium border radius in the whole application.

#### For an application subtree

If the application needs to tweak only its one part (screen), it will wrap that part with additional provider overriding necessary variables:

```jsx
const CustomScreen = () => {
  // overrides only, FluentProvider will merge with a theme from context
  const themeOverrides = {
    global: {
      borderRadius: {
        medium: '6px',
      },
    },
  };

  return (
    <FluentProvider theme={themeOverrides}>
      <CustomScreenInner />
    </FluentProvider>
  );
};
```

#### For an instance of a component

To override tokens for a single instance of a component, you can wrap the component with a `ThemeProvider`.
**However, we have always considered wrapping a single component with its own `ThemeProvider` an antipattern.**
As the `ThemeProvider` consumes a React context, merges themes and creates a new context, its usage is not free!

```jsx
const radiusOverrides = {
  global: {
    borderRadius: {
      medium: '6px',
    },
  },
};

<ThemeProvider theme={{ radiusOverrides }}>
  <Button>I have custom border radius</Button>
</ThemeProvider>;
```

You can also override styles using `makeStyles`:

```jsx
const useRadiusOverrides = makeStyles([[null, { borderRadius: '6px' }]]);

const CustomButton = ({ className, ...rest }) => {
  const overrides = useRadiusOverrides({});
  const classes = ax(overrides, className);

  return <Button className={classes} {...rest} />;
};
```

#### For all instances of a single component

There is no way you could override `border-radius` for all `Button` instances in your application without altering other components. If you change `global.borderRadius.medium`, all components that use that token would be affected.
`Button` uses this token directly, as described earlier, there is not any component token like `buttonBorderRadius` which you could override.

### On-demand component tokens

If engineers see that the options above do not work for their use case, they should talk to design about adding a component token to a theme.

There are basically the two following rules:

1. Only tokens which make sense to be tweaked will be added. We can add tokens in advance if we believe those will be eventually used, but the number of tokens should be limited.
1. We should prefer generic tokens over specific tokens. If `componentRadiusMedium` satisfies design needs, it is better token than `buttonPrimaryTopLeftRadius`.

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this proposal. If there are multiple proposals include this for each. -->

#### Pros

- The number of tokens is limited, does not grow indefinitely.
- Design is consistent across products and experiences. It is difficult to do one-off hacks.
- Designers have the deviations under control.

#### Cons

- Every additional request must go through design (bottleneck).
- Adding a new token requires a theme change and new version rollout - this is non-trivial change which can take a significant amount of time.

## Discarded Solutions

<!-- As you enumerate possible solutions, try to keep track of the discarded ones. This should include why we discarded the solution. -->

### Add all component tokens to a theme

Be proactive and create all possible component tokens (like `buttonPrimaryTopLeftRadius`).

Pros:

- you "never" need to consume a new theme package to add an override.

Cons:

- one component can add hundreds of component tokens, Fluent UI consist of ~100 components - that means we would add tens of thousands of CSS variables. We don't think browsers can handle this amount of CSS variables.

### Create `ComponentCustomizer` component

Custom component which would create a wrapping DOM element and inject overrides as CSS variables without consuming or creating a new React context.

Pros:

- does not create a new context

Cons:

- a new concept
- similar to `ThemeProvider`
- would not work through `React.Portal`
- creates additional wrapping DOM element

### Pass component tokens to a component

Pass the override tokens to a component. The component can then set the CSS variables on its root element.

Pros:

- simple API

Cons:

- would not work through `React.Portal`

## Open Issues

Global tokens are the same across Light-Dark-HC and differ between Teams vs Web only in Brand color. Should the global be part of the theme or a separate thing? Should brand be a part of global or not?

We are blaming the browser for its inability to handle thousands of CSS variables but have actually never measured the perf impact. We should get numbers!
