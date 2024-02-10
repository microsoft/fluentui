# eslint-rules

Set of internal workspace eslint rules.

> _NOTE:_
>
> Under the hood this leverages nx workspace lint rule registration which happens within `@nx/eslint-plugin` registration.
> With that said to be able to use these rules `@nx` eslint plugin needs to be registered within our eslint config chain ( plugins setup )

## Usage:

Let's say we implement custom lint rule named `uppercase-const`.

Following rule declaration will enable it for particular lint config:

```jsonc
/* @filename <project-root>/.eslintrc */
{
  "extends:" ["../../.eslintrc"],
  "rules": {
     /* pattern: <@nx/workspace>-<custom-rule-name> */
    "@nx/workspace-uppercase-const": "error"
  }
}
```

## Adding new rule:

```sh
npx nx g @fluentui/workspace-plugin:eslint-rule
```
