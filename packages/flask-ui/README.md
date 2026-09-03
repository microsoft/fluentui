# Fluent UI Flask integration

This package is the Flask/Jinja integration surface for the Fluent UI design
system. It is intentionally private while the integration contract is being
defined.

## Scope

- Jinja macros and templates for server-rendered applications
- CSS custom properties generated from the shared Fluent token source
- Accessibility and interaction guidance shared with the React implementation

The package must not duplicate design tokens. Token names and values are owned
by `@fluentui/tokens`; Flask assets should consume the generated token output.

## Planned layout

```text
packages/flask-ui/
├── templates/       # Jinja macros and base templates
├── static/          # Generated CSS and other browser assets
└── README.md
```

React consumers continue to use the existing `@fluentui/react-components`
package. Both integrations share the token source and design documentation,
but they can evolve and release independently.
