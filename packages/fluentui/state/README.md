# `@fluentui/state`

A set of utils to create framework agnostic and reusable state managers.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Usage with React](#usage-with-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

**NPM**

```bash
npm install --save @fluentui/state
```

**Yarn**

```bash
yarn add @fluentui/state
```

# Usage

```tsx
import { createManager, ManagerFactory } from '@fluentui/state';

type InputState = { value: string };
type InputActions = { change: (value: string) => void };

const createInputManager: ManagerFactory<InputState, InputActions> = config =>
  createManager<InputState, InputActions>({
    ...config,
    actions: {
      change: (value: string) => () => ({ value }),
    },
    state: { value: '', ...config.state },
  });
const manager = createInputManager({ state: { value: 'Hello world!' } });
```

# Usage with React

We provide React bindings under [`@fluentui/react-bindings`](https://github.com/microsoft/fluentui/tree/master/packages/fluentui/react-bindings).
