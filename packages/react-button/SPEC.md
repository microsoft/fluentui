# Button

**GitHub Epic issue** - [Button Convergence #16746](https://github.com/microsoft/fluentui/issues/16746)

## Background

The `Button` component enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

## Prior Art

### Open UI

The Open UI [Button Research](https://open-ui.org/components/button) page, shows how the `Button` component is used in UI platforms across the web. While there is consensus about some of the basic features that the `Button` needs to support the more advanced features and the variants presented differ significantly among the different UI platforms.

### Comparison of v8 and v0

The existing components are:

- v8 - [Button](https://developer.microsoft.com/en-us/fluentui#/controls/web/button)
- v0 - [Button](https://fluentsite.z22.web.core.windows.net/0.52.1/components/button/definition)

## Sample Code

Basic examples:

```jsx
<Button>Text</Button>
<Button icon={<SVGIcon />} />
<Button icon={<SVGIcon />}>Text</Button>
<Button icon={<SVGIcon />} iconPosition="after">Text</Button>
<Button primary>Text</Button>
<Button disabled>Text</Button>
<Button size="small">Text</Button>
<Button size="large">Text</Button>
```

## Variants

### Default vs inline

A `Button` has two decoration variants depending on where it's used.

By `default`, the `Button` should be limited to homogeneous surface areas where everything is clickable in the space and should appear as lacking an underline.

A second `inline` variant is provided for scenarios where body text is going to be used alongside a `Button`. This variant adds an underline to add a separate visual distinction in addition to color for contrast purposes.

### Anchor vs button

A `Button` renders as different HTML tags depending on the whether a value has been passed for the `href` property or not. If a value has been passed to the `href` property, then the `Button` renders as an `<a>` HTML tag. Conversely, if the `href` property is left `undefined` the `Button` renders as a `<button>` HTML tag.

The `Button` can also be custom rendered as something entirely different by replacing the `root` slot with the preferred element to be rendered via the `as` prop.

## API

### Slots

- `root` - The outer container representing the `Button` itself that wraps everything passed via the `children` prop.

### Props

```ts
export type ButtonProps = ComponentProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement> &
  Omit<React.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, 'type'> & {
    /**
     * URL the button points to. If not provided, the button renders as a button (unless that behavior is
     * overridden using `as`).
     */
    href?: string;

    /**
     * Where to open the buttoned URL. Common values are `_blank` (a new tab or window),
     * `_self` (the current window/context), `_parent`, and `_top`.
     * This prop is only applied if `href` is set.
     */
    target?: string;

    /**
     * Relationship to the buttoned URL (can be a space-separated list).
     * Most common values are `noreferrer` and/or `noopener`.
     * This prop is only applied if `href` is set.
     */
    rel?: string;

    /**
     * Click handler for the button.
     */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => void;

    /**
     * Whether the button is disabled.
     * @defaultvalue false
     */
    disabled?: boolean;

    /**
     * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is
     * important to keep a consistent tab order for screen reader and keyboard users.
     * @defaultvalue false
     */
    disabledFocusable?: boolean;

    /**
     * Built-in HTML attribute with different behavior depending on how the button is rendered.
     * If rendered as `<a>`, hints at the MIME type.
     * If rendered as `<button>`, override the type of button (`button` is the default).
     */
    type?: string;

    /**
     * If true, changes styling when the button is being used alongside other text content.
     */
    inline?: boolean;

    /** Style tokens */
    tokens?: RecursivePartial<ButtonTokens>;
  };
```

### Styling Tokens

```tsx
export type ButtonTokenSet = ColorTokens &
  FontTokens & {
    // The text decoration used for the button in its default state.
    textDecoration?: string;

    // The set of color tokens that are applied when the button has been visited.
    visited?: ColorTokenSet;

    // The text decoration used for the button when it is being focused.
    focused?: {
      textDecoration: string;
    };

    // The text decoration used for the button when it is being hovered.
    hovered?: {
      textDecoration: string;
    };

    // The text decoration used for the button when it is being pressed.
    pressed?: {
      textDecoration: string;
    };

    // The text decoration used for the button when it is in a disabled state.
    disabled?: {
      textDecoration: string;
    };
  };
```

## Structure

For `Buttons` rendering as `<a>`:

```tsx
<a class="root" href={href}>
  {children}
</a>
```

For `Buttons` rendering as anything other than `<a>` (the example below uses `<button>`):

```tsx
<button class="root" role="button">
  {children}
</button>
```

## Migration

See [MIGRATION.md](https://github.com/microsoft/fluentui/blob/master/packages/react-button/MIGRATION.md).

## Behaviors

### States

The following section describes the different states in which a `Button` can be throughout the course of interaction with it.

#### Enabled state

An enabled `Button` communicates interaction by having styling that invites the user to click/tap on it to navigate through content.

#### Disabled state

A disabled `Button` is non-interactive, disallowing the user to click/tap on it to navigate through content.

#### Hovered state

A hovered `Button` changes styling to communicate that the user has placed a cursor above it.

#### Focused state

A focused `Button` changes styling to communicate that the user has placed keyboard focus on it. This styling is usually the same to the one in the hovered state plus extra styling on the outline to indicate keyboard focus has been placed on the component.

#### Pressed state

A pressed `Button` changes styling to communicate that the user is currently pressing it.

#### Visited state

A visited `Button` changes styling to communicate that the user has already interacted with it so its referenced content has already been accessed in the past.

### Interaction

#### Keyboard interaction

The following is a set of keys that interact with the `Button` component:

| Key                      | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `Enter`                  | Executes the `Button` and moves focus to the its target. |
| `Shift + F10` (Optional) | Opens a context menu for the `Button`.                   |

#### Cursor interaction

- `mouseenter`: Should immediately change the styling of the `Button` so that it appears to be hovered.
- `mouseleave`: Should immediately remove the hovered styling of the `Button`.
- `mouseup`: If triggered while cursor is still inside of the `Button's` boundaries, then it should execute the `Button` and move focus to its target.

#### Touch interaction

The same behavior as above translated for touch events. This means that there is no equivalent for `mouseenter` and `mouseleave`, which makes it so that the hovered state cannot be accessed.

## Accessibility

### Relevant documents

- [WAI-ARIA 1.1 Spec](https://www.w3.org/TR/wai-aria-1.1/#button)
- [WAI-ARIA 1.1 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#button)
- [WAI-ARIA 1.2 Spec](https://www.w3.org/TR/wai-aria-1.2/#button)
- [WAI-ARIA 1.2 Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/#button)

### Expected behavior

- Should default to render a native `a` element unless something else has been specified for the `root` slot, in which case `role="button"` should be added to it.
- Should mix in the native props expected for the `a` native element.
- Should be keyboard tabbable and focusable.
