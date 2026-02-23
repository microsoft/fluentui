# Components/Popover

A popover displays content on top of other content.

## Best practices

### Do

- Use the `trapFocus` prop when focusable elements are in the `Popover`.
- Create nested `Popovers` as separate components.
- If there are no interactive items in the `Popover` content, set `tabIndex={-1}` on the `PopoverSurface`.
- Use `Popover` to reduce screen clutter to host non-essential information.

### Don't

- Don't use more than 2 levels of nested `Popovers`.
- Don't use `Popovers` to display too much content, consider if that content should be on the main page.

## Subcomponents

### PopoverSurface

PopoverSurface component renders react children in a positioned box

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div"`               | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

## Examples

### Anchor To Custom Target

A Popover can be used without a trigger and anchored to any DOM element. This can be useful if
a Popover instance needs to be reused in different places.

_Not using a PopoverTrigger will require more work to make sure your scenario is accessible,_
_such as, implementing accessible markup and keyboard interactions for your trigger._

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningImperativeRef } from '@fluentui/react-components';
const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
  },

  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const AnchorToCustomTarget = (): JSXElement => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const buttonRef = React.useCallback(
    (el: HTMLButtonElement | null) => {
      positioningRef.current?.setTarget(el);
    },
    [positioningRef],
  );

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Popover positioning={{ positioningRef }}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Button ref={buttonRef}>Custom target</Button>
    </div>
  );
};
```

### Appearance

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const useLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const Appearance = (): JSXElement => {
  const layoutStyles = useLayoutStyles();

  return (
    <div className={layoutStyles.root}>
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Default appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Popover appearance="brand">
        <PopoverTrigger disableButtonEnhancement>
          <Button>Brand appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <Popover appearance="inverted">
        <PopoverTrigger disableButtonEnhancement>
          <Button>Inverted appearance Popover trigger</Button>
        </PopoverTrigger>

        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
    </div>
  );
};
```

### Controlling Open And Close

The opening and close of the `Popover` can be controlled with your own state.
The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate
event.

_When controlling the open state of the `Popover`, extra effort is required to ensure that interactions are_
_still appropriate and that keyboard accessibility does not degrade._

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger, Checkbox } from '@fluentui/react-components';
import type { CheckboxProps, PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const ControllingOpenAndClose = (): JSXElement => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (e, data) => setOpen(data.open || false);

  const onChange: CheckboxProps['onChange'] = (e, { checked }) => {
    setOpen(checked as boolean);
  };

  return (
    <div className={styles.container}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Controlled trigger</Button>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>
          <ExampleContent />
        </PopoverSurface>
      </Popover>
      <Checkbox value="open" name="state" label="open" checked={open} onChange={onChange} />
    </div>
  );
};
```

### Custom Trigger

Native elements and Fluent components have first class support as children of `PopoverTrigger`
so they will be injected automatically with the correct props for interactions and accessibility attributes.

It is possible to use your own custom React component as a child of `PopoverTrigger`. These components should
use ref forwarding with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverTriggerChildProps } from '@fluentui/react-components';
const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

const CustomPopoverTrigger = React.forwardRef<HTMLButtonElement, Partial<PopoverTriggerChildProps>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = (): JSXElement => {
  return (
    <Popover>
      <PopoverTrigger>
        <CustomPopoverTrigger />
      </PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <ExampleContent />
      </PopoverSurface>
    </Popover>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const Default = (props: PopoverProps): JSXElement => (
  <Popover {...props}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
```

### Internal Update Content

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Link, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export const InternalUpdateContent = (): JSXElement => {
  const [visible, setVisible] = React.useState(false);
  const focusRef = React.useRef<HTMLAnchorElement>(null);

  const changeContent = () => setVisible(true);
  const onOpenChange: PopoverProps['onOpenChange'] = (e, data) => {
    if (data.open === false) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (visible) {
      focusRef.current?.focus();
    }
  }, [visible]);

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <ExampleContent />

        {visible ? (
          <div>
            The second panel content{' '}
            <Link href="#" ref={focusRef}>
              and a link
            </Link>
          </div>
        ) : (
          <div>
            <Button onClick={changeContent}>Action</Button>
          </div>
        )}
      </PopoverSurface>
    </Popover>
  );
};
```

### Nested Popovers

Popovers can be nested within each other. Too much nesting can result in
extra accessibility considerations and are generally not a great user experience,

Since nested popovers will generally have an interactive `PopoverTrigger` to control
the nested popover, make sure to combine their usage with the `trapFocus` prop for correct
screen reader and keyboard accessibility.

- Try and limit nesting to 2 levels.
- Make sure to use `trapFocus` when nesting.
- Creating nested popovers as separate components will result in more maintainable code.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, useId, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const FirstNestedPopover = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button>First nested trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>First nested button</Button>
        <SecondNestedPopover />
        <SecondNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};

const SecondNestedPopover = () => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Second nested trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>Second nested button</Button>
      </PopoverSurface>
    </Popover>
  );
};

export const NestedPopovers = (): JSXElement => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Root trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>
        <Button>Root button</Button>
        <FirstNestedPopover />
      </PopoverSurface>
    </Popover>
  );
};
```

### Trapping Focus

When a `Popover` contains focusable elements, the modal dialog pattern will apply. By using the `trapFocus`
prop, the component sets `aria-hidden`appropriately to parent elements in the document so that elements
not contained in the focus trap are hidden to screen reader users. This focus trap is automatically removed
when the `Popover` is closed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, useId, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

export const TrappingFocus = (): JSXElement => {
  const styles = useStyles();
  const id = useId();

  return (
    <Popover trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface aria-labelledby={id}>
        <div>
          <h3 id={id} className={styles.contentHeader}>
            Popover content
          </h3>

          <div>This is some popover content</div>
        </div>

        <div>
          <Button>Action</Button>
          <Button>Action</Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
```

### With Arrow

The `withArrow` prop can be used to display an arrow pointing to the target.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This popover has an arrow pointing to its target</div>
    </div>
  );
};

export const WithArrow = (): JSXElement => (
  <Popover withArrow>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
```

### With Arrow Autosize

When using the arrow with the `autoSize` positioning feature, make sure to move the `overflow` from the popover to an inner element to avoid clipping the arrow.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useContentStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    padding: '16px',
    overflowY: 'auto',
    height: '100%',
  },
  header: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useContentStyles();
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Popover content</h3>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
      </div>
    </div>
  );
};

export const WithArrowAutosize = (): JSXElement => (
  <Popover withArrow positioning={{ autoSize: true }}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    {/* 1. Reset the overflow behavior on `PopoverSurface` to avoid clipping of arrow */}
    <PopoverSurface tabIndex={-1} style={{ overflow: 'visible', padding: 0 }}>
      {/* 2. Set the height of the popover content to 100% to fill the available space and allow scrolling */}
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);
```

### Without Trigger

When using a `Popover` without a `PopoverTrigger`, it is up to the user to make sure that the focus is restored correctly
when the popover is closed. This can be done quite easily by using the `useRestoreFocusTarget` hook. The `Popover` already
uses the `useRestoreFocusSource` hook directly, which will restore focus to the most recently focused target on close.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverSurface, useId, useRestoreFocusTarget } from '@fluentui/react-components';
import type { PositioningImperativeRef } from '@fluentui/react-components';
const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
  },

  contentHeader: {
    marginTop: '0',
  },
});

export const WithoutTrigger = (): JSXElement => {
  const [open, setOpen] = React.useState(false);
  const headerId = useId();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const styles = useStyles();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  return (
    <div className={styles.container}>
      <Button {...restoreFocusTargetAttribute} ref={buttonRef} onClick={() => setOpen(s => !s)}>
        Toggle popover
      </Button>
      <Popover
        onOpenChange={(e, data) => {
          if (e.target === buttonRef.current) {
            // Ignore events that are triggered by the button to avoid re-opening the popover
            return;
          }

          setOpen(data.open);
        }}
        trapFocus
        open={open}
        positioning={{ positioningRef }}
      >
        <PopoverSurface aria-labelledby={headerId}>
          <div>
            <h3 id={headerId} className={styles.contentHeader}>
              Popover content
            </h3>

            <div>This is some popover content</div>
          </div>

          <div>
            <Button>Action</Button>
            <Button>Action</Button>
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
```
