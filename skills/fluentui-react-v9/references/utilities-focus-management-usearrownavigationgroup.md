# Utilities/Focus Management/useArrowNavigationGroup

This hook enables keyboard navigation using the arrow keys (up/down/left/right), among a collection of
focusable elements. This hook is powered using the [Mover API in tabster](http://tabster.io/docs/mover/).
In addition to the arrow keys, Home and End keys will navigate to the first and last focusable element in the collection
respectively.

> NOTE: Elements with `tabindex="-1"` are considered unfocusable by tabster and will be skipped.

## Examples

### Axis

Keyboard navigation can be configured for different axis:

- horizontal - navigation with left/right keys
- vertical - navigation with up/downkeys
- both - navigation with all arrow keys, left/down and right/up will navigate in the same direction
- grid - bidirectional navigation in a 2D grid
- grid-linear - same as grid navigation, but horizontal focus will continue to flow to the next row

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import {
  Button,
  useArrowNavigationGroup,
  Field,
  RadioGroup,
  Radio,
  UseArrowNavigationGroupOptions,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },

  vertical: {
    flexDirection: 'column',
  },

  both: {},
  horizontal: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
  },
  ['grid-linear']: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
  },
});

export const Axis = () => {
  const styles = useStyles();
  const [axis, setAxis] = React.useState<UseArrowNavigationGroupOptions['axis']>('horizontal');
  const atributes = useArrowNavigationGroup({ axis });

  return (
    <>
      <Field label="Select an axis">
        <RadioGroup value={axis} onChange={(e, data) => setAxis(data.value as UseArrowNavigationGroupOptions['axis'])}>
          <Radio label="Horizontal" value="horizontal" />
          <Radio label="Vertical" value="vertical" />
          <Radio label="Both" value="both" />
          <Radio label="Grid" value="grid" />
          <Radio label="Linear Grid" value="grid-linear" />
        </RadioGroup>
      </Field>
      <div
        aria-label="Editor toolbar example"
        role="toolbar"
        {...atributes}
        className={mergeClasses(styles.container, axis && styles[axis])}
      >
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Circular Navigation

Circular navigation means that focus will keep circling around the collection of focusable elements.

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, Checkbox } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },
});

export const CircularNavigation = () => {
  const styles = useStyles();
  const [checked, setChecked] = React.useState(true);
  const attributes = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: checked,
  });

  return (
    <>
      <Checkbox label="Circular" checked={checked} onChange={(e, data) => setChecked(data.checked as boolean)} />
      <div aria-label="Editor toolbar example" role="toolbar" {...attributes} className={styles.container}>
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Circular Navigation With Tab

Circular navigation can also be combined with tabbable to allow for tabbing through the elements.

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles, Checkbox } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },
});

export const CircularNavigationWithTab = () => {
  const styles = useStyles();
  const [checked, setChecked] = React.useState(true);
  const attributes = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: checked,
    tabbable: true,
  });

  return (
    <>
      <Checkbox label="Circular" checked={checked} onChange={(e, data) => setChecked(data.checked as boolean)} />
      <div aria-label="Editor toolbar example" role="toolbar" {...attributes} className={styles.container}>
        <Button aria-label="Bold" icon={<TextBoldRegular />} />
        <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
        <Button aria-label="Italic" icon={<TextItalicRegular />} />
        <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
        <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
        <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
        <Button aria-label="Copy" icon={<CopyRegular />} />
        <Button aria-label="Cut" icon={<CutRegular />} />
        <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
      </div>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },
});

export const Default = () => {
  const styles = useStyles();
  const attributes = useArrowNavigationGroup({ axis: 'horizontal' });

  return (
    <div aria-label="Editor toolbar example" role="toolbar" {...attributes} className={styles.container}>
      <Button aria-label="Bold" icon={<TextBoldRegular />} />
      <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
      <Button aria-label="Italic" icon={<TextItalicRegular />} />
      <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
      <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
      <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
      <Button aria-label="Copy" icon={<CopyRegular />} />
      <Button aria-label="Cut" icon={<CutRegular />} />
      <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
    </div>
  );
};
```

### Memorize

When a users tabs out out of the collection of focusable elements,
users will tab back into the last focused element.

```tsx
import * as React from 'react';
import {
  TextBoldRegular,
  TextUnderlineRegular,
  TextItalicRegular,
  TextAlignLeftRegular,
  TextAlignCenterRegular,
  TextAlignRightRegular,
  CopyRegular,
  ClipboardPasteRegular,
  CutRegular,
} from '@fluentui/react-icons';
import { Button, useArrowNavigationGroup, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '5px',
  },
});

export const Memorize = () => {
  const styles = useStyles();
  const attributes = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: true,
    memorizeCurrent: true,
  });

  return (
    <div aria-label="Editor toolbar example" role="toolbar" {...attributes} className={styles.container}>
      <Button aria-label="Bold" icon={<TextBoldRegular />} />
      <Button aria-label="Underline" icon={<TextUnderlineRegular />} />
      <Button aria-label="Italic" icon={<TextItalicRegular />} />
      <Button aria-label="Align Left" icon={<TextAlignLeftRegular />} />
      <Button aria-label="Align Center" icon={<TextAlignCenterRegular />} />
      <Button aria-label="Align Right" icon={<TextAlignRightRegular />} />
      <Button aria-label="Copy" icon={<CopyRegular />} />
      <Button aria-label="Cut" icon={<CutRegular />} />
      <Button aria-label="Paste" icon={<ClipboardPasteRegular />} />
    </div>
  );
};
```
