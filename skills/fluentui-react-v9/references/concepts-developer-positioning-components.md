# Concepts/Developer/Positioning Components

Fluent components that make use of positioning can all be configured in the same way. Some components which make use of
positioned DOM elements are:

- Tooltip
- Menu
- Popover

Fluent components that have slots which are positioned will always expose a `positioning` prop where the positioning of
the slot can be configured.

Below you can try out the different positioning options in the playground. Further examples try to explain more clearly
different configuration options for the `positioning` prop.

# Best practices

These examples are intended to document the `positioning` prop used in Fluent UI React, please refer to component specific
documentation for best practices for a specific component.

## Examples

### Anchor To Target

Components with positioned slots will generally also contain the target which the positioned element will
anchor on. It is also possible to select another DOM element for the anchor of the positioned slot. This
can be useful in scenarios where the same instance of a positioned component needs to be reused.

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const AnchorToTarget = () => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Popover positioning={{ position: 'above', align: 'start', target }}>
        <PopoverTrigger disableButtonEnhancement>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
      <Button ref={setTarget}>Target</Button>
    </div>
  );
};
```

### Auto Size For Small Viewport

`autoSize` sets inline max-width and max-height styles to the element to ensure it fits within the available space.

```tsx
import * as React from 'react';
import {
  Button,
  makeStyles,
  Checkbox,
  SpinButton,
  Label,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  trigger: {
    display: 'block',
    width: '150px',
  },
});

export const AutoSizeForSmallViewport = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [menuItemCount, setMenuItemCount] = React.useState(10);

  return (
    <>
      <div>
        <Checkbox
          labelPosition="before"
          label="Open"
          checked={open}
          onChange={(e, data) => setOpen(data.checked as boolean)}
        />
      </div>
      <div>
        <Label style={{ marginRight: 4, marginLeft: 8 }} htmlFor="menu-item-count">
          Menu Item Count
        </Label>
        <SpinButton
          id="menu-item-count"
          value={menuItemCount}
          onChange={(e, { value }) => value && setMenuItemCount(value)}
        />
      </div>
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Menu
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            flipBoundary: boundaryRef,
            autoSize: true,
          }}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>AutoSized Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Array.from({ length: menuItemCount }, (_, i) => (
                <MenuItem key={i}>Item {i}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </>
  );
};
```

### Cover Target

It is also possible to position the element in such a way that it covers the target element. The position and
align properties work in the same way but with an added offset to move the positioning element on the target
element.

```tsx
import * as React from 'react';
import { makeStyles, mergeClasses, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningShorthand } from '@fluentui/react-components';

const useExampleStyles = makeStyles({
  popoverSurface: {
    width: '150px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  target: {
    height: '50px',
    width: '140px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const useGridExampleStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    width: '100%',
    overflow: 'scroll',
  },

  instructions: {
    textAlign: 'center',
  },

  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
  },

  aboveStart: {
    gridRowStart: '1',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
  },
  above: {
    gridRowStart: '1',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  aboveEnd: {
    gridRowStart: '1',
    gridColumnStart: '3',
  },
  beforeTop: {
    gridRowStart: '2',
    gridColumnStart: '1',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  before: {
    gridRowStart: '3',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  beforeBottom: {
    gridRowStart: '4',
    gridColumnStart: '1',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  afterTop: {
    gridRowStart: '2',
    gridColumnStart: '3',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  after: {
    gridRowStart: '3',
    gridColumnStart: '3',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  afterBottom: {
    gridRowStart: '4',
    gridColumnStart: '3',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  belowStart: {
    flexDirection: 'row-reverse',
    gridRowStart: '5',
    gridColumnStart: '1',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
  below: {
    gridRowStart: '5',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  belowEnd: {
    gridRowStart: '5',
    gridColumnStart: '3',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
});

export const CoverTarget = () => {
  const styles = useGridExampleStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.instructions}>Click each button to see its positioned element</div>
      <div className={styles.targetContainer}>
        <PositionedComponent
          positioning={{ position: 'above', align: 'start', coverTarget: true }}
          targetClassName={styles.aboveStart}
          targetContent="above-start"
        />

        <PositionedComponent
          positioning={{ position: 'above', coverTarget: true }}
          targetClassName={styles.above}
          targetContent="above"
        />

        <PositionedComponent
          positioning={{ position: 'above', align: 'end', coverTarget: true }}
          targetClassName={styles.aboveEnd}
          targetContent="above-end"
        />

        <PositionedComponent
          positioning={{ position: 'before', align: 'top', coverTarget: true }}
          targetClassName={styles.beforeTop}
          targetContent="before-top"
        />

        <PositionedComponent
          positioning={{ position: 'before', coverTarget: true }}
          targetClassName={styles.before}
          targetContent="before"
        />

        <PositionedComponent
          positioning={{
            position: 'before',
            align: 'bottom',
            coverTarget: true,
          }}
          targetClassName={styles.beforeBottom}
          targetContent="before-bottom"
        />

        <PositionedComponent
          positioning={{ position: 'after', align: 'top', coverTarget: true }}
          targetClassName={styles.afterTop}
          targetContent="after-top"
        />

        <PositionedComponent
          positioning={{ position: 'after', coverTarget: true }}
          targetClassName={styles.after}
          targetContent="after"
        />

        <PositionedComponent
          positioning={{
            position: 'after',
            align: 'bottom',
            coverTarget: true,
          }}
          targetClassName={styles.afterBottom}
          targetContent="after-bottom"
        />

        <PositionedComponent
          positioning={{ position: 'below', align: 'start', coverTarget: true }}
          targetClassName={styles.belowStart}
          targetContent="below-start"
        />

        <PositionedComponent
          positioning={{ position: 'below', coverTarget: true }}
          targetClassName={styles.below}
          targetContent="below"
        />

        <PositionedComponent
          positioning={{ position: 'below', align: 'end', coverTarget: true }}
          targetClassName={styles.belowEnd}
          targetContent="below-end"
        />
      </div>
    </div>
  );
};

const PositionedComponent = (props: {
  positioning: PositioningShorthand;
  gridArea?: string;
  targetContent?: React.ReactNode;
  targetClassName?: string;
}) => {
  const { positioning, targetContent = 'Click me', targetClassName } = props;
  const styles = useExampleStyles();

  return (
    <Popover positioning={positioning}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary" className={mergeClasses(styles.target, targetClassName)}>
          <div>{targetContent}</div>
          <div>↑</div>
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};
```

### Cover Target For Small Viewport

`shiftToCoverTarget` is a positioning option that allows the positioned element to shift and cover the target element when there isn't enough space available to fit it.

```tsx
import * as React from 'react';
import {
  Button,
  makeStyles,
  SpinButton,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  PositioningImperativeRef,
  useMergedRefs,
  Checkbox,
  RadioGroup,
  Field,
  Radio,
  PositioningProps,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    width: '300px',
    height: '300px',
    overflow: 'auto',
    resize: 'both',
  },
  trigger: {
    display: 'block',
    width: '150px',
    margin: '200px auto',
  },
});

const ResizableBoundary = React.forwardRef<
  HTMLDivElement,
  {
    onResize: ResizeObserverCallback;
    children: React.ReactNode;
  }
>(({ onResize, children }, ref) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [onResize]);

  const styles = useStyles();

  return (
    <div ref={useMergedRefs(ref, containerRef)} className={styles.boundary}>
      {children}
    </div>
  );
});

export const CoverTargetForSmallViewport = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);

  const [menuItemCount, setMenuItemCount] = React.useState(6);

  const positioningRef = React.useRef<PositioningImperativeRef>(null);

  const [open, setOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState<PositioningProps['position']>('above');

  return (
    <>
      <div>
        <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />{' '}
        <Field label="Menu position">
          <RadioGroup
            value={menuPosition}
            onChange={(_, data) => setMenuPosition(data.value as PositioningProps['position'])}
          >
            <Radio value="above" label="above" />
            <Radio value="after" label="after" />
          </RadioGroup>
        </Field>
        <Field label="Menu Item Count">
          <SpinButton value={menuItemCount} onChange={(_e, { value }) => value && setMenuItemCount(value)} />
        </Field>
      </div>
      <ResizableBoundary
        ref={setBoundaryRef}
        onResize={() => {
          positioningRef.current?.updatePosition();
        }}
      >
        <Menu
          open={open}
          positioning={{
            positioningRef,
            overflowBoundary: boundaryRef,
            flipBoundary: boundaryRef,
            autoSize: true,
            shiftToCoverTarget: true,
            position: menuPosition,
          }}
        >
          <MenuTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Open Menu</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {Array.from({ length: menuItemCount }, (_, i) => (
                <MenuItem key={i}>Item {i}</MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </ResizableBoundary>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, PositioningProps } from '@fluentui/react-components';

export const Default = (props: PositioningProps) => {
  return (
    <Popover positioning={props}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};
```

### Disable Transform

By default, the positioned element is positioned using [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) in the element style for better performance, but can be disabled by setting `useTransform` to `false`.

If you would like to retain transform styles while allowing transform animations, leave the popover surface the positioned one, and make its child node the actual styled element.

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const DisableTransform = () => {
  return (
    <Popover positioning={{ useTransform: false }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};
```

### Fallback Positions

When there's no enough space the `listbox` is opened from the right or left side.
This behavior can be changed by using `fallbackPositions` prop.

```tsx
import * as React from 'react';
import { Combobox, makeStyles, Option, useId } from '@fluentui/react-components';
import type { ComboboxProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    maxWidth: '400px',
  },
});

export const FallbackPositions = (props: Partial<ComboboxProps>) => {
  const comboId = useId('combo-default');
  const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId}>Best pet</label>
      <Combobox
        positioning={{ fallbackPositions: ['below'] }}
        aria-labelledby={comboId}
        placeholder="Select an animal"
        {...props}
      >
        {options.map(option => (
          <Option key={option} disabled={option === 'Ferret'}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
```

### Flip Boundary

The flip boundary can be configured manually so that the positioned element stays within bounds
for different positions

```tsx
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, Button, makeStyles, Checkbox } from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    padding: '20px',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  trigger: {
    display: 'block',
    width: '150px',
  },
});

export const FlipBoundary = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover
          open={open}
          positioning={{
            flipBoundary: boundaryRef,
            position: 'above',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Position: above</Button>
          </PopoverTrigger>
          <PopoverSurface>Stays within the flip boundary</PopoverSurface>
        </Popover>

        <Popover open={open} positioning={{ position: 'below', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Position: below</Button>
          </PopoverTrigger>
          <PopoverSurface>Overflows the flip boundary</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};
```

### Imperative Anchor Target

The `positioningRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
to manually position an element. The target can be a normal HTML element or a virtual element such as a
coordinate on the viewport.
This can be useful to reduce the number of renders required, for example when the positioned element
follows the mouse cursor

This example creates a virtual element that follows the coordinates of the mouse cursor.

```tsx
import * as React from 'react';
import { Tooltip } from '@fluentui/react-components';
import type { PositioningImperativeRef, PositioningVirtualElement } from '@fluentui/react-components';

export const ImperativeAnchorTarget = () => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onMouseMove = React.useCallback((e: React.MouseEvent) => {
    const getRect = (x = 0, y = 0) => {
      return () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
        x,
        y,
      });
    };
    const virtualElement: PositioningVirtualElement = {
      getBoundingClientRect: getRect(e.clientX, e.clientY),
    };
    positioningRef.current?.setTarget(virtualElement);
  }, []);

  const onMouseEnter = React.useCallback(() => {
    setOpen(true);
  }, []);

  const onMouseLeave = React.useCallback((event: React.MouseEvent) => {
    const target = event.relatedTarget as HTMLElement;
    if (target && target.getAttribute('role') === 'tooltip') {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <>
      <Tooltip
        visible={open}
        positioning={{ positioningRef, offset: { crossAxis: 0, mainAxis: 15 } }}
        content="Follows the cursor"
        relationship="label"
      />

      <div
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          width: 200,
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed red',
        }}
      >
        Move the mouse in here
      </div>
    </>
  );
};
```

### Imperative Position Update

The `positioningRef` positioning prop provides an [imperative handle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
to reposition the positioned element.
In this example the `updatePosition` command is used to reposition the popover when its target button is
dynamically moved.

> ⚠️ In later versions of Fluent UI, position updates are triggered once the target or container dimensions
> change. This was previously the main use case for imperative position updates. Please think carefully
> if your scenario needs this pattern in the future.

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, Slider, Field, makeStyles } from '@fluentui/react-components';
import type { PositioningImperativeRef } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },

  button: {
    position: 'absolute',
  },

  slider: {
    marginBottom: '10px',
  },
});

export const ImperativePositionUpdate = () => {
  const styles = useStyles();
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [value, setValue] = React.useState(0);

  const onChange = React.useCallback((_: React.ChangeEvent<HTMLInputElement>, data: { value: number }) => {
    setValue(data.value);
  }, []);

  React.useEffect(() => {
    positioningRef.current?.updatePosition();
  }, [value]);

  return (
    <div className={styles.container}>
      <Field label="Move the button with the slider">
        <Slider className={styles.slider} value={value} onChange={onChange} max={80} />
      </Field>
      <Popover positioning={{ position: 'below', positioningRef }} open>
        <PopoverTrigger disableButtonEnhancement>
          <Button style={{ left: `${value}%` }} className={styles.button} appearance="primary">
            Popover
          </Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Target</PopoverSurface>
      </Popover>
    </div>
  );
};
```

### Listen To Updates

Positioning happens outside of the React render lifecycle for performance purposes so that a position update
does not need to:

- trigger by a re-render
- be dependent on a re-render

This constraint makes it difficult to know exactly when an element has been positioned. In order to listen
to position updates you can use the `onPositioningEnd` callback.

> ⚠️ _Very few use cases would actually require listening to position updates. Please remember that_ > _there is a difference between this and the **open/close state** which is normally handled in React_

```tsx
import * as React from 'react';
import {
  useId,
  Text,
  makeStyles,
  tokens,
  Popover,
  Button,
  PopoverTrigger,
  PopoverSurface,
  PositioningImperativeRef,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    display: 'block',
    minWidth: '120px',
  },

  logContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  logLabel: {
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    width: 'fit-content',
    fontWeight: tokens.fontWeightBold,
    padding: '2px 12px',
  },

  log: {
    overflowY: 'auto',
    boxShadow: tokens.shadow16,
    position: 'relative',
    minWidth: '200px',
    height: '200px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '12px',
  },
});

export const ListenToUpdates = () => {
  const styles = useStyles();
  const labelId = useId();
  const [statusLog, setStatusLog] = React.useState<number[]>([]);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback((_: React.SyntheticEvent | Event, data: { open: boolean }) => {
    setOpen(data.open);
    if (!data.open) {
      setStatusLog([]);
    }
  }, []);

  const updatePosition = React.useCallback(() => {
    positioningRef.current?.updatePosition();
  }, []);

  const onPositioningEnd = React.useCallback(() => {
    setStatusLog(s => [Date.now(), ...s]);
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <Popover
          open={open}
          onOpenChange={onOpenChange}
          positioning={{ positioningRef, onPositioningEnd, position: 'below' }}
        >
          <PopoverTrigger>
            <Button className={styles.button}>Open popover</Button>
          </PopoverTrigger>
          <PopoverSurface>
            <Button className={styles.button} onClick={updatePosition}>
              Update position
            </Button>
          </PopoverSurface>
        </Popover>
      </div>
      <div className={styles.logContainer}>
        <div className={styles.logLabel} id={labelId}>
          Status log
        </div>
        <div role="log" aria-labelledby={labelId} className={styles.log}>
          {statusLog.map((time, i) => {
            const date = new Date(time);
            return (
              <div key={i}>
                {date.toLocaleTimeString()} <Text weight="bold">Position updated [{i}]</Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
```

### Match Target Size

The `matchTargetSize` option will automatically style the positioned element so that the chosen dimension
matches that of the target element. This can be useful for autocomplete or combobox input fields where the
popover should match the width of the text input field.

> ⚠️ Make sure that the positioned element use `box-sizing: border-box`

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  target: {
    width: '350px',
  },
});

export const MatchTargetSize = () => {
  const styles = useStyles();
  return (
    <Popover open positioning={{ matchTargetSize: 'width' }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button className={styles.target} appearance="primary">
          Click me
        </Button>
      </PopoverTrigger>

      <PopoverSurface style={{ boxSizing: 'border-box' }}>
        This popover has the same width as its target anchor
      </PopoverSurface>
    </Popover>
  );
};
```

### Offset Function

The positioned element can be offset from the target element by using a callback function.
The callback function provides the following arguments:

- Dimensions and position of the positioned element
- Dimensions and position of the reference element
- The `position` value
- (optionally) The `alignment` value

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningProps } from '@fluentui/react-components';

export const OffsetFunction = () => {
  const offset: PositioningProps['offset'] = ({ positionedRect, targetRect, position, alignment }) => {
    return { crossAxis: 10, mainAxis: positionedRect.width / 2 };
  };

  return (
    <Popover positioning={{ position: 'after', offset }}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};
```

### Offset Value

The positioned element can be offset from the target element. The offset value can be set either by:

- An object with `mainAxis` and `crossAxis` values
- A function that returns the object value

```tsx
import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const OffsetValue = () => {
  const [crossAxis, setCrossAxis] = React.useState(10);
  const [mainAxis, setMainAxis] = React.useState(10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'flex', gap: 10 }}>
        <code>crossAxis</code>
        <input onChange={e => setCrossAxis(parseInt(e.target.value, 10))} value={crossAxis} type="number" />
      </label>
      <label style={{ display: 'flex', gap: 10 }}>
        <code>mainAxis</code>
        <input onChange={e => setMainAxis(parseInt(e.target.value, 10))} value={mainAxis} type="number" />
      </label>

      <Popover positioning={{ position: 'after', offset: { crossAxis, mainAxis } }}>
        <PopoverTrigger disableButtonEnhancement>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
      <Popover
        positioning={{
          position: 'after',
          offset: () => ({ crossAxis, mainAxis }),
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button appearance="primary">Click me</Button>
        </PopoverTrigger>

        <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
      </Popover>
    </div>
  );
};
```

### Overflow Boundary

The overflow boundary can be configured manually so that the positioned element stays within bounds
for different alignments

```tsx
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, Button, makeStyles, Checkbox } from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    padding: '20px',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
  trigger: {
    display: 'block',
    width: '150px',
  },
});

export const OverflowBoundary = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Align: end</Button>
          </PopoverTrigger>
          <PopoverSurface>Stays within the overflow boundary</PopoverSurface>
        </Popover>

        <Popover open={open} positioning={{ position: 'above', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Align: end</Button>
          </PopoverTrigger>
          <PopoverSurface>Overflows the overflow boundary</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};
```

### Overflow Boundary Padding

The `overflowBoundaryPadding` property sets the padding between the positioned element and the
chosen boundary. The padding can be a shorthand number which applies for all sides, or an object
That explicitly sets the padding for each side.

> _Design guidance recommenends using **8px** or **4px** if a padding is required._ > _Custom values are also possible but should stay within a 4px grid, please consult your_ > _designer if a custom padding is required._

```tsx
import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
  Checkbox,
  SpinButton,
  Label,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    padding: '20px',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
  },
  trigger: {
    display: 'block',
    width: '150px',
    marginTop: '60px',
  },
});

export const OverflowBoundaryPadding = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [padding, setPadding] = React.useState(8);

  return (
    <>
      <div>
        <Checkbox
          labelPosition="before"
          label="Open"
          checked={open}
          onChange={(e, data) => setOpen(data.checked as boolean)}
        />
      </div>
      <div>
        <Label style={{ marginRight: 4, marginLeft: 8 }} htmlFor="boundary-padding">
          Padding
        </Label>
        <SpinButton id="boundary-padding" value={padding} onChange={(e, { value }) => value && setPadding(value)} />
      </div>
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            overflowBoundaryPadding: padding,
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Shorthand padding</Button>
          </PopoverTrigger>
          <PopoverSurface>10px padding from boundary</PopoverSurface>
        </Popover>

        <Popover
          open={open}
          positioning={{
            overflowBoundary: boundaryRef,
            overflowBoundaryPadding: {
              end: padding,
              top: 0,
              start: 0,
              bottom: 0,
            },
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Longhand padding</Button>
          </PopoverTrigger>
          <PopoverSurface>10px padding from boundary end</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};
```

### Overflow Boundary Rect

Boundaries can be also defined as `Rect` objects.
This is useful when a boundary is not an actual element, but some kind of computed values.

```tsx
import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
  tokens,
  type PositioningRect,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-components';

const useClasses = makeStyles({
  area: {
    border: `2px solid ${tokens.colorStatusDangerBackground3}`,
    padding: '60px 20px 20px 20px',
    width: '300px',
    height: '300px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'space-between',
    position: 'relative',

    '::before': {
      content: '"Container"',
      position: 'absolute',
      padding: `${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

      top: 0,
      left: 0,

      color: tokens.colorStatusDangerBackground1,
      backgroundColor: tokens.colorStatusDangerBackground3,
    },
  },
  boundary: {
    width: '320px',
    height: '320px',
    outline: `2px solid ${tokens.colorBrandBackground}`,

    position: 'absolute',
    top: '50px',
    left: '10px',
    pointerEvents: 'none',

    '::before': {
      content: '"Boundary"',
      position: 'absolute',
      padding: `${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

      top: 0,
      left: 0,

      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

export const OverflowBoundaryRect = () => {
  const classes = useClasses();

  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const [boundaryRect, setBoundaryRect] = React.useState<PositioningRect | null>(null);

  useIsomorphicLayoutEffect(() => {
    setBoundaryRect(boundaryRef.current?.getBoundingClientRect() ?? null);
  }, []);

  return (
    <div className={classes.area}>
      <div className={classes.boundary} ref={boundaryRef} />

      <Popover
        positioning={{
          overflowBoundary: boundaryRect,
          position: 'below',
          align: 'start',
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button>
            <code>align: start</code>
          </Button>
        </PopoverTrigger>
        <PopoverSurface>Stays within the defined rect</PopoverSurface>
      </Popover>

      <Popover
        positioning={{
          overflowBoundary: boundaryRect,
          position: 'above',
          align: 'start',
        }}
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button>
            <code>align: start</code>
          </Button>
        </PopoverTrigger>
        <PopoverSurface>Stays within the defined rect</PopoverSurface>
      </Popover>
    </div>
  );
};
```

### Shorthand Positions

If you only need to configure the placement of the positioned element, you can use a shorthand syntax to
avoid using a full blown javascript object.

```tsx
import * as React from 'react';
import { makeStyles, mergeClasses, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PositioningShorthand } from '@fluentui/react-components';

const useExampleStyles = makeStyles({
  popoverSurface: {
    width: '150px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  target: {
    height: '50px',
    width: '140px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const useGridExampleStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    width: '100%',
    overflow: 'scroll',
  },

  instructions: {
    textAlign: 'center',
  },

  targetContainer: {
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '20px',
    margin: '16px 128px',
  },

  aboveStart: {
    gridRowStart: '1',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
  },
  above: {
    gridRowStart: '1',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  aboveEnd: {
    gridRowStart: '1',
    gridColumnStart: '3',
  },
  beforeTop: {
    gridRowStart: '2',
    gridColumnStart: '1',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  before: {
    gridRowStart: '3',
    gridColumnStart: '1',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  beforeBottom: {
    gridRowStart: '4',
    gridColumnStart: '1',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(270deg)',
    },
  },
  afterTop: {
    gridRowStart: '2',
    gridColumnStart: '3',
    flexDirection: 'column-reverse',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  after: {
    gridRowStart: '3',
    gridColumnStart: '3',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  afterBottom: {
    gridRowStart: '4',
    gridColumnStart: '3',
    flexDirection: 'column',
    '& div:nth-child(2)': {
      transform: 'rotate(90deg)',
    },
  },
  belowStart: {
    flexDirection: 'row-reverse',
    gridRowStart: '5',
    gridColumnStart: '1',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
  below: {
    gridRowStart: '5',
    gridColumnStart: '2',
    justifyContent: 'center',
    '& div:nth-child(2)': {
      display: 'none',
    },
  },
  belowEnd: {
    gridRowStart: '5',
    gridColumnStart: '3',
    '& div:nth-child(2)': {
      transform: 'rotate(180deg)',
    },
  },
});

export const ShorthandPositions = () => {
  const styles = useGridExampleStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.instructions}>Click each button to see its positioned element</div>
      <div className={styles.targetContainer}>
        <PositionedComponent
          positioning="above-start"
          targetClassName={styles.aboveStart}
          targetContent="above-start"
        />

        <PositionedComponent positioning="above" targetClassName={styles.above} targetContent="above" />
        <PositionedComponent positioning="above-end" targetClassName={styles.aboveEnd} targetContent="above-end" />

        <PositionedComponent positioning="before-top" targetClassName={styles.beforeTop} targetContent="before-top" />
        <PositionedComponent positioning="before" targetClassName={styles.before} targetContent="before" />
        <PositionedComponent
          positioning="before-bottom"
          targetClassName={styles.beforeBottom}
          targetContent="before-bottom"
        />

        <PositionedComponent positioning="after-top" targetClassName={styles.afterTop} targetContent="after-top" />
        <PositionedComponent positioning="after" targetClassName={styles.after} targetContent="after" />
        <PositionedComponent
          positioning="after-bottom"
          targetClassName={styles.afterBottom}
          targetContent="after-bottom"
        />

        <PositionedComponent
          positioning="below-start"
          targetClassName={styles.belowStart}
          targetContent="below-start"
        />

        <PositionedComponent positioning="below" targetClassName={styles.below} targetContent="below" />
        <PositionedComponent positioning="below-end" targetClassName={styles.belowEnd} targetContent="below-end" />
      </div>
    </div>
  );
};

const PositionedComponent = (props: {
  positioning: PositioningShorthand;
  gridArea?: string;
  targetContent?: React.ReactNode;
  targetClassName?: string;
}) => {
  const { positioning, targetContent = 'Click me', targetClassName } = props;
  const styles = useExampleStyles();
  return (
    <Popover positioning={positioning}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary" className={mergeClasses(styles.target, targetClassName)}>
          <div>{targetContent}</div>
          <div>↑</div>
        </Button>
      </PopoverTrigger>

      <PopoverSurface className={styles.popoverSurface}>Container</PopoverSurface>
    </Popover>
  );
};
```
