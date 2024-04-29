# `@fluentui/react-icons-northstar`

A set of reusable components and hooks to build component libraries and UI kits.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Icons](#icons)
  - [`createSvgIcon()`](#createsvgicon)
    - [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**

```bash
npm install --save @fluentui/react-icons-northstar
```

**Yarn**

```bash
yarn add @fluentui/react-icons-northstar
```

# Utilities

## `createSvgIcon()`

A factory for creating svg icons.

#### Usage

The example below assumes an icon component called `<CircleIcon>` will be created in this way:

```tsx
const circleSvg = ({ classes }) => (
  <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
    <g>
      <path d="M16,8c-4.418,0-8,3.582-8,8s3.582,8,8,8s8-3.582,8-8S20.418,8,16,8z M16,22.85c-3.783,0-6.85-3.067-6.85-6.85S12.217,9.15,16,9.15s6.85,3.067,6.85,6.85S19.783,22.85,16,22.85z" />
      <circle className={classes.filledPart} cx="16" cy="16" r="8" />
    </g>
  </svg>
);

const CircleIcon = createSvgIcon({ svg: circleSvg, displayName: 'CircleIcon' });
```
