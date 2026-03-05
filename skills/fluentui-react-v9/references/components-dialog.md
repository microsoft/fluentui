# Components/Dialog

`Dialog` is a window overlaid on either the primary window or another dialog window. Windows under a modal dialog are inert. That is, users cannot interact with content outside an active dialog window. Inert content outside an active dialog is typically visually obscured or dimmed so it is difficult to discern, and in some implementations, attempts to interact with the inert content cause the dialog to close.

## Best practices

### Do

- Dialog boxes consist of a header (`DialogTitle`), content (`DialogContent`), and footer (`DialogActions`), which should all be included inside a body (`DialogBody`).
- Validate that people’s entries are acceptable before closing the dialog. Show an inline validation error near the field they must correct.
- Modal dialogs should be used very sparingly—only when it’s critical that people make a choice or provide information before they can proceed. Thee dialogs are generally used for irreversible or potentially destructive tasks. They’re typically paired with an backdrop without a light dismiss.
- Add a `aria-describedby` attribute on `DialogSurface` pointing to the dialog content on short confirmation like dialogs.
- Add a `aria-label` or `aria-labelledby` attribute on `DialogSurface` if there is no `DialogTitle`

### Don't

- Don't use more than three buttons between `DialogActions`.
- Don't open a `Dialog` from a `Dialog`
- Don't use a `Dialog` with no focusable elements

## Accessibility

Here are some accessibility edge cases scenarios we identified and users should keep in mind while using the `Dialog` components.

1. NVDA reads dialog information twice
2. Talkback doesn't support dialog name/description
3. Talkback doesn't support `alertdialog`
4. Whenever including a `Menu`, `Combobox`, `Dropdown` or `Popover` inside a dialog the property `aria-modal` should be false otherwise VoiceOver on IOS will not be able to access the popup. This is needed as well for VoiceOver on macOS, otherwise these components are not narrated. Apply `aria-modal=false` on the `DialogSurface` slot.
5. `DialogSurface` by default has `aria-describedby="dialog-content-id"`, which might not be ideal with complex `DialogContent`, on those scenarios (for example on [with form](#with-form)), it is recommended to set `aria-describedby={undefined}`

## Server-Side Rendering

Dialogs will work fine by default in a server-side rendering environment, but keep in mind the following scenario to avoid SSR hydration issues:

When `unmountOnClose` is set to `false` (default value is `true`), Dialog will keep the element rendered at all times, but since it uses React Portal underneath, and portals do not support SSR, it'll result in a hydration error. For SSR environments, it's advised to always set this property to `true`.

## Props

| Name             | Type                           | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `surfaceMotion`  | `PresenceMotionSlotProps       | null`    | No      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs). |
| `modalType`      | `"alert" "modal" "non-modal"`  | No       | modal   | Dialog variations. `modal`: When this type of dialog is open, the rest of the page is dimmed out and cannot be interacted with. The tab sequence is kept within the dialog and moving the focus outside the dialog will imply closing it. This is the default type of the component. `non-modal`: When a non-modal dialog is open, the rest of the page is not dimmed out and users can interact with the rest of the page. This also implies that the tab focus can move outside the dialog when it reaches the last focusable element. `alert`: is a special type of modal dialogs that interrupts the user's workflow to communicate an important message or ask for a decision. Unlike a typical modal dialog, the user must take an action through the options given to dismiss the dialog, and it cannot be dismissed through the dimmed background. |
| `open`           | `boolean`                      | No       | false   | Controls the open state of the dialog                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `defaultOpen`    | `boolean`                      | No       | false   | Default value for the uncontrolled open state of the dialog.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `onOpenChange`   | `DialogOpenChangeEventHandler` | No       |         | Callback fired when the component changes value from open state. @param event - a React's Synthetic event or a KeyboardEvent in case of `documentEscapeKeyDown` @param data - A data object with relevant information, such as open value and type of interaction that created the event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `inertTrapFocus` | `boolean`                      | No       | false   | Enables standard behavior according to the [HTML dialog spec](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) where the focus trap involves setting outside elements inert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `unmountOnClose` | `boolean`                      | No       | true    | Decides whether the dialog should be removed from the DOM tree when it is closed. This can be useful when dealing with components that may contain state that should not be reset when the dialog is closed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Subcomponents

### DialogSurface

DialogSurface component represents the visual part of a `Dialog` as a whole,
it contains everything that should be visible.

#### Props

| Name             | Type                                                                                                                                                 | Required                | Default                     | Description |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- | -------------------------------------------------- | -------------------------------------------- |
| `backdrop`       | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; } & { ...; }> | null`                   | No                          |             | Dimmed background of dialog. The default backdrop is rendered as a `<div>` with styling. This slot expects a `<div>` element which will replace the default backdrop. The backdrop should have `aria-hidden="true"`. Accepts an `appearance` prop to control backdrop visibility: - `'dimmed'`: Always shows a dimmed backdrop, regardless of nesting. - `'transparent'`: Always shows a transparent backdrop. @example `tsx <DialogSurface backdrop={{ appearance: 'dimmed' }} /> ` |
| `backdropMotion` | `PresenceMotionSlotProps                                                                                                                             | null`                   | No                          |             | For more information refer to the [Motion docs page](https://react.fluentui.dev/?path=/docs/motion-motion-slot--docs).                                                                                                                                                                                                                                                                                                                                                               |
| `as`             | `"div"`                                                                                                                                              | No                      |                             |             |
| `mountNode`      | `HTMLElement                                                                                                                                         | { element?: HTMLElement | null; className?: string; } | null        | undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | No  | a new element on document.body without any styling | Where the portal children are mounted on DOM |
| `ref`            | `Ref<HTMLDivElement>`                                                                                                                                | No                      |                             |             |

### DialogTitle

The `DialogTitle` component expects to have a title/header
and when `Dialog` is `non-modal` a close (X icon) button is provided through `action` slot by default.

#### Props

| Name     | Type                                                                                                                                      | Required | Default | Description |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ------------------------------------------------------------------------------ |
| `action` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             | By default a Dialog with modalType='non-modal' will have a close button action |
| `as`     | `"div" "h1" "h2" "h3" "h4" "h5" "h6"`                                                                                                     | No       |         |             |
| `ref`    | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |             |

### DialogActions

`DialogActions` is a container for the actions of the dialog.
Apart from styling, this component does not have other behavior.

#### Props

| Name       | Type                  | Required | Default | Description                                                 |
| ---------- | --------------------- | -------- | ------- | ----------------------------------------------------------- |
| `as`       | `"div"`               | No       |         |                                                             |
| `position` | `"start" "end"`       | No       | 'end'   | defines the position on the dialog grid of the actions      |
| `fluid`    | `boolean`             | No       | false   | Makes the actions expand the entire width of the DialogBody |
| `ref`      | `Ref<HTMLDivElement>` | No       |         |                                                             |

## Examples

### Actions

Dialogs should be used for providing the user with quick prompt options where decisions should be made quickly. They should be used for actions that are not reversible, such as deleting an item.

`DialogActions` should be used to provide the user with a set of actions to choose from. The actions should be clear and concise, and should be used to guide the user to the next step in the process.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Checkbox,
  CheckboxOnChangeData,
} from '@fluentui/react-components';

export const Actions = (): JSXElement => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    setChecked(Boolean(data.checked));
  };
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open campaign dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <DialogBody>
          <DialogTitle>Delete this campaign?</DialogTitle>
          <DialogContent>
            <p>
              You're about to delete the campaign group "Campaign name that goes up to two lines". This will also delete
              all associated campaign resources, including the overview page, files, publications, conversations, and so
              forth. Please back up any content you need before proceeding.
            </p>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              label="Yes, delete this campaign and all its associated resources"
            />
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button disabled={!checked} appearance="primary">
                Delete
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Alert

An `alert` Dialog is a modal dialog that interrupts the user's workflow to communicate an important message and acquire a response. Examples include action confirmation prompts and error message confirmations. The `alert` Dialog role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

By default clicking on `backdrop` will not dismiss an `alert` Dialog.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const Alert = (): JSXElement => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Alert dialog title</DialogTitle>
          <DialogContent>
            This dialog cannot be dismissed by clicking on the backdrop. Close button should be pressed to dismiss this
            Alert, or `Escape` keydown.
          </DialogContent>
          <DialogActions>
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Backdrop Appearance

The `backdrop` slot on `DialogSurface` accepts an `appearance` prop that allows you to explicitly control the backdrop appearance of the dialog.

By default, DialogSurface automatically determines the backdrop appearance based on context: standalone dialogs show a dimmed backdrop, while nested dialogs (inside another Dialog) show a transparent backdrop to avoid stacking multiple dimmed layers.

Use `backdrop={{ appearance: "dimmed" }}` when rendering a Dialog inside components that internally use Dialog (like `OverlayDrawer`) but the dialog should visually behave as standalone with a dimmed backdrop.

- **`'dimmed'`**: Always shows a dimmed backdrop, regardless of nesting.
- **`'transparent'`**: Always shows a transparent backdrop.

```tsx
<DialogSurface backdrop={{ appearance: 'dimmed' }} />
```

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  Label,
  RadioGroup,
  Radio,
  useId,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
});

type BackdropAppearanceOption = 'dimmed' | 'transparent';

export const BackdropAppearance = (): JSXElement => {
  const styles = useStyles();
  const labelId = useId('backdrop-appearance-label');

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [backdropAppearance, setBackdropAppearance] = React.useState<BackdropAppearanceOption>();
  const backdropProp = backdropAppearance ? { appearance: backdropAppearance } : undefined;

  return (
    <>
      <Button appearance="primary" onClick={() => setDrawerOpen(true)}>
        Open Drawer
      </Button>

      <OverlayDrawer open={drawerOpen} onOpenChange={(_, { open }) => setDrawerOpen(open)}>
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setDrawerOpen(false)}
              />
            }
          >
            Drawer
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <div className={styles.field}>
            <Label id={labelId}>Backdrop appearance</Label>
            <RadioGroup
              value={backdropAppearance}
              onChange={(_, data) => setBackdropAppearance(data.value as BackdropAppearanceOption)}
              aria-labelledby={labelId}
            >
              <Radio value="dimmed" label="Dimmed" />
              <Radio value="transparent" label="Transparent" />
            </RadioGroup>
          </div>

          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogSurface backdrop={backdropProp}>
              <DialogBody>
                <DialogTitle>Dialog</DialogTitle>
                <DialogContent>
                  This Dialog is rendered inside an OverlayDrawer, which internally uses Dialog. By default, nested
                  dialogs have a backdrop applied based on inner context. Use the <code>backdrop</code> prop to override
                  this behavior.
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="primary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </DrawerBody>
      </OverlayDrawer>
    </>
  );
};
```

### Change Focus

Changing the default focused element can be done in an effect

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const ChangeFocus = (): JSXElement => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (open && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>This dialog focus on the second button instead of the first</DialogContent>
          <DialogActions position="start">
            <Button appearance="outline">Third Action</Button>
          </DialogActions>
          <DialogActions position="end">
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button ref={buttonRef} appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Confirmation

A confirmation dialog is a type of very short dialog that sends focus directly to an action button, usually at the end of the dialog. For this type of dialog it makes sense to set the dialog's accessible name to the title, and the accessible description to the content via `aria-labelledby` and `aria-describedby`. This should not be done for dialogs with longer content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
  useId,
} from '@fluentui/react-components';

export const Confirmation = (): JSXElement => {
  const dialogId = useId('dialog-');
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Delete file</Button>
      </DialogTrigger>
      <DialogSurface aria-labelledby={`${dialogId}-title`} aria-describedby={`${dialogId}-content`}>
        <DialogBody>
          <DialogTitle id={`${dialogId}-title`}>Delete dialogSpec_final_FINAL_v3.jpg</DialogTitle>
          <DialogContent id={`${dialogId}-content`}>
            This action is permanent. Are you sure you want to continue?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Delete file</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Controlling Open And Close

The opening and close of the `Dialog` can be controlled with your own state. The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate event.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const ControllingOpenAndClose = (): JSXElement => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
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
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Custom Trigger

Native HTML elements and Fluent components have first class support as children of `DialogTrigger`, so they will be injected automatically with the correct props for interactions and accessibility attributes.

It is possible to use your own custom React component as a child of `DialogTrigger`. These components should use ref forwarding with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)

`DialogTrigger` provides proper aria attributes for a modal trigger.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  DialogTrigger,
} from '@fluentui/react-components';
import type { DialogTriggerChildProps } from '@fluentui/react-components';

const CustomDialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerChildProps>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <CustomDialogTrigger />
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
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';

export const Default = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
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
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Fluid Actions

Use the `fluid` prop on the `DialogActions` component so that it spans the entire width of the dialog. This
prop can be useful for having large number of actions.

> A `Dialog` should have no more than **two** actions.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';

export const FluidActions = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
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
          <DialogActions fluid>
            <Button appearance="primary">Do Something</Button>
            <Button appearance="secondary">Something Else</Button>
            <Button appearance="secondary">Something Else</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Keep Rendered In The DOM

Keep the dialog in the DOM tree when it is closed by setting the `unmountOnClose` prop to `false`.
This is useful when you want to preserve the state of the dialog content between opens.
For this example, the scroll position will be preserved when reopening the dialog.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const KeepRenderedInTheDOM = (): JSXElement => {
  return (
    <Dialog unmountOnClose={false}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>

          <DialogContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
              lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
              gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
              Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id
              cursus metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl
              condimentum id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue
              mauris augue neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus
              mauris vitae ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis
              massa sed elementum tempus egestas sed.
            </p>

            <p>
              Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
              Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
              vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis
              vulputate enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras
              adipiscing enim eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in
              fermentum et sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices
              eros in cursus turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio
              pellentesque diam volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
              Ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis
              aliquam malesuada bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
            </p>

            <p>
              Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
              aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
              massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat
              sed. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam.
              Volutpat diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat.
              Venenatis lectus magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit.
              Neque laoreet suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum
              ut tristique et egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui.
              Elit duis tristique sollicitudin nibh sit amet.
            </p>

            <p>
              At risus viverra adipiscing at. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
              Nunc vel risus commodo viverra maecenas. Sit amet est placerat in egestas erat imperdiet sed euismod.
              Turpis egestas maecenas pharetra convallis posuere. Egestas tellus rutrum tellus pellentesque eu tincidunt
              tortor aliquam. Dolor sit amet consectetur adipiscing elit. Aliquam purus sit amet luctus venenatis lectus
              magna fringilla. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas maecenas pharetra
              convallis posuere morbi leo urna. A diam sollicitudin tempor id eu nisl nunc. Lectus sit amet est
              placerat.
            </p>

            <p>
              Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. At tellus at urna condimentum
              mattis pellentesque id nibh. Dui faucibus in ornare quam. Tincidunt id aliquet risus feugiat in ante metus
              dictum. Adipiscing commodo elit at imperdiet dui. Dolor sed viverra ipsum nunc. Sodales neque sodales ut
              etiam sit amet nisl. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Mattis molestie a iaculis
              at erat pellentesque adipiscing. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.
              Fringilla urna porttitor rhoncus dolor purus.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
              lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
              gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
              Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id
              cursus metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl
              condimentum id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue
              mauris augue neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus
              mauris vitae ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis
              massa sed elementum tempus egestas sed.
            </p>

            <p>
              Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
              Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
              vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis
              vulputate enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras
              adipiscing enim eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in
              fermentum et sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices
              eros in cursus turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio
              pellentesque diam volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
              Ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis
              aliquam malesuada bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
            </p>

            <p>
              Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
              aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
              massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat
              sed. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam.
              Volutpat diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat.
              Venenatis lectus magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit.
              Neque laoreet suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum
              ut tristique et egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui.
              Elit duis tristique sollicitudin nibh sit amet.
            </p>
          </DialogContent>

          <DialogActions>
            <Button appearance="primary">Do Something</Button>

            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### No Focusable Element

A `Dialog` **should** always have at least one focusable element.
Some accessibility issues might happen if no focusable element is provided, like this one caught in [Talkback](https://issuetracker.google.com/issues/243456562?pli=1).

In the case when there is no focusable element inside a `Dialog` the only way to close the `Dialog` would be clicking on the `backdrop`.

> A common scenario for no focusable elements on a dialog is lazy loaded content, where the content (with focusable elements) is added after the Dialog is mounted. In that case, it is recommended to manually focus on the desired focusable element after the content is loaded.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogContent,
  DialogTitle,
  DialogBody,
  Button,
} from '@fluentui/react-components';

export const NoFocusableElement = (): JSXElement => {
  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <p>⛔️ A Dialog without focusable elements is not recommended!</p>
              <p>✅ Escape key works</p>
              <p>✅ Backdrop click still works to ensure this modal can be closed</p>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog modalType="non-modal">
        <DialogTrigger disableButtonEnhancement>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle action={null}>Dialog Title</DialogTitle>
            <DialogContent>
              <p>⛔️ A modal Dialog without focusable elements is not recommended!</p>
              <p>✅ Escape key works</p>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
```

### Non Modal

A `non-modal` Dialog by default presents no `backdrop`, allowing elements outside of the Dialog to be interacted with.

`DialogTitle` compound component will present by default a `closeButton`.

> Note: if an element outside of the dialog is focused then it will not be possible to close the dialog with the `Escape` key.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
} from '@fluentui/react-components';

export const NonModal = (): JSXElement => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Non-modal dialog title</DialogTitle>
          <DialogContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
            laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
            Consequuntur, repellendus nostrum?
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Scrolling Long Content

By default `DialogContent` should grow until it fits viewport size, overflowed content will be scrollable

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const ScrollingLongContent = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
              lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
              gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
              Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id
              cursus metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl
              condimentum id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue
              mauris augue neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus
              mauris vitae ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis
              massa sed elementum tempus egestas sed.
            </p>
            <p>
              Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
              Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
              vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis
              vulputate enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras
              adipiscing enim eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in
              fermentum et sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices
              eros in cursus turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio
              pellentesque diam volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
              Ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis
              aliquam malesuada bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
            </p>
            <p>
              Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
              aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
              massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat
              sed. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam.
              Volutpat diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat.
              Venenatis lectus magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit.
              Neque laoreet suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum
              ut tristique et egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui.
              Elit duis tristique sollicitudin nibh sit amet.
            </p>
            <p>
              At risus viverra adipiscing at. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
              Nunc vel risus commodo viverra maecenas. Sit amet est placerat in egestas erat imperdiet sed euismod.
              Turpis egestas maecenas pharetra convallis posuere. Egestas tellus rutrum tellus pellentesque eu tincidunt
              tortor aliquam. Dolor sit amet consectetur adipiscing elit. Aliquam purus sit amet luctus venenatis lectus
              magna fringilla. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas maecenas pharetra
              convallis posuere morbi leo urna. A diam sollicitudin tempor id eu nisl nunc. Lectus sit amet est
              placerat.
            </p>
            <p>
              Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. At tellus at urna condimentum
              mattis pellentesque id nibh. Dui faucibus in ornare quam. Tincidunt id aliquet risus feugiat in ante metus
              dictum. Adipiscing commodo elit at imperdiet dui. Dolor sed viverra ipsum nunc. Sodales neque sodales ut
              etiam sit amet nisl. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Mattis molestie a iaculis
              at erat pellentesque adipiscing. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.
              Fringilla urna porttitor rhoncus dolor purus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Leo vel fringilla est ullamcorper. Eget est
              lorem ipsum dolor sit amet consectetur adipiscing elit. In mollis nunc sed id semper risus in hendrerit
              gravida. Ullamcorper sit amet risus nullam eget felis eget. Dolor sed viverra ipsum nunc aliquet bibendum.
              Facilisi morbi tempus iaculis urna id volutpat. Porta non pulvinar neque laoreet suspendisse. Nunc id
              cursus metus aliquam eleifend mi in. A iaculis at erat pellentesque adipiscing commodo. Proin nibh nisl
              condimentum id. In hac habitasse platea dictumst vestibulum rhoncus est. Non tellus orci ac auctor augue
              mauris augue neque. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Nascetur ridiculus mus
              mauris vitae ultricies leo integer. Ullamcorper eget nulla facilisi etiam dignissim. Leo in vitae turpis
              massa sed elementum tempus egestas sed.
            </p>
            <p>
              Ut enim blandit volutpat maecenas volutpat. Venenatis urna cursus eget nunc scelerisque viverra mauris.
              Neque aliquam vestibulum morbi blandit. Porttitor eget dolor morbi non. Nisi quis eleifend quam adipiscing
              vitae. Aliquam ultrices sagittis orci a scelerisque purus semper. Interdum varius sit amet mattis
              vulputate enim nulla aliquet. Ut sem viverra aliquet eget sit amet tellus cras. Sit amet tellus cras
              adipiscing enim eu turpis egestas. Amet cursus sit amet dictum sit amet justo donec enim. Neque gravida in
              fermentum et sollicitudin ac. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Ultrices
              eros in cursus turpis massa tincidunt dui. Nisl rhoncus mattis rhoncus urna neque viverra justo. Odio
              pellentesque diam volutpat commodo sed egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper.
              Ipsum nunc aliquet bibendum enim. Faucibus ornare suspendisse sed nisi lacus sed. Sapien nec sagittis
              aliquam malesuada bibendum arcu vitae elementum. Metus vulputate eu scelerisque felis imperdiet.
            </p>
            <p>
              Consequat interdum varius sit amet mattis vulputate enim. Amet cursus sit amet dictum sit amet justo. Eget
              aliquet nibh praesent tristique magna sit. Ut consequat semper viverra nam libero justo. Pharetra massa
              massa ultricies mi. Sem viverra aliquet eget sit amet. Pulvinar mattis nunc sed blandit libero volutpat
              sed. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Consectetur adipiscing elit ut aliquam.
              Volutpat diam ut venenatis tellus in metus vulputate. Scelerisque in dictum non consectetur a erat.
              Venenatis lectus magna fringilla urna porttitor rhoncus. Vitae congue mauris rhoncus aenean vel elit.
              Neque laoreet suspendisse interdum consectetur. Ultrices gravida dictum fusce ut placerat orci. Bibendum
              ut tristique et egestas quis ipsum suspendisse. Mattis rhoncus urna neque viverra justo nec ultrices dui.
              Elit duis tristique sollicitudin nibh sit amet.
            </p>
            <p>
              At risus viverra adipiscing at. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit.
              Nunc vel risus commodo viverra maecenas. Sit amet est placerat in egestas erat imperdiet sed euismod.
              Turpis egestas maecenas pharetra convallis posuere. Egestas tellus rutrum tellus pellentesque eu tincidunt
              tortor aliquam. Dolor sit amet consectetur adipiscing elit. Aliquam purus sit amet luctus venenatis lectus
              magna fringilla. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas maecenas pharetra
              convallis posuere morbi leo urna. A diam sollicitudin tempor id eu nisl nunc. Lectus sit amet est
              placerat.
            </p>
            <p>
              Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. At tellus at urna condimentum
              mattis pellentesque id nibh. Dui faucibus in ornare quam. Tincidunt id aliquet risus feugiat in ante metus
              dictum. Adipiscing commodo elit at imperdiet dui. Dolor sed viverra ipsum nunc. Sodales neque sodales ut
              etiam sit amet nisl. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Mattis molestie a iaculis
              at erat pellentesque adipiscing. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla.
              Fringilla urna porttitor rhoncus dolor purus.
            </p>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Title Custom Action

By default if `Dialog` has `modalType='non-modal'` a button with a close icon is provided to close the dialog as `action` slot.

This slot can be customized to add a different kind of action, that it'll be available in any kind of `Dialog`, ignoring the `modalType` property, here's an example replacing the simple close icon with a [Fluent UI Button](./?path=/docs/components-button-button--default) using the same icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
} from '@fluentui/react-components';

import { Dismiss24Regular } from '@fluentui/react-icons';

export const TitleCustomAction = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
              </DialogTrigger>
            }
          >
            Dialog title
          </DialogTitle>
          <DialogContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
            laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
            Consequuntur, repellendus nostrum?
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Title No Action

As any other slot, `action={null}` can be provided to opt out of rendering any action

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogBody,
  Button,
} from '@fluentui/react-components';

export const TitleNoAction = (): JSXElement => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle action={null}>Non-modal dialog title without an action</DialogTitle>
          <DialogContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
            laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
            Consequuntur, repellendus nostrum?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
```

### Trigger Outside Dialog

When using a `Dialog` without a `DialogTrigger` (or when using a `DialogTrigger` outside of a `Dialog`), it becomes your responsibility to control some of the dialog's behavior.

1. You must make sure that the `open` state is set accordingly to the dialog's visibility (mostly this means to properly react to the events provided by `onOpenChange` callback on `Dialog` component).
2. You must make sure that focus is properly restored once the dialog is closed (this can be achieved by using the `useRestoreFocusTarget` hook, or by manually invoking `.focus()` on the target element).

The example bellow showcases both explicit responsibilities:

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogBody,
  Button,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

export const TriggerOutsideDialog = (): JSXElement => {
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <>
      <Button
        // restoreFocusTargetAttribute ensures that focus is restored to this button when the dialog closes
        {...restoreFocusTargetAttribute}
        onClick={() => {
          // it is the user responsibility to open the dialog
          setOpen(true);
        }}
      >
        Open Dialog
      </Button>

      <Dialog
        // this controls the dialog open state
        open={open}
        onOpenChange={(event, data) => {
          // it is the users responsibility to react accordingly to the open state change
          setOpen(data.open);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>

            <DialogActions>
              <Button appearance="primary">Do Something</Button>
              {/* DialogTrigger inside of a Dialog still works properly */}
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
```

### With Form

Having a `form` inside the `Dialog` its quite simple, you simply add a `<form>` element between `DialogSurface` and `DialogBody` to ensure all the content between them are properly wrapped inside the formulary. This allows a button inside `DialogActions` to be properly used as submission button.

> Keep in mind that controlling the `open` state of the `Dialog` might be ideal in this scenario, since validation and submission are possibly synchronous activities. For example, closing the `Dialog` only after the submission is successful would require control of the `open` state, to properly set `open` to `false` only once the submission has succeeded.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const WithForm = (): JSXElement => {
  const styles = useStyles();
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    alert('form submitted!');
  };
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open formulary dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor={'email-input'}>
                Email input
              </Label>
              <Input required type="email" id={'email-input'} />
              <Label required htmlFor={'password-input'}>
                Password input
              </Label>
              <Input required type="password" id={'password-input'} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};
```
