# @fluentui/react-dialog

**React Dialog components for [Fluent UI React](https://react.fluentui.dev)**

To import React Dialog components:

```jsx
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from '@fluentui/react-components';

export const DialogExample = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

## Opt-in CSS Modules styles

DialogActions, DialogBody, DialogContent, DialogSurface, and DialogTitle (including its internal action helper) have alternatives.

The default components continue to use Griffel. An opt-in bundler resolver can replace
`use<Component>Styles.styles.js` with `use<Component>Styles.styles.css.js`
(and the corresponding `.ts` source modules). Keep the emitted CSS assets and process
their CSS Modules imports; all rules are in `@layer fluentui`. Apply the same selection
to client and server bundles. Within-package composed alternatives import their CSS
base hook explicitly. These alternatives do not make composed external components
Griffel-free. Browser, forced-colors, SSR, and full VRT parity require separate validation.
